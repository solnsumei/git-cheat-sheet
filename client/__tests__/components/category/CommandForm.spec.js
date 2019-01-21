import React from 'react';
import { shallow } from 'enzyme';
import CommandForm from '../../../src/components/category/CommandForm';
import mockData from '../../__mocks__/mockStoreData';

const props = {
  command: mockData.commands[0],
  onChange: jest.fn(),
  onSave: jest.fn(),
  error: null,
};

describe('CommandForm Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CommandForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('small')).toHaveLength(0);
  });

  it('should display empty form', () => {
    const newProps = { ...props, command: mockData.emptyCommand };
    const wrapper = shallow(<CommandForm {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('p').at(0).text()).toBe('Add command to this category');
  });

  it('should show error message', () => {
    const newProps = { ...props, error: { snippet: 'invalid', action: 'invalid' } };
    const wrapper = shallow(<CommandForm {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('small')).toHaveLength(2);
  });
});
