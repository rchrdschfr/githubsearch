import {
  CHANGE_SORT_TYPE,
  CHANGE_SORT_ORDER } from 'types';

export default function sorting(state = {
  order: 'desc',
  type: 'relevance'
}, action = {}) {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      state.order = action.order;
      return {...state};
    case CHANGE_SORT_TYPE:
      state.type = action.sortType;
      return {...state};
    default:
      return state;
  }
}
