import {
  TOGGLE_FILTERS, CLOSE_FILTERS, OPEN_FILTERS,
  UPDATE_LANGUAGE_FILTER, TYPING_IN_AUTHOR_FILTER,
  SET_AUTHOR_FILTER_TYPING_TIMEOUT,
  UPDATE_LAST_COMMIT_FILTER,
  UPDATE_REPO_CREATED_FILTER, UPDATE_SHOW_FORKED_REPOS_FILTER,
  UPDATE_STARS_FILTER, UPDATE_FORKS_FILTER,
  UPDATE_AUTHOR_FILTER } from 'types';

export default function filters(state = {
  open: undefined,
  language: '',
  lastCommit: '',
  repoCreated: '',
  stars: '',
  forks: '',
  author: '',
  showForkedRepos: false,
  typingAuthorFilterTimeoutID: null
}, action = {}) {
  switch (action.type) {
    case CLOSE_FILTERS:
      state.open = false;
      return {...state};
    case OPEN_FILTERS:
      state.open = true;
      return {...state};
    case UPDATE_LANGUAGE_FILTER:
      state.language = action.language;
      return {...state};
    case UPDATE_LAST_COMMIT_FILTER:
      state.lastCommit = action.value;
      return {...state};
    case UPDATE_REPO_CREATED_FILTER:
      state.repoCreated = action.value;
      return {...state};
    case UPDATE_STARS_FILTER:
      state.stars = action.stars
      return {...state};
    case UPDATE_FORKS_FILTER:
      state.forks = action.forks;
      return {...state};
    case UPDATE_AUTHOR_FILTER:
      state.author = action.text
      return {...state};
    case UPDATE_SHOW_FORKED_REPOS_FILTER:
      state.showForkedRepos = action.showForkedRepos;
      return {...state};
    case SET_AUTHOR_FILTER_TYPING_TIMEOUT:
      state.typingAuthorFilterTimeoutID = action.timeoutID;
      return {...state};
    default:
      return state;
  }
}
