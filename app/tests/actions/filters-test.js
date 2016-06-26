/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from 'actions/filters';
import * as types from 'types';

describe('Filter Actions', () => {
  describe('Action Creators', () => {

    it('should create an action to open filters', () => {
      expect(actions.openFilters()).toEqual({
        type: types.OPEN_FILTERS
      });
    });

    it('should create an action to close filters', () => {
      expect(actions.closeFilters()).toEqual({
        type: types.CLOSE_FILTERS
      });
    });

    it('should create an action to update the language filter', () => {
      expect(actions.updateLanguageFilter('JavaScript')).toEqual({
        type: types.UPDATE_LANGUAGE_FILTER,
        language: 'JavaScript'
      });
    });

    it('should create an action to update the last commit filter', () => {
      expect(actions.updateLastCommitFilter('last24Hours')).toEqual({
        type: types.UPDATE_LAST_COMMIT_FILTER,
        value: 'last24Hours'
      });
    });

    it('should create an action to update the repo created filter', () => {
      expect(actions.updateRepoCreatedFilter('last24Hours')).toEqual({
        type: types.UPDATE_REPO_CREATED_FILTER,
        value: 'last24Hours'
      });
    });

    it('should create an action to update the stars filter', () => {
      expect(actions.updateStarsFilter(100)).toEqual({
        type: types.UPDATE_STARS_FILTER,
        stars: 100
      });
    });

    it('should create an action to update the forks filter', () => {
      expect(actions.updateForksFilter(100)).toEqual({
        type: types.UPDATE_FORKS_FILTER,
        forks: 100
      });
    });

    it('should create an action to update the show forked repos filter', () => {
      expect(actions.updateShowForkedReposFilter(true)).toEqual({
        type: types.UPDATE_SHOW_FORKED_REPOS_FILTER,
        showForkedRepos: true
      });
    });

    it('should create an action to update the author filter', () => {
      expect(actions.updateAuthorFilter('coolguy')).toEqual({
        type: types.UPDATE_AUTHOR_FILTER,
        text: 'coolguy'
      });
    });

    it('should create an action to set the author filter typing timeout', () => {
      expect(actions.setAuthorFilterTypingTimeout(50)).toEqual({
        type: types.SET_AUTHOR_FILTER_TYPING_TIMEOUT,
        timeoutID: 50
      });
    });

  });
});
