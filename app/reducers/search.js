import {
  UPDATE_SEARCH_FIELD, UPDATE_SEARCH_RESULTS, GITHUB_SEARCH_REQUEST,
  GITHUB_SEARCH_SUCCESS, GITHUB_SEARCH_FAILURE, SET_SEARCH_FIELD_TYPING_TIMEOUT,
  CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_RESULTS_COUNT_TOTAL, UPDATE_PAGES_LOADED, DOM_LOADED
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
  domLoaded: false
}, action = {}) {
  switch (action.type) {
    case UPDATE_SEARCH_FIELD:
      return { ...state, searchText: action.text }
    case UPDATE_SEARCH_RESULTS:
      return { ...state, results: [...state.results, ...action.results] }
    case GITHUB_SEARCH_REQUEST:
      return { ...state, searching: true }
    case GITHUB_SEARCH_SUCCESS:
      return { ...state, ...{
        searching: false,
        searchError: false,
        errorText: '',
        pagesLoaded: state.pagesLoaded + 1
      } }
    case GITHUB_SEARCH_FAILURE:
      return { ...state, ...{
        searching: false,
        searchError: true,
        errorText: action.message
      } }
    case SET_SEARCH_FIELD_TYPING_TIMEOUT:
      return { ...state, typingTimeoutID: action.timeoutID }
    case CLEAR_SEARCH_RESULTS:
      return { ...state, ...{
        results: [],
        searchError: false,
        errorText: '',
        totalResultCount: 0,
        pagesLoaded: 0
      } }
    case UPDATE_SEARCH_RESULTS_COUNT_TOTAL:
      return { ...state, totalResultCount: action.count }
    case DOM_LOADED:
      return { ...state, domLoaded: true }
    default:
      return state;
  }
}
