import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { userSignUpRequest, loginRequest } from '../../actions/userActions';
/**
 *
 * @class Sidebar
 * @extends {React.Component}
 */
class AuthForm extends React.Component {
  initState = () => ({
    isLogin: true,
    formData: {
      name: '',
      email: '',
      password: ''
    },
    error: null,
  })

  state = this.initState();

  /**
   * @param {object} event
   * @memberof Sidebar
   *
   * @returns {void}
   */
  toggleLogin = () => {
    const freshState = this.initState();
    freshState.isLogin = !this.state.isLogin;
    this.setState(freshState);
  }

  /**
   * @param {object} event
   * @memberof Sidebar
   *
   * @returns {void}
   */
  updateFormState = (event) => {
    const field = event.target.name;
    const { formData } = this.state;
    formData[field] = event.target.value;
    this.setState({ formData });
  }

  /**
   * @param {object} event
   * @memberof Sidebar
   *
   * @returns {void}
   */
  submitForm = (event) => {
    event.preventDefault();
    const error = {};
    const { isLogin, formData } = this.state;
    const { name, password } = formData;
    if (!isLogin) {
      if (name.trim().length < 2 || name.trim().length > 20) {
        error.name = 'Field cannot be less than 2 chars or more than 20 chars';
      }
    }

    if (password.trim().length < 6) {
      error.password = 'Field cannot be less than 6 chars';
    }

    if (Object.keys(error).length !== 0) {
      return this.setState({
        error,
      });
    }

    return isLogin
      ? this.props.login(formData)
        .catch(({ response }) => toastr.error(response.data.error.message))
      : this.props.signUp(formData)
        .catch(({ response }) => toastr.error(response.data.error.message));
  }


  /**
   * Render function
   *
   * @returns {object} jsx
   * @memberof Sidebar
   */
  render() {
    const { formData, isLogin, error } = this.state;
    return (
    <div className="row">
        <form onSubmit={this.submitForm} className="col-12">
        <h3>{ isLogin ? 'Please Login' : 'Sign up'}</h3>
        <div className="margin-2x"></div>
        { !isLogin
            && <div className="form-group">
              <label htmlFor="name">Name</label>
              <input name="name" className="form-control" id="name"
              value={formData.name} placeholder="Enter name" onChange={this.updateFormState} required />
              {error !== null && error.name !== undefined && error.name !== null
              && <small class="form-text text-danger">{error.name}</small>
              }
            </div>
        }

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={formData.email}
              className="form-control" id="email" onChange={this.updateFormState}
              placeholder="Enter email" required/>
            { error !== null && error.email !== undefined && error.email !== null
              && <small class="form-text text-danger">{error.email}</small>
            }
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" value={formData.password}
              className="form-control" id="password" onChange={this.updateFormState}
              placeholder="Enter password" required/>
            {error !== null && error.password !== undefined && error.password !== null
              && <small class="form-text text-danger">{error.password}</small>
            }
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-lg">{isLogin ? 'Log in' : 'Sign up'}</button>
            <button type="button"
              onClick={this.toggleLogin}
              className="btn btn-link">{isLogin ? 'New? Sign up' : 'Registered? Log in'} </button>
          </div>
        </form>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: formData => dispatch(userSignUpRequest(formData)),
  login: formData => dispatch(loginRequest(formData)),
});

export default connect(null, mapDispatchToProps)(AuthForm);
