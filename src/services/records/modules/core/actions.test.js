import { createSuccess } from './actions';

describe('modal actions', () => {

  it('should create correctly', () => {

    expect(createSuccess()).toMatchSnapshot();

  });

});
