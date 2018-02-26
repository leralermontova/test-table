import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Create from 'services/records/forms/Create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './Records.scss';

class Records extends PureComponent {

  componentDidMount() {

    this.props.load();

  }


  add = () => {

    const { open, close, show } = this.props;

    open({
      component: Create,
      name: 'CREATE',
      props: {
        onSubmitSuccess: () => {

          show('Record has been created successfully');
          close('CREATE');

        },
      },
      modalProps: {
        isForm: true,
      },
    });

  };

  render() {

    const { records } = this.props;

    return (
      <MuiThemeProvider>
        <div className={styles.general}>
          <div className={styles.head}>
            <h1>Records</h1>
            {records.length < 10 ?
              <RaisedButton
                onClick={this.add}
                label="Add record"
                secondary
              /> :
              <RaisedButton
                label="Can't touch this"
                disabled
              />
            }
          </div>
          {
            records.length ? (
              <List width="100%" selectable={false}>
                <div>
                  {
                    records.map(record => (
                      <ListItem key={record.text}>
                        <td>{record.text}</td>
                      </ListItem>
                    ))

                  }
                </div>
              </List>
            ) : (
              <ListItem>No records, add your first record</ListItem>
            )
          }
        </div>
      </MuiThemeProvider>
    );

  }

}

export default Records;
