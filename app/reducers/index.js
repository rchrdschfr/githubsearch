import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive'
import filters from 'reducers/filters';
import search from 'reducers/search';
import sorting from 'reducers/sorting';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  browser: responsiveStateReducer,
  filters,
  search,
  sorting
});

export default rootReducer;
