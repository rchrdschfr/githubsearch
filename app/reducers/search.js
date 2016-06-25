import {
  UPDATE_SEARCH_FIELD, UPDATE_SEARCH_RESULTS, GITHUB_SEARCH_REQUEST,
  GITHUB_SEARCH_SUCCESS, GITHUB_SEARCH_FAILURE, SET_SEARCH_FIELD_TYPING_TIMEOUT,
  CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_RESULTS_COUNT_TOTAL,
  SCROLLED_PAST_TOP, SCROLLED_INTO_TOP, UPDATE_PAGES_LOADED, DOM_LOADED
 } from 'types';

export default function search(state = {
  results: [],
  searching: false,
  searchError: false,
  errorText: '',
  searchText: '',
  totalResultCount: 0,
  typingTimeoutID: null,
  pagesLoaded: 0,
  hasScrolledPastTop: false,
  domLoaded: false
}, action = {}) {
  switch (action.type) {
    case UPDATE_SEARCH_FIELD:
      state.searchText = action.text;
      return {...state};
    case UPDATE_SEARCH_RESULTS:
      let results = [...state.results, ...action.results];
      state.results = results;
      return {...state};
    case GITHUB_SEARCH_REQUEST:
      state.searching = true;
      return {...state};
    case GITHUB_SEARCH_SUCCESS:
      state.searching = false;
      state.searchError = false;
      state.errorText = '';
      state.pagesLoaded += 1;
      return {...state};
    case GITHUB_SEARCH_FAILURE:
      state.searching = false;
      state.searchError = true;
      state.errorText = action.message;
      return {...state};
    case SET_SEARCH_FIELD_TYPING_TIMEOUT:
      state.typingTimeoutID = action.timeoutID;
      return {...state};
    case CLEAR_SEARCH_RESULTS:
      state.results = [];
      state.searchError = false;
      state.errorText = '';
      state.totalResultCount = 0;
      state.pagesLoaded = 0;
      return {...state};
    case UPDATE_SEARCH_RESULTS_COUNT_TOTAL:
      state.totalResultCount = action.count;
      return {...state};
    case SCROLLED_PAST_TOP:
      state.hasScrolledPastTop = true;
      return {...state};
    case SCROLLED_INTO_TOP:
      state.hasScrolledPastTop = false;
      return {...state};
    case DOM_LOADED:
      state.domLoaded = true;
      return {...state};
    default:
      return state;
  }
}
