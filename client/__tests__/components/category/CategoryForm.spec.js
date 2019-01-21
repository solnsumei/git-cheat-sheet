import React from 'react';
import { shallow } from 'enzyme';
import CategoryForm from '../../../src/components/category/CategoryForm';
import mockData from '../../__mocks__/mockStoreData';

const props = {
  category: mockData.categories[0],
  onChange: jest.fn(),
  onSave: jest.fn(),
  error: null,
};

describe('CategoryForm Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CategoryForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('small')).toHaveLength(0);
  });

  it('should show error message', () => {
    const newProps = { ...props, error: 'invalid category input' };
    const wrapper = shallow(<CategoryForm {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('small')).toHaveLength(1);
  });
});
