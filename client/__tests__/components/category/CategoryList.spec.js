import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from '../../../src/components/category/CategoryList';
import CategoryListItem from '../../../src/components/category/CategoryListItem';
import mockData from '../../__mocks__/mockStoreData';

const props = {
  user: null,
  categories: mockData.categories,
};

describe('CategoryList Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CategoryList {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(CategoryListItem)).toHaveLength(2);
  });

  it('should mount without crashing', () => {
    const newProps = { ...props, categories: [] };
    const wrapper = shallow(<CategoryList {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(CategoryListItem)).toHaveLength(0);
    expect(wrapper.find('div').at(1).text()).toBe('No item found!');
  });
});
