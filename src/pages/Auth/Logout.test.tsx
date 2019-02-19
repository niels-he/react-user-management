import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { Redirect } from 'react-router-dom';
import { Logout } from './Logout';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    onLogout: jest.fn()
  };
  const wrapped = shallow(<Logout {...props} />);
  return {
    wrapped
  };
};

describe('<Logout />', () => {
  it('contains the Redirect components', () => {
    const { wrapped } = setup();
    expect(wrapped.find(Redirect).length).toEqual(1);
  });
});
