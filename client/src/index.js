import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/materia.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/toastr.css';
import './styles/styles.css';
import App from './components/App';
import { checkAuthentication } from './actions/userActions'

axios.defaults.baseURL = '/api/v1';

const store = configureStore();
store.dispatch(checkAuthentication());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));