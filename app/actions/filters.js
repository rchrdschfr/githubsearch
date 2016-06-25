/* Actions are functions that, by default, return an object containing a property
   identifying the type of action, and an optional payload of data to be associated
   with the action. The dispatcher takes this information to the reducer where the
   state is modified. We can also return a function or a promise if we want to do
   things like dispatch multiple actions, or fetch data from an external API. */

import * as types from 'types';
import { fetchSearchResults, clearSearchResults } from 'actions/search';

import { TYPING_DELAY } from 'constants';

export function toggleFilters() {
  return (dispatch, getState) => {
    if (getState().open) {
      return dispatch(closeFilters());
    }
    else {
      return dispatch(openFilters());
    }
  }
}

export function openFilters() {
  return {
    type: types.OPEN_FILTERS
  }
}

export function closeFilters() {
  return {
    type: types.CLOSE_FILTERS
  }
}

export function changeLanguageFilter(language) {
  return (dispatch, getState) => {
    dispatch(updateLanguageFilter(language));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateLanguageFilter(language) {
  return {
    type: types.UPDATE_LANGUAGE_FILTER,
    language
  }
}

export function changeLastCommitFilter(value) {
  return (dispatch, getState) => {
    dispatch(updateLastCommitFilter(value));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateLastCommitFilter(value) {
  return {
    type: types.UPDATE_LAST_COMMIT_FILTER,
    value
  }
}

export function changeRepoCreatedFilter(value) {
  return (dispatch, getState) => {
    dispatch(updateRepoCreatedFilter(value));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateRepoCreatedFilter(value) {
  return {
    type: types.UPDATE_REPO_CREATED_FILTER,
    value
  }
}

export function changeStarsFilter(stars) {
  return (dispatch, getState) => {
    dispatch(updateStarsFilter(stars));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateStarsFilter(stars) {
  return {
    type: types.UPDATE_STARS_FILTER,
    stars
  }
}

export function changeForksFilter(forks) {
  return (dispatch, getState) => {
    dispatch(updateForksFilter(forks));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateForksFilter(forks) {
  return {
    type: types.UPDATE_FORKS_FILTER,
    forks
  }
}

export function changeShowForkedReposFilter(showForkedRepos) {
  return (dispatch, getState) => {
    dispatch(updateShowForkedReposFilter(showForkedRepos));
    dispatch(clearSearchResults());
    return dispatch(fetchSearchResults());
  }
}

function updateShowForkedReposFilter(showForkedRepos) {
  return {
    type: types.UPDATE_SHOW_FORKED_REPOS_FILTER,
    showForkedRepos
  }
}

export function changeAuthorFilter(text) {
  return (dispatch, getState) => {
    clearTimeout(getState().filters.typingAuthorFilterTimeoutID);
    dispatch(updateAuthorFilter(text));
    return dispatch(setAuthorFilterTypingTimeout(setTimeout(() => {
      dispatch(clearSearchResults());
      dispatch(fetchSearchResults());
    }, TYPING_DELAY)));
  }
}

function setAuthorFilterTypingTimeout(timeoutID) {
  return {
    type: types.SET_AUTHOR_FILTER_TYPING_TIMEOUT,
    timeoutID
  }
}

export function updateAuthorFilter(text) {
  return {
    type: types.UPDATE_AUTHOR_FILTER,
    text
  }
}

export function clearLanguageFilter() {
  return (dispatch, getState) => {
    return dispatch(changeLanguageFilter(""));
  }
}

export function clearLastCommitFilter() {
  return (dispatch, getState) => {
    return dispatch(changeLastCommitFilter(""));
  }
}

export function clearRepoCreatedFilter() {
  return (dispatch, getState) => {
    return dispatch(changeRepoCreatedFilter(""));
  }
}

export function clearStarsFilter() {
  return (dispatch, getState) => {
    return dispatch(changeStarsFilter(""));
  }
}

export function clearForksFilter() {
  return (dispatch, getState) => {
    return dispatch(changeForksFilter(""));
  }
}

export function clearAuthorFilter() {
  return (dispatch, getState) => {
    return dispatch(changeAuthorFilter(""));
  }
}
