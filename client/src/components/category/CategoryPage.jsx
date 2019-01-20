import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import ManageCategory from './ManageCategory';
import Search from './Search';
import {
  searchCommands,
  loadCategories,
  saveOrUpdateCategory,
  saveOrUpdateCommand,
  deleteCategory,
  deleteCommand,
} from '../../actions/categoryActions';

/**
 * Category page
 *
 * @class CategoryPage
 * @extends {React.Component}
 */
class CategoryPage extends React.Component {
  // Initialise empty category
  initCategory = () => ({
    _id: null,
    name: ''
  });

  // Initialize empty command
  initCommand = () => ({
    _id: null,
    snippet: '',
    action: '',
    category: null
  });

  // fresh state
  freshState = () => ({
    categoryNameError: null,
    editingCategoryId: null,
    showEditCategoryForm: false,
    showCommandForm: false,
    command: this.initCommand(),
    category: this.initCategory(),
    error: null,
  });

  state = this.freshState();

  /**
   * Search Item changed
   *
   * @param {Object} event
   * @memberof CategoryPage
   *
   * @return {void}
   */
  handleSearch = (event) => {
    if (event.target.value.trim().length > 1) {
      this.props.searchItem(event.target.value);
    } else {
      this.props.searchItem();
    }
  }

  /**
   * Change category name
   *
   * @param {Object} event
   * @memberof CategoryPage
   *
   * @return {void}
   */
  onChangeCategoryName = (event) => {
    const { category } = this.state;
    category.name = event.target.value;
    this.setState({
      category,
      categoryNameError: null,
    });
  }

  /**
   * Change command form field
   *
   * @param {Object} event
   * @memberof CategoryPage
   *
   * @return {void}
   */
  handleCommandFieldChange = (event) => {
    const eventName = event.target.name;
    const { command } = this.state;
    command[eventName] = event.target.value;
    this.setState({
      command,
      error: null
    });
  }

  /**
   * Save command
   *
   * @param {Object} event
   * @memberof CategoryPage
   *
   * @return {void}
   */
  saveCommand = (event) => {
    event.preventDefault();
    const error = {};
    const { command } = this.state;
    if (command.snippet.trim().length < 3 || command.snippet.trim().length > 40) {
      error.snippet = 'Field cannot be less that 3 chars or more than 40 chars';
    }

    if (command.action.trim().length < 3 || command.action.trim().length > 50) {
      error.action = 'Field cannot be less that 3 chars or more than 50 chars';
    }

    if (Object.keys(error).length > 0) {
      return this.setState({
        error
      });
    }

    this.props.saveCommand(command)
      .then(() => this.setState({
        category: this.initCategory(),
        command: this.initCommand(),
        showCommandForm: false
      }))
      .catch(({ response }) => toastr.error(response.data.error.message));
  }

  /**
   * Show Edit CategoryForm
   *
   * @param {Object} category
   * @memberof CategoryPage
   *
   * @return {void}
   */
  showEditCategoryForm = (category) => {
    this.setState({
      category,
      categoryNameError: null,
      showEditCategoryForm: true
    });
  }

  /**
   * Show Edit CommandForm
   *
   * @param {Object} category
   * @param {Object} command
   * @memberof CategoryPage
   *
   * @return {void}
   */
  showCommandFormHandler = (category, command = null) => {
    const commandToEdit = command || { ...this.state.command };
    if (commandToEdit.category === null) {
      commandToEdit.category = category._id;
    }
    this.setState({
      category,
      command: commandToEdit,
      categoryNameError: null,
      showCommandForm: true
    });
  }

  /**
   * Save category
   *
   * @param {Object} event
   * @memberof CategoryPage
   *
   * @return {void}
   */
  saveCategory = (event) => {
    event.preventDefault();
    const { category } = this.state;
    if (category.name.trim().length < 3 || category.name.trim().length > 30) {
      return this.setState({
        categoryNameError: 'Category name cannot be less that 3 chars or more than 30 chars'
      });
    }

    this.props.saveCategory(category)
      .then(() => this.setState({
        category: this.initCategory(),
        showEditCategoryForm: false
      }))
      .catch(({ response }) => toastr.error(response.data.error.message));
  }

  /**
   * Cancel Editing
   *
   * @memberof CategoryPage
   * @return {void}
   */
  resetEdit = () => {
    this.setState({
      showCommandForm: false,
      showEditCategoryForm: false,
      category: this.initCategory(),
      command: this.initCommand()
    });
  }

  /**
   * Copy command to clpboard
   *
   * @param {String} snippet
   * @memberof CategoryPage
   *
   * @return {void}
   */
  copyCommand = (snippet) => {
    const el = document.createElement('textarea');
    el.value = snippet;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toastr.info('Command copied to clipboard');
  }

  /**
   * Delete category
   *
   * @param {Object} category
   * @memberof CategoryPage
   *
   * @return {void}
   */
  deleteCategory = category => this.props.deleteCategory(category)
    .then(() => toastr.success('Category deleted successfully'))
    .catch(({ response }) => toastr.error(response.data.error.message));


  /**
   * Delete command
   *
   * @param {Object} command
   * @memberof CategoryPage
   *
   * @return {void}
   */
  deleteCommand = command => this.props.deleteCommand(command)
    .catch(({ response }) => toastr.error(response.data.error.message));

  /**
 * Component did update lifecycle method
 *
 * @param {Object} prevProps
 * @param {Object} prevState
 * @memberof CategoryPage
 *
 * @return {void}
 */
  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.setState(this.freshState);
      this.props.fetchCategories();
    }

    if (prevProps.user && !this.props.user) {
      this.setState(this.freshState);
      this.props.searchItem();
    }
  }

  /**
   *
   * @returns {object} jsx
   * @memberof CategoryPage
   */
  render() {
    const { categories, user } = this.props;
    const {
      category,
      command,
      categoryNameError,
      showEditCategoryForm,
      showCommandForm,
      error
    } = this.state;

    return (
      <div className="container margin-top">
        <div className="margin-2x"></div>
        {!user && <Search onSearch={this.handleSearch} />}
        { user && user.isAdmin && !showCommandForm
          && <CategoryForm
            category={category}
            onChange={this.onChangeCategoryName}
            onSave={this.saveCategory}
            error={categoryNameError} />
        }
        {showEditCategoryForm || showCommandForm
          ? <ManageCategory
              category={category}
              command={command}
              cancelEdit={this.resetEdit}
              showCommandForm={showCommandForm}
              showEditCategoryForm={showEditCategoryForm}
              onSaveCommand={this.saveCommand}
              onCommandFormChange={this.handleCommandFieldChange}
              error={error} />
          : <CategoryList
            categories={categories}
            showEditCategoryForm={this.showEditCategoryForm}
            showCommandForm={this.showCommandFormHandler}
            deleteCommand={this.deleteCommand}
            copyCommand={this.copyCommand}
            onDeleteCategory={this.deleteCategory}
            user={user}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  searchItem: searchQuery => dispatch(searchCommands(searchQuery)),
  fetchCategories: () => dispatch(loadCategories()),
  saveCategory: category => dispatch(saveOrUpdateCategory(category)),
  saveCommand: command => dispatch(saveOrUpdateCommand(command)),
  deleteCategory: category => dispatch(deleteCategory(category)),
  deleteCommand: command => dispatch(deleteCommand(command))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
