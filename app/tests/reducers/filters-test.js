import expect from 'expect';
import reducer from 'reducers/filters';
import * as types from 'types';

describe('Filters reducer', () => {
  const defaultState = {
    open: undefined,
    language: '',
    lastCommit: '',
    repoCreated: '',
    stars: '',
    forks: '',
    author: '',
    showForkedRepos: false,
    typingAuthorFilterTimeoutID: null
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      defaultState
    );
  });

  it('Should handle CLOSE_FILTERS', () => {
    expect(
      reducer(undefined, {
        type: types.CLOSE_FILTERS
      })
    ).toEqual({...defaultState, open: false });
  });

  it('Should handle OPEN_FILTERS', () => {
    expect(
      reducer(undefined, {
        type: types.OPEN_FILTERS
      })
    ).toEqual({...defaultState, open: true });
  });

  it('Should handle UPDATE_LANGUAGE_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_LANGUAGE_FILTER,
        language: 'JavaScript'
      })
    ).toEqual({...defaultState, language: 'JavaScript' });
  });

  it('Should handle UPDATE_LAST_COMMIT_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_LAST_COMMIT_FILTER,
        value: '1988-01-31T18:08:00+07:00'
      })
    ).toEqual({...defaultState, lastCommit: '1988-01-31T18:08:00+07:00' });
  });

  it('Should handle UPDATE_REPO_CREATED_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_REPO_CREATED_FILTER,
        value: '1988-01-31T18:08:00+07:00'
      })
    ).toEqual({...defaultState, repoCreated: '1988-01-31T18:08:00+07:00' });
  });

  it('Should handle UPDATE_STARS_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_STARS_FILTER,
        stars: 789
      })
    ).toEqual({...defaultState, stars: 789 });
  });

  it('Should handle UPDATE_FORKS_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_FORKS_FILTER,
        forks: 789
      })
    ).toEqual({...defaultState, forks: 789 });
  });

  it('Should handle UPDATE_AUTHOR_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_AUTHOR_FILTER,
        text: 'prince'
      })
    ).toEqual({...defaultState, author: 'prince' });
  });

  it('Should handle UPDATE_SHOW_FORKED_REPOS_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_SHOW_FORKED_REPOS_FILTER,
        showForkedRepos: true
      })
    ).toEqual({...defaultState, showForkedRepos: true });
  });

  it('Should handle SET_AUTHOR_FILTER_TYPING_TIMEOUT', () => {
    expect(
      reducer(undefined, {
        type: types.SET_AUTHOR_FILTER_TYPING_TIMEOUT,
        timeoutID: 100
      })
    ).toEqual({...defaultState, typingAuthorFilterTimeoutID: 100 });
  });
});
