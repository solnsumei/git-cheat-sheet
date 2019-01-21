import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { CategoryPage } from '../../../src/components/category/CategoryPage';
import CategoryList from '../../../src/components/category/CategoryList';
import ManageCategory from '../../../src/components/category/ManageCategory';
import CategoryForm from '../../../src/components/category/CategoryForm';
import Search from '../../../src/components/category/Search';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const props = {
  user: null,
  categories: mockData.categories,
  fetchCategories: jest.fn(() => Promise.resolve()),
  saveCategory: jest.fn(() => Promise.resolve()),
  saveCommand: jest.fn(() => Promise.resolve()),
  deleteCommand: jest.fn(() => Promise.resolve()),
  deleteCategory: jest.fn(() => Promise.resolve()),
};

describe('CategoryPage Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(CategoryList)).toHaveLength(1);
    expect(wrapper.find(ManageCategory)).toHaveLength(0);
    expect(wrapper.find(CategoryForm)).toHaveLength(0);
  });

  it('should mount without crashing', () => {
    const wrapper = mount(<CategoryPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(CategoryList)).toHaveLength(1);
    expect(wrapper.find(ManageCategory)).toHaveLength(0);
    expect(wrapper.find(CategoryForm)).toHaveLength(0);
  });

  it('should show Category form when admin is logged in', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    expect(wrapper.find(Search)).toHaveLength(0);
    expect(wrapper.find(CategoryForm)).toHaveLength(1);
  });

  it('should show hide Category form when user is logged in', () => {
    const newProps = { ...props, user: mockData.user2 };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    expect(wrapper.find(Search)).toHaveLength(0);
    expect(wrapper.find(CategoryForm)).toHaveLength(0);
  });

  it('should show Category form when admin is logged in', () => {
    const newProps = { ...props };
    newProps.user = mockData.user;
    const wrapper = shallow(<CategoryPage {...newProps} />);
    expect(wrapper.find(Search)).toHaveLength(0);
    expect(wrapper.find(CategoryForm)).toHaveLength(1);
  });

  it('should show ManageCategory when edit icon is clicked', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'showEditCategoryForm');
    wrapper.instance().showEditCategoryForm();
    expect(wrapper.instance().state.showEditCategoryForm).toBe(true);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find(CategoryList)).toHaveLength(0);
    expect(wrapper.find(CategoryForm)).toHaveLength(1);
    expect(wrapper.find(ManageCategory)).toHaveLength(1);
  });

  it('should show ManageCategory with command Form', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'showCommandFormHandler');
    wrapper.instance().showCommandFormHandler(mockData.categories[0]);
    expect(wrapper.instance().state.showCommandForm).toBe(true);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find(CategoryList)).toHaveLength(0);
    expect(wrapper.find(CategoryForm)).toHaveLength(0);
    expect(wrapper.find(ManageCategory)).toHaveLength(1);
  });

  it('should handle category form change when text is entered', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'onChangeCategoryName');
    wrapper.instance().onChangeCategoryName({ target: { value: 'b' } });
    wrapper.instance().onChangeCategoryName({ target: { value: 'bes' } });
    expect(spy).toHaveBeenCalled();
  });

  it('should handle copy command', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'copyCommand');
    wrapper.instance().copyCommand('hello world');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle command form change when text is entered', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'onChangeCategoryName');
    wrapper.instance().onChangeCategoryName({ target: { value: 'b' } });
    wrapper.instance().onChangeCategoryName({ target: { value: 'bes' } });
    expect(spy).toHaveBeenCalled();
  });

  it('should call saveCommand function with errors', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'saveCommand');
    wrapper.instance().saveCommand({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
  });

  it('should call resetEdit function', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'resetEdit');
    wrapper.instance().resetEdit();
    expect(wrapper.instance().state.showCommandForm).toBe(false);
    expect(wrapper.instance().state.showEditCategoryForm).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  it('should call saveCategory function with errors', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'saveCategory');
    wrapper.instance().saveCategory({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
  });

  it('should call saveCategory function with length errors', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'saveCategory');
    wrapper.instance().setState({
      category: {
        name: 'gshshsjss hsjshsjsjshs ssjsjhshshsh shshshs hsgssfs fgsgsfsfsgsgs gshhshshsss ssssgsgs',
      }
    });
    wrapper.instance().saveCategory({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.categoryNameError)
      .toBe('Category name cannot be less that 3 chars or more than 30 chars');
  });

  it('should call saveCategory function successfully', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(props, 'saveCategory');
    wrapper.instance().setState({
      category: {
        name: 'Configure',
      }
    });
    wrapper.instance().saveCategory({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
    wrapper.instance().setState({
      category: {
        _id: '2344',
        name: 'Configure',
      }
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should call saveCommand function with length errors', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'saveCommand');
    wrapper.instance().setState({
      command: {
        snippet: 'gshshsjss hsjshsjsjshs ssjsjhshshsh shshshs hsgssfs fgsgsfsfsgsgs gshhshshsss ssssgsgs',
        action: `They bear witness, the girl and the supermoon, 
          pinned to different worlds. She studies the ocean, chin on
           knees, toes buried in cooling sand while`
      }
    });
    wrapper.instance().saveCommand({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.error.action).toBe('Field cannot be more than 100 chars');
  });

  it('should call saveCommand function successfully without errors', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(props, 'saveCommand');
    wrapper.instance().setState({
      command: {
        snippet: 'git --init',
        action: 'They bear witness, the girl'
      }
    });
    wrapper.instance().saveCommand({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
    wrapper.instance().setState({
      command: {
        _id: '22344',
        snippet: 'git --init',
        action: 'They bear witness, the girl'
      }
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should call deleteCategory', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(props, 'deleteCategory');
    wrapper.instance().deleteCategory();
    expect(spy).toHaveBeenCalled();
  });

  it('should call deleteCommand', () => {
    const wrapper = shallow(<CategoryPage {...props} />);
    const spy = jest.spyOn(props, 'deleteCommand');
    wrapper.instance().deleteCommand();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle change command field', () => {
    const newProps = { ...props, user: mockData.user };
    const wrapper = shallow(<CategoryPage {...newProps} />);
    wrapper.instance().showCommandFormHandler(mockData.categories[0]);
    const spy = jest.spyOn(wrapper.instance(), 'handleCommandFieldChange');
    wrapper.instance().handleCommandFieldChange({ target: { name: 'name', value: 'value' } });
    wrapper.instance().handleCommandFieldChange({ target: { name: 'name2', value: 'value2' } });
    expect(wrapper.find(ManageCategory)).toHaveLength(1);
    expect(spy).toHaveBeenCalled();
  });
});
