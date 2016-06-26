/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from 'actions/sorting';
import * as types from 'types';

describe('Sorting Actions', () => {
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
