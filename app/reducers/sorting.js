import {
  CHANGE_SORT_TYPE,
  CHANGE_SORT_ORDER } from 'types';

export default function sorting(state = {
  order: 'desc',
  type: 'relevance'
}, action = {}) {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return Object.assign({}, state, {
        order: action.order
      });
    case CHANGE_SORT_TYPE:
      return Object.assign({}, state, {
        type: action.sortType
      });
    default:
      return state;
  }
}
