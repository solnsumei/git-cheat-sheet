import React from 'react';
import { shallow } from 'enzyme';
import CategoryListItem from '../../../src/components/category/CategoryListItem';
import Command from '../../../src/components/category/Command';
import mockData from '../../__mocks__/mockStoreData';

const props = {
  user: null,
  category: mockData.categories[0],
  deleteCommand: jest.fn(),
  copyCommand: jest.fn(),
  showEditCategoryForm: jest.fn(),
  onDelete: jest.fn(),
  showCommandForm: jest.fn()
};

describe('CategoryListItem Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CategoryListItem {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Command)).toHaveLength(0);
    expect(wrapper.find('p').at(0).text()).toBe('No command added to this category');
    expect(wrapper.find('p').at(1).text()).toBe('');
  });

  it('should render with admin edit item', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryListItem {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('span').at(1).hasClass('btn-link')).toBe(true);
  });

  it('should call showEditCategory function', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryListItem {...newProps} />);
    const spy = jest.spyOn(props, 'showEditCategoryForm');
    expect(wrapper).toBeDefined();
    wrapper.find('span').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onDelete function', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryListItem {...newProps} />);
    const spy = jest.spyOn(props, 'onDelete');
    expect(wrapper).toBeDefined();
    wrapper.find('span').at(2).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call showCommand function', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryListItem {...newProps} />);
    const spy = jest.spyOn(props, 'showCommandForm');
    expect(wrapper).toBeDefined();
    wrapper.find('p').at(1).childAt(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should show command', () => {
    const newProps = { ...props, category: mockData.categoryWithCommands };
    const wrapper = shallow(<CategoryListItem {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Command)).toHaveLength(2);
  });

  it('should show command edit buttons and category edit only icon', () => {
    const newProps = { ...props, user: mockData.user, category: mockData.categoryWithCommands };
    const wrapper = shallow(<CategoryListItem {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Command)).toHaveLength(2);
    expect(wrapper.find('span').at(0).children()).toHaveLength(1);
  });
});
