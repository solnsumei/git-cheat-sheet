import React from 'react';
import { connect } from 'react-redux';
import CategoryPage from './category/CategoryPage';
import Sidebar from './user/Sidebar';
import { logoutRequest } from '../actions/userActions';

/**
 * Entry class for app
 *
 * @param {boolean} show
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  state = {
    showSidebar: false
  };

  sidebarHandler = (show) => {
    if (show !== this.state.showSidebar) {
      this.setState({
        showSidebar: show
      });
    }
  }

  /**
   * Logout user
   *
   * @memberof App
   *
   * @return {void}
   */
  logout = () => this.props.logoutUser();

  /**
   * @returns {object} jsx
   * @memberof App
   */
  render() {
    const { categories, user } = this.props;
    return (
      <div className="page-wrapper">
        <span className="float-right">
          <button className="btn-link lg-text text-33"
            onClick={() => this.sidebarHandler(true)}><i className="fa fa-angle-double-left"></i>
          </button>
        </span>
        <div onClick={() => this.sidebarHandler(false)} className="full-height">
            <CategoryPage />
        </div>
        {this.state.showSidebar && <div className="margin-top"
          className="sidebar border-dark bg-33 text-grey">
          <Sidebar
            logout={this.logout}
            user={user} />
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: formData => dispatch(logoutRequest(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
