import expect from 'expect';
import reducer from 'reducers/search';
import * as types from 'types';

describe('Search reducer', () => {
  const defaultState = {
    results: [],
    searching: false,
    searchError: false,
    errorText: '',
    searchText: '',
    totalResultCount: 0,
    typingTimeoutID: null,
    pagesLoaded: 0,
    domLoaded: false
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      defaultState
    );
  });

  it('Should handle UPDATE_SEARCH_FIELD', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_SEARCH_FIELD,
        text: 'test'
      })
    ).toEqual({...defaultState, searchText: 'test'});
  });

  it('Should handle UPDATE_SEARCH_RESULTS', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_SEARCH_RESULTS,
        results: [{}, {}, {}]
      }).results.length
    ).toEqual(3);
  });

  it('Should handle GITHUB_SEARCH_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.GITHUB_SEARCH_REQUEST
      })
    ).toEqual({...defaultState, searching: true });
  });

  it('Should handle GITHUB_SEARCH_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.GITHUB_SEARCH_SUCCESS,
      })
    ).toEqual({...defaultState, pagesLoaded: 1 });
  });

  it('Should handle GITHUB_SEARCH_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: types.GITHUB_SEARCH_FAILURE,
        message: 'ERROR!'
      })
    ).toEqual({...defaultState, searchError: true, errorText: 'ERROR!' });
  });

  it('Should handle SET_SEARCH_FIELD_TYPING_TIMEOUT', () => {
    expect(
      reducer(undefined, {
        type: types.SET_SEARCH_FIELD_TYPING_TIMEOUT,
        timeoutID: 500
      })
    ).toEqual({...defaultState, typingTimeoutID: 500 });
  });

  it('Should handle CLEAR_SEARCH_RESULTS', () => {
    expect(
      reducer({
        ...defaultState,
        results: [{}, {}, {}],
        pagesLoaded: 3,
        totalResultCount: 90
      }, {
        type: types.CLEAR_SEARCH_RESULTS
      })
    ).toEqual({...defaultState, results: [], pagesLoaded: 0, totalResultCount: 0 });
  });

  it('Should handle UPDATE_SEARCH_RESULTS_COUNT_TOTAL', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_SEARCH_RESULTS_COUNT_TOTAL,
        count: 50
      })
    ).toEqual({...defaultState, totalResultCount: 50 });
  });

  it('Should handle DOM_LOADED', () => {
    expect(
      reducer(undefined, {
        type: types.DOM_LOADED
      })
    ).toEqual({...defaultState, domLoaded: true });
  });

});
