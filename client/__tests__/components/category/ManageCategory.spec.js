import React from 'react';
import { shallow } from 'enzyme';
import ManageCategory from '../../../src/components/category/ManageCategory';
import CommandForm from '../../../src/components/category/CommandForm';
import Command from '../../../src/components/category/Command';
import mockData from '../../__mocks__/mockStoreData';

const props = {
  category: mockData.categoryWithCommands,
  command: mockData.emptyCommand,
  cancelEdit: jest.fn(),
  showEditCategoryForm: true,
  showCommandForm: false
};

describe('ManageCategory Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ManageCategory {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Command)).toHaveLength(2);
    expect(wrapper.find(CommandForm)).toHaveLength(0);
    expect(wrapper.find('.card-header').text()).toBe('COMMANDS ADDED TO THIS CATEGORY');
  });

  it('should render commandForm when showCommandForm is true', () => {
    const newProps = { ...props, showEditCategoryForm: false, showCommandForm: true };
    const wrapper = shallow(<ManageCategory {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Command)).toHaveLength(0);
    expect(wrapper.find(CommandForm)).toHaveLength(1);
    expect(wrapper.find('.card-header').text()).toBe('CONFIGURE');
  });

  it('should call cancelEdit function', () => {
    const newProps = { ...props, category: mockData.categories[0] };
    const wrapper = shallow(<ManageCategory {...newProps} />);
    const spy = jest.spyOn(props, 'cancelEdit');
    expect(wrapper).toBeDefined();
    wrapper.find('i').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
