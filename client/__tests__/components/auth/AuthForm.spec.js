import React from 'react';
import { shallow } from 'enzyme';
import { AuthForm } from '../../../src/components/user/AuthForm';

const props = {
  signUp: jest.fn(() => Promise.resolve()),
  login: jest.fn(() => Promise.resolve()),
};

describe('AuthForm Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('should show registration form when button is clicked', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.instance().state.isLogin).toBe(false);
    expect(wrapper.find('input')).toHaveLength(3);
  });

  it('should call updateFormState function', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'updateFormState');
    wrapper.instance().updateFormState({ target: { name: 'admin', value: 'vw' } });
    wrapper.instance().updateFormState({ target: { name: 'name2', value: 'value2' } });
    expect(spy).toHaveBeenCalled();
  });

  it('should call submit function with errors', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    wrapper.find('button').at(1).simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'submitForm');
    wrapper.instance().submitForm({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
  });

  it('should call submit function successfully without errors', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    const loginState = {
      name: '',
      email: 'myEmail@email.me',
      password: 'Password'
    };
    const signupSpy = jest.spyOn(props, 'signUp');
    const loginSpy = jest.spyOn(props, 'login');
    wrapper.instance().setState({
      formData: loginState
    });
    wrapper.instance().submitForm({ preventDefault: jest.fn() });
    expect(loginSpy).toHaveBeenCalled();
    wrapper.instance().setState({
      isLogin: false,
      formData: { ...loginState, name: 'Good name' }
    });
    wrapper.instance().submitForm({ preventDefault: jest.fn() });
    expect(signupSpy).toHaveBeenCalled();
  });
});
