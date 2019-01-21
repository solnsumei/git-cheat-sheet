import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { AuthForm } from '../../../src/components/user/AuthForm';
import Sidebar from '../../../src/components/user/Sidebar';
import mockData from '../../__mocks__/mockStoreData';

const props = {
  user: null,
};

describe('Sidebar', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Sidebar {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should not show form when user is logged in', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<Sidebar {...newProps} />);
    expect(wrapper.find(AuthForm)).toHaveLength(0);
    expect(wrapper.find('button')).toHaveLength(1);
  });
});
