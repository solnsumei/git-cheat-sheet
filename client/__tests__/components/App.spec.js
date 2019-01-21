import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ConnectedApp, { App } from '../../src/components/App';
import CategoryPage from '../../src/components/category/CategoryPage';
import Sidebar from '../../src/components/user/Sidebar';
import mockData from '../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = { ...mockStore(mockData), dispatch: jest.fn() };

const props = {
  user: mockData.user,
  logoutUser: jest.fn(),
};

const logoutSpy = jest.spyOn(props, 'logoutUser');

describe('App Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(CategoryPage)).toHaveLength(1);
    expect(wrapper.find(Sidebar)).toHaveLength(0);
  });

  it('should call sidebarHandler', () => {
    const newProps = { ...props };
    const wrapper = shallow(<App {...newProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'sidebarHandler');
    wrapper.find('button').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find(CategoryPage)).toHaveLength(1);
    expect(wrapper.find(Sidebar)).toHaveLength(1);
  });

  it('should call sidebarHandler and hide sidebar', () => {
    const newProps = { ...props };
    const wrapper = shallow(<App {...newProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'sidebarHandler');
    wrapper.find('.full-height').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find(CategoryPage)).toHaveLength(1);
    expect(wrapper.find(Sidebar)).toHaveLength(0);
  });

  it('should call logout function', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.instance().logout();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should mount successfully', () => {
    const wrapper = mount(<Provider store={store}><App {...props} /></Provider>);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('App')).toHaveLength(1);
  });

  it('should render connected app', () => {
    const wrapper = mount(<Provider store={store}><ConnectedApp {...props} /></Provider>);
    wrapper.find('App').instance().logout();
  });
});
