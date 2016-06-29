import { connect } from 'react-redux';

import Content from 'components/Content';

import { typingInSearchField, fetchSearchResults } from 'actions/search';
import { changeSortType, changeSortOrder, clearSorting } from 'actions/sorting';

import { shouldShowSidebar } from 'helpers';

import { RESULTS_PER_PAGE } from 'constants';

export default connect(
  (state) => {
    return {
      results: state.search.results,
      totalResultCount: state.search.totalResultCount,
      searchText: state.search.searchText,
      searchError: state.search.searchError,
      errorText: state.search.errorText,
      searching: state.search.searching,
      pagesLoaded: state.search.pagesLoaded,
      sorting: state.sorting,
      bigScreen: state.browser.greaterThan.small,
      showSidebar: shouldShowSidebar(state.filters.open, state.browser.greaterThan.small),
    }
  },
  (dispatch) => {
    return {
      onTypingInSearchField: (text) => {
        dispatch(typingInSearchField(text));
      },
      onSortTypeChange: (event, index, payload) => {
        dispatch(changeSortType(payload));
      },
      onSortOrderChange: (event, index, payload) => {
        dispatch(changeSortOrder(payload));
      },
      onClearSortingButtonClick: () => {
        dispatch(clearSorting());
      },
      onScrollToBottom: (resultCount, totalResultCount, pagesLoaded, searching) => {
        if (!searching && resultCount > 0) {
          if (pagesLoaded < (totalResultCount/RESULTS_PER_PAGE)) {
            if (resultCount < totalResultCount) {
              dispatch(fetchSearchResults());
            }
          }
        }
      },
    }
  }
)(Content);
