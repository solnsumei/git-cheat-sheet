import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

/**
 * Set up the redux store to hold state data
 *
 * @param {Object} initialState
 * @returns {Object} store
 */
export default function configureStore(initialState) {
  /* eslint-disable */
  const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  /* eslint-enable */

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
  );

  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
