import * as types from 'types';
import { fetchSearchResults, clearSearchResults } from 'actions/search';

export function changeSortOrder(order) {
  return (dispatch, getState) => {
    dispatch(updateSortOrder(order));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateSortOrder(order) {
  return {
    type: types.CHANGE_SORT_ORDER,
    order
  }
}

export function changeSortType(type) {
  return (dispatch, getState) => {
    dispatch(updateSortType(type));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateSortType(type) {
  return {
    type: types.CHANGE_SORT_TYPE,
    sortType: type
  }
}

export function clearSorting() {
  return (dispatch, getState) => {
    dispatch(updateSortType("relevance"));
    dispatch(updateSortOrder("desc"));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}
