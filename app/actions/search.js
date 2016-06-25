/* Actions are functions that, by default, return an object containing a property
   identifying the type of action, and an optional payload of data to be associated
   with the action. The dispatcher takes this information to the reducer where the
   state is modified. We can also return a function or a promise if we want to do
   things like dispatch multiple actions, or fetch data from an external API. */

import * as types from 'types';
import { polyfill } from 'es6-promise';
import { get } from 'axios';
import moment from 'moment';

import { GITHUB_USER_NAME, GITHUB_PASSWORD, TYPING_DELAY, DEFAULT_SEARCH_ERROR_MESSAGE } from 'constants';

polyfill();

/* Make an AJAX request to the GitHubAPI using a GET request. Unauthenticated
   requests are allowed 10 requests per minute while authenticated ones are
   allowed 30. I made a dummy GitHub account whose crendentials I have
   used here to allow us to get a higher rate limit. */
function makeGitHubSearchRequest(query) {
  return get('https://api.github.com/search/repositories', {
    params: {
      q: constructQueryString(query),
      sort: query.sort,
      order: query.order,
      page: query.page
    },
    auth: {
      username: GITHUB_USER_NAME,
      password: GITHUB_PASSWORD
    }
  });
}

function createGitHubSearchRequest() {
  return {
    type: types.GITHUB_SEARCH_REQUEST
  }
}

function createGitHubSearchSuccess() {
  return {
    type: types.GITHUB_SEARCH_SUCCESS
  }
}

function createGitHubSearchFailure(message) {
  return {
    type: types.GITHUB_SEARCH_FAILURE,
    message
  }
}

/* This action will retrieve search results from the GitHub API based on the
   current set of filters, sorts, search terms, and the pages that have already
   been loaded. If the retrieval is successful, it will update the app state
   to reflect the results of the search. Otherwise it dispatches an error. */
export function fetchSearchResults() {
  return (dispatch, getState) => {
    let state = getState();

    if (!state.search.searchText) {
      return dispatch(clearSearchResults());
    }

    let query = {
      text: state.search.searchText,
      filters: state.filters,
      sort: state.sorting.type,
      order: state.sorting.order,
      page: `${state.search.pagesLoaded+1}`
    }

    dispatch(createGitHubSearchRequest());
    return makeGitHubSearchRequest(query)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          dispatch(updateSearchResults(res.data.items.map((item) => {
            return {
              name: item.name,
              description: item.description,
              url: item.html_url,
              stars: item.stargazers_count,
              forks: item.forks_count,
              language: item.language,
              owner: {
                login: item.owner.login,
                url: item.owner.html_url,
                picture: item.owner.avatar_url
              },
              createdAt: item.created_at,
              latestCommit: item.pushed_at,
              openIssues: item.open_issues
            }
          })));
          dispatch(updateSearchResultsCountTotal(res.data.total_count));
          return dispatch(createGitHubSearchSuccess());
        }
        else {
          let message = `Oops, it looks like something went wrong... HTTP Status ${res.status}: ${res.statusText}`;
          return dispatch(createGitHubSearchFailure(message));
        }
      })
      .catch((res) => {
        let message = `Oops, it looks like something went wrong... HTTP Status ${res.status}: ${res.statusText}`;
        if (res.status === 403) {
          message = "It looks like you've tried to search too many times. GitHub only lets us do 30 searches per minute. Try again in a minute :)";
        }
        return dispatch(createGitHubSearchFailure(message));
      });
  }
}

export function updateSearchResults(results) {
  return {
    type: types.UPDATE_SEARCH_RESULTS,
    results
  }
}

function updateSearchResultsCountTotal(count) {
  return {
    type: types.UPDATE_SEARCH_RESULTS_COUNT_TOTAL,
    count
  }
}

/* We want to wait until the user is done typing before we fetch results, so
   we set a timeout at the end of each keystroke. If a key is pressed before the
   timeout clears, remove the old timeout and set a new one. */
export function typingInSearchField(text) {
  return (dispatch, getState) => {
    clearTimeout(getState().search.typingTimeoutID);
    dispatch(updateSearchField(text));
    return dispatch(setTypingTimeout(setTimeout(() => {
      dispatch(clearSearchResults());
      dispatch(fetchSearchResults());
    }, TYPING_DELAY)));
  }
}

function setTypingTimeout(timeoutID) {
  return {
    type: types.SET_SEARCH_FIELD_TYPING_TIMEOUT,
    timeoutID
  }
}

export function updateSearchField(text) {
  return {
    type: types.UPDATE_SEARCH_FIELD,
    text
  }
}

export function clearSearchResults() {
  return {
    type: types.CLEAR_SEARCH_RESULTS
  }
}

export function domLoaded() {
  return {
    type: types.DOM_LOADED
  }
}

function constructQueryString(query) {
  let queryString = query.text;
  if (query.filters.language) queryString += ` language:${query.filters.language}`;
  if (query.filters.author) queryString += ` user:${query.filters.author}`;
  if (query.filters.lastCommit) {
    let timeStamp = getTimestamp(query.filters.lastCommit);
    queryString += ` pushed:${timeStamp}`;
  }
  if (query.filters.repoCreated) {
    let timeStamp = getTimestamp(query.filters.repoCreated);
    queryString += ` created:${timeStamp}`;
  }
  if (query.filters.stars) {
    queryString += ` stars:>=${query.filters.stars}`;
  }
  if (query.filters.forks) {
    queryString += ` forks:>=${query.filters.forks}`;
  }
  if (query.filters.showForkedRepos) {
    queryString += ` fork:true`;
  }

  // generate a timesteamp based on the filter with the format that the GitHub API expects
  function getTimestamp(value) {
    let time = moment();
    let timeStamp = "";
    let format = "YYYY-MM-DDTHH:mm:ss+07:00";
    switch (value) {
      case "last24Hours":
        timeStamp = ">"+time.subtract(1, 'days').format(format);
        break;
      case "lastWeek":
        timeStamp = ">"+time.subtract(1, 'weeks').format(format);
        break;
      case "lastMonth":
        timeStamp = ">"+time.subtract(1, 'months').format(format);
        break;
      case "last3Months":
        timeStamp = ">"+time.subtract(3, 'months').format(format);
        break;
      case "lastYear":
        timeStamp = ">"+time.subtract(1, 'years').format(format);
        break;
      case "moreThanYear":
        timeStamp = "<"+time.subtract(1, 'years').format(format);
        break;
      default:
        timeStamp = time.format(format);
    }

    return timeStamp;
  }

  console.log(queryString);

  return queryString;
}
