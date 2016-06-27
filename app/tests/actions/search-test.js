/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/search';
import * as types from 'types';
import moment from 'moment';

polyfill();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search Actions', () => {
  describe('Asynchronous Actions', () => {
    describe('Fetch Search Results', () => {
      describe('Search Term is Empty', () => {

        it("does nothing", () => {
          const store = mockStore({
            search: {
              searchText: ''
            }
          });
          store.dispatch(actions.fetchSearchResults());
          expect(store.getActions()).toEqual([]);
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
          const store = mockStore({
            filters: {},
            search: {
              searchText: 'test'
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
          store.dispatch(actions.fetchSearchResults()).then(() => {
            expect(store.getActions()).toEqual([
              { type: types.GITHUB_SEARCH_REQUEST },
              { type: types.UPDATE_SEARCH_RESULTS, results: [] },
              { type: types.UPDATE_SEARCH_RESULTS_COUNT_TOTAL, count: 0 },
              { type: types.GITHUB_SEARCH_SUCCESS }
            ]);
          }).then(done).catch(done);
        });

        it("dispatches request and failure actions when status is not 200", done => {
          const store = mockStore({
            filters: {},
            search: {
              searchText: 'test'
            },
            sorting: {}
          });

          sandbox.stub(axios, 'get').returns(Promise.resolve({
            status: 422
          }));
          store.dispatch(actions.fetchSearchResults()).then(() => {
            expect(store.getActions().length).toEqual(2);
            expect(store.getActions().filter((action) => {
              return action.type === types.GITHUB_SEARCH_FAILURE && typeof action.message === 'string'
            }).length).toEqual(1);
            expect(store.getActions().filter((action) => {
              return action.type !== types.GITHUB_SEARCH_FAILURE
            })).toEqual(
              [ { type: types.GITHUB_SEARCH_REQUEST } ]
            );
          }).then(done).catch(done);
        });

        it("dispatches appropriate actions when typing", done => {
          const store = mockStore({
            filters: {},
            search: {
              searchText: 'test'
            },
            sorting: {}
          });

          store.dispatch(actions.typingInSearchField('test'));
          expect(store.getActions().length).toEqual(3);
          expect(store.getActions().filter((action) => {
            return action.type === types.SET_SEARCH_FIELD_TYPING_TIMEOUT && typeof action.timeoutID === 'number';
          }).length).toEqual(1);
          expect(store.getActions().filter((action) => {
            return action.type !== types.SET_SEARCH_FIELD_TYPING_TIMEOUT
          })).toEqual(
            [
              { type: types.CLEAR_SEARCH_RESULTS },
              { type: types.UPDATE_SEARCH_FIELD, text: 'test' }
            ]
          )
          done();
        });
      });
    }); //fetch results
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

  describe('Constructing the query string', () => {
    it('returns the correct string', () => {
      const query = {
        text: 'test search string',
        filters: {
          language: 'Python',
          author: 'test author',
          lastCommit: 'last24Hours',
          repoCreated: 'moreThanYear',
          stars: 50,
          forks: 100,
          showForkedRepos: true
        }
      }

      let twentyFourHoursAgo = moment().utc().subtract(1, 'days').format("YYYY-MM-DDTHH:mm:ss+07:00");
      let oneYearAgo = moment().utc().subtract(1, 'years').format("YYYY-MM-DDTHH:mm:ss+07:00");
      expect(actions.constructQueryString(query)).toEqual(
        `test search string language:Python user:test author pushed:>${twentyFourHoursAgo} created:<${oneYearAgo} stars:>=50 forks:>=100 fork:true`
      );
    });
  });
});
