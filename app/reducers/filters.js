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
      return { ...state, open: false }
    case OPEN_FILTERS:
      return { ...state, open: true }
    case UPDATE_LANGUAGE_FILTER:
      return { ...state, language: action.language }
    case UPDATE_LAST_COMMIT_FILTER:
      return { ...state, lastCommit: action.value }
    case UPDATE_REPO_CREATED_FILTER:
      return { ...state, repoCreated: action.value }
    case UPDATE_STARS_FILTER:
      return { ...state, stars: action.stars }
    case UPDATE_FORKS_FILTER:
      return { ...state, forks: actions.forks }
    case UPDATE_AUTHOR_FILTER:
      return { ...state, author: action.text }
    case UPDATE_SHOW_FORKED_REPOS_FILTER:
      return { ...state, showForkedRepos: action.showForkedRepos }
    case SET_AUTHOR_FILTER_TYPING_TIMEOUT:
      return { ...state, typingAuthorFilterTimeoutID: action.timeoutID }
    default:
      return state;
  }
}
