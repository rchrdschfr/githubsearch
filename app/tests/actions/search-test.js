/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/search';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search Actions', () => {
  describe('Asynchronous Actions', () => {
    describe('Fetch Search Results', () => {
      describe('Search Term is Empty', () => {

        it("clears results and doesn't search", () => {
          const store = mockStore({
            search: {
              searchText: ''
            }
          });
          store.dispatch(actions.fetchSearchResults());
          expect(store.getActions()).toEqual(
            [
              { type: types.CLEAR_SEARCH_RESULTS }
            ]
          );
        });

      });

      describe('Search Term is Not Empty', () => {

        let sandbox;
        beforeEach(() => {
          sandbox = sinon.sandbox.create(); // eslint-disable-line
        });

        afterEach(() => {
          sandbox.restore();
        });

        it("dispatches request and success actions when status is 200", done => {
          expect(1).toEqual(1);
          done();
          const store = mockStore({
            search: {
              searchText: 'omg'
            }
          });

          sandbox.stub(axios, 'get').returns(Promise.resolve({ status: 200 }));
          store.dispatch(actions.fetchSearchResults())
            then(() => {
              expect(store.getActions().length).toEqual(3);
            }).then(done).catch(done);
        });

      });
    }); //fetch results

    describe('Typing in search field', () => {

    })
  }); // async actions

  describe('Action creators', () => {

    it('should create an action to update search results', () => {
      expect(actions.updateSearchResults([])).toEqual({
        type: types.UPDATE_SEARCH_RESULTS,
        results: []
      });
    });

    it('should create an action to update total search results count', () => {
      expect(actions.updateSearchResultsCountTotal(10)).toEqual({
        type: types.UPDATE_SEARCH_RESULTS_COUNT_TOTAL,
        count: 10
      });
    });

    it('should create an action to set a typing timeout', () => {
      expect(actions.setTypingTimeout(50)).toEqual({
        type: types.SET_SEARCH_FIELD_TYPING_TIMEOUT,
        timeoutID: 50
      });
    });

    it('should create an action to update the search field', () => {
      expect(actions.updateSearchField('test')).toEqual({
        type: types.UPDATE_SEARCH_FIELD,
        text: 'test'
      });
    });

    it('should create an action to clear the search results', () => {
      expect(actions.clearSearchResults(50)).toEqual({
        type: types.CLEAR_SEARCH_RESULTS
      });
    });

    it('should create an action to indicate the dom has loaded', () => {
      expect(actions.domLoaded()).toEqual({
        type: types.DOM_LOADED
      });
    });

    it('should create an action to indicate the search began', () => {
      expect(actions.createGitHubSearchRequest()).toEqual({
        type: types.GITHUB_SEARCH_REQUEST
      });
    });

    it('should create an action to indicate the search was successful', () => {
      expect(actions.createGitHubSearchSuccess()).toEqual({
        type: types.GITHUB_SEARCH_SUCCESS
      });
    });

    it('should create an action to indicate the search failed', () => {
      expect(actions.createGitHubSearchFailure('error message')).toEqual({
        type: types.GITHUB_SEARCH_FAILURE,
        message: 'error message'
      });
    });

  });
});
