import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { match, createMemoryHistory } from 'react-router';
import { loadOnServer } from 'redux-connect';
import PrettyError from 'pretty-error';

import config from 'config';
import createStore from 'store/create';
import getRoutes from 'routes';

import StoreProvider from 'frames/StoreProvider';
import AsyncConnect from 'frames/AsyncConnect';
import Html from 'helpers/Html';
import ApiClient from 'helpers/ApiClient';

const pe = new PrettyError();
const { server } = config;

const hydrateOnClient = chunks => (
  `<!doctype html>\n${renderToString(<Html assets={chunks} />)}`
);

const records = [];

export default (params) => {

  const app = express();
  const chunks = params.chunks();
  const {
    host = server.host,
    port = server.port,
    ssr = server.withSSR,
    staticDir,
  } = params;

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(compression());


  app.use(express.static(staticDir));

  app.get('/api/records', (req, res) => {

    res.send(JSON.stringify(records));

  });

  app.post('/api/record', (req, res) => {

    if (records.length >= 10) {

      res.sendStatus(500);

    } else {

      const a = {
        text: req.body.text,
        id: new Date().getTime(),
      };
      records.push(a);
      res.send(a);

    }


  });

  app.get('*', (req, res) => {

    if (!ssr) {

      res.send(hydrateOnClient(chunks));
      return;

    }

    const client = ApiClient(req, res);
    const history = createMemoryHistory(req.originalUrl);
    const store = createStore(undefined, client);

    const routes = getRoutes(store);

    match({ history, routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {

      if (redirectLocation) {

        res.redirect(redirectLocation.pathname + redirectLocation.search);

      } else if (err) {

        console.log('Router error:');
        console.log(pe.render(err));
        res.send(hydrateOnClient(chunks));

      } else if (renderProps) {

        loadOnServer({ ...renderProps, store }).then(() => {

          const component = (
            <StoreProvider store={store}>
              <AsyncConnect {...renderProps} />
            </StoreProvider>
          );

          if (renderProps.routes[renderProps.routes.length - 1].status === 404) {

            res.status(404);

          }

          const html = renderToString(
            <Html assets={chunks} component={component} store={store} />,
          );

          res.send(`<!doctype html>\n${html}`);

        })
        .catch((error) => {

          console.log('AsyncConnect error:');
          console.log(pe.render(error));
          res.send(hydrateOnClient(chunks));

        });

      }

    });

  });

  app.listen(port, host, (err) => {

    if (err) {

      console.log(pe.render(err));

    }

    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port);

  });

};
