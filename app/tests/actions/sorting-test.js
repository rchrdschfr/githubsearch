/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/sorting';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Sorting Actions', () => {
  describe('Asynchronous Actions', () => {

    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    const fetchResultsSuccessActions = [
      { type: types.GITHUB_SEARCH_REQUEST },
      { type: types.UPDATE_SEARCH_RESULTS, results: [] },
      { type: types.UPDATE_SEARCH_RESULTS_COUNT_TOTAL, count: 0 },
      { type: types.GITHUB_SEARCH_SUCCESS }
    ]

    it('clears results when search term is not blank', done => {
      const store = mockStore({
        filters: {},
        search: {
          searchText: "test"
        },
        sorting: {}
      });

      sandbox.stub(axios, 'get').returns(Promise.resolve({
        status: 200,
        data: {
          items: [],
          total_count: 0
        }
      }));
      store.dispatch(actions.clearSorting()).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_SORT_TYPE, sortType: "relevance" },
          { type: types.UPDATE_SORT_ORDER, order: "desc" },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('clears results when search term is blank', done => {
      const store = mockStore({
        filters: {},
        search: {
          searchText: ""
        },
        sorting: {}
      });

      store.dispatch(actions.clearSorting());
      expect(store.getActions()).toEqual([
        { type: types.UPDATE_SORT_TYPE, sortType: "relevance" },
        { type: types.UPDATE_SORT_ORDER, order: "desc" },
        { type: types.CLEAR_SEARCH_RESULTS },
      ]);
      done();
    });

    it('changes the sort order', done => {
      const store = mockStore({
        filters: {},
        search: {
          searchText: "test"
        },
        sorting: {}
      });

      sandbox.stub(axios, 'get').returns(Promise.resolve({
        status: 200,
        data: {
          items: [],
          total_count: 0
        }
      }));

      store.dispatch(actions.changeSortOrder('asc')).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_SORT_ORDER, order: 'asc' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

    it('changes the sort type', done => {
      const store = mockStore({
        filters: {},
        search: {
          searchText: "test"
        },
        sorting: {}
      });

      sandbox.stub(axios, 'get').returns(Promise.resolve({
        status: 200,
        data: {
          items: [],
          total_count: 0
        }
      }));

      store.dispatch(actions.changeSortType('stars')).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.UPDATE_SORT_TYPE, sortType: 'stars' },
          { type: types.CLEAR_SEARCH_RESULTS },
          ...fetchResultsSuccessActions
        ]);
      }).then(done).catch(done);
    });

  });

  describe('Action Creators', () => {

    it('should create an action to change the sort order', () => {
      expect(actions.updateSortOrder('asc')).toEqual({
        type: types.UPDATE_SORT_ORDER,
        order: 'asc'
      });
    });

    it('should create an action to change the sort type', () => {
      expect(actions.updateSortType('stars')).toEqual({
        type: types.UPDATE_SORT_TYPE,
        sortType: 'stars'
      });
    });

  });
});
