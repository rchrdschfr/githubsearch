import expect from 'expect';
import reducer from 'reducers/sorting';
import * as types from 'types';

describe('Sorting reducer', () => {
  const defaultState = {
    order: 'desc',
    type: 'relevance'
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      defaultState
    );
  });

  it('Should handle CHANGE_SORT_ORDER', () => {
    expect(
      reducer(undefined, {
        type: types.CHANGE_SORT_ORDER,
        order: 'ascending'
      })
    ).toEqual({
      order: 'ascending',
      type: defaultState.type
    });
  });

  it('Should handle CHANGE_SORT_TYPE', () => {
    expect(
      reducer(undefined, {
        type: types.CHANGE_SORT_TYPE,
        sortType: 'stars'
      })
    ).toEqual({
      order: defaultState.order,
      type: 'stars'
    });
  });
});
