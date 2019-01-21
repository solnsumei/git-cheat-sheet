import React from 'react';
import { shallow } from 'enzyme';
import Command from '../../../src/components/category/Command';
import mockData from '../../__mocks__/mockStoreData';

const props = {
  category: mockData.categoryWithCommands,
  command: mockData.categoryWithCommands.commands[0],
  canEdit: false,
  onEditClick: jest.fn(),
  copyCmd: jest.fn(),
  onDelete: jest.fn(),
};

describe('Command Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Command {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('code')).toHaveLength(1);
  });

  it('should not show code with onClick when disable copy is true', () => {
    const newProps = { ...props, disableCopy: true, canEdit: true };
    const wrapper = shallow(<Command {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('span').at(0).hasClass('btn-span')).toBe(true);
  });

  it('should call onDelete function', () => {
    const newProps = { ...props, canEdit: true };
    const wrapper = shallow(<Command {...newProps} />);
    const spy = jest.spyOn(props, 'onDelete');
    expect(wrapper).toBeDefined();
    wrapper.find('span').at(2).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onEditClick function', () => {
    const newProps = { ...props, canEdit: true };
    const wrapper = shallow(<Command {...newProps} />);
    const spy = jest.spyOn(props, 'onEditClick');
    expect(wrapper).toBeDefined();
    wrapper.find('span').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call copyCmd function', () => {
    const newProps = { ...props, canEdit: true };
    const wrapper = shallow(<Command {...newProps} />);
    const spy = jest.spyOn(props, 'copyCmd');
    expect(wrapper).toBeDefined();
    wrapper.find('code').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
