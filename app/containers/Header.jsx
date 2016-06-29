import { connect } from 'react-redux';

import Header from 'components/Header';

import { openFilters } from 'actions/filters';

import { shouldShowSidebar } from 'helpers';

export default connect(
  (state) => {
    return {
      showSidebar: shouldShowSidebar(state.filters.open, state.browser.greaterThan.small),
      bigScreen: state.browser.greaterThan.small
    }
  },
  (dispatch) => {
    return {
      onToggleFiltersClick: () => {
        dispatch(openFilters());
      }
    }
  }
)(Header);
