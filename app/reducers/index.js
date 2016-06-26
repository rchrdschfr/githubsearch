/* Reducers define how the app state changes in response to actions. They listen
   for particular types of actions and, using the current state and data associated
   with the action, return a new object which reflects the new state of the application.
   App state is considered immutable, Object.assign({}, state, ...) is used to
   generate the new state. */

import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive'
import filters from 'reducers/filters';
import search from 'reducers/search';
import sorting from 'reducers/sorting';

const rootReducer = combineReducers({
  browser: responsiveStateReducer,
  filters,
  search,
  sorting
});

export default rootReducer;
