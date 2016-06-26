/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/filters';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Filter Actions', () => {
  describe('Asynchronous Actions', () => {

    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    const successPromise = {
      status: 200,
      data: {
        items: [], total_count: 0
      }
    }
    const fetchResultsSuccessActions = [
      { type: types.GITHUB_SEARCH_REQUEST },
      { type: types.UPDATE_SEARCH_RESULTS, results: [] },
      { type: types.UPDATE_SEARCH_RESULTS_COUNT_TOTAL, count: 0 },
      { type: types.GITHUB_SEARCH_SUCCESS }
    ]

    it('changes the language filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.changeLanguageFilter('JavaScript')).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_LANGUAGE_FILTER, language: 'JavaScript' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('changes the last commit filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.changeLastCommitFilter('last24Hours')).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_LAST_COMMIT_FILTER, value: 'last24Hours' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('changes the repo created filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.changeRepoCreatedFilter('last24Hours')).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_REPO_CREATED_FILTER, value: 'last24Hours' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('changes the stars filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.changeStarsFilter(100)).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_STARS_FILTER, stars: 100 },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('changes the forks filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.changeForksFilter(100)).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_FORKS_FILTER, forks: 100 },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('changes the show forked repos filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.changeShowForkedReposFilter(true)).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_SHOW_FORKED_REPOS_FILTER, showForkedRepos: true },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('changes the author filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });

      store.dispatch(actions.changeAuthorFilter('test'));
      expect(store.getActions().length).toEqual(3);
      expect(store.getActions().filter((action) => {
        return action.type === types.SET_AUTHOR_FILTER_TYPING_TIMEOUT && typeof action.timeoutID === 'number';
      }).length).toEqual(1);
      expect(store.getActions().filter((action) => {
        return action.type !== types.SET_AUTHOR_FILTER_TYPING_TIMEOUT;
      })).toEqual([
        { type: types.CLEAR_SEARCH_RESULTS },
        { type: types.UPDATE_AUTHOR_FILTER, text: 'test' }
      ]);
      done();
    });

    it('clears the language filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.clearLanguageFilter()).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_LANGUAGE_FILTER, language: '' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('clears the last commit filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.clearLastCommitFilter()).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_LAST_COMMIT_FILTER, value: '' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('clears the repo created filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.clearRepoCreatedFilter()).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_REPO_CREATED_FILTER, value: '' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('clears the stars filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.clearStarsFilter()).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_STARS_FILTER, stars: '' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('clears the forks filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.clearForksFilter()).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_FORKS_FILTER, forks: '' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('clears the author filter', done => {
      const store = mockStore({ filters: {}, search: {
          searchText: "test"
        }, sorting: {}
      });
      sandbox.stub(axios, 'get').returns(Promise.resolve(successPromise));
      store.dispatch(actions.clearAuthorFilter()).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.CLEAR_SEARCH_RESULTS },
          { type: types.UPDATE_AUTHOR_FILTER, text: '' },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

  });

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
