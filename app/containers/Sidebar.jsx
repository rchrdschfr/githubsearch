import { connect } from 'react-redux';

import Sidebar from 'components/Sidebar';

import {
  closeFilters, changeForksFilter, clearForksFilter, changeLanguageFilter,
  changeLastCommitFilter, changeStarsFilter, changeShowForkedReposFilter,
  changeRepoCreatedFilter, changeAuthorFilter, clearLanguageFilter, clearLastCommitFilter,
   clearRepoCreatedFilter, clearStarsFilter, clearAuthorFilter
} from 'actions/filters';

import { shouldShowSidebar } from 'helpers';

export default connect(
  (state) => {
    return {
      filters: state.filters,
      showSidebar: shouldShowSidebar(state.filters.open, state.browser.greaterThan.small)
    }
  },
  (dispatch) => {
    return {
      onCloseFiltersClick: () => {
        dispatch(closeFilters());
      },
      onLanguageFilterChange: (event, index, payload) => {
        dispatch(changeLanguageFilter(payload));
      },
      onLastCommitFilterChange: (event, index, payload) => {
        dispatch(changeLastCommitFilter(payload));
      },
      onRepoCreatedFilterChange: (event, index, payload) => {
        dispatch(changeRepoCreatedFilter(payload));
      },
      onStarsFilterChange: (event, index, payload) => {
        dispatch(changeStarsFilter(payload));
      },
      onForksFilterChange: (event, index, payload) => {
        dispatch(changeForksFilter(payload));
      },
      onAuthorFilterChange: (e) => {
        dispatch(changeAuthorFilter(e.target.value));
      },
      onShowForkedReposToggle: (e, switchIsOn) => {
        dispatch(changeShowForkedReposFilter(switchIsOn));
      },
      onClearLanguageFilterButtonClick: () => {
        dispatch(clearLanguageFilter());
      },
      onClearLastCommitFilterButtonClick: () => {
        dispatch(clearLastCommitFilter());
      },
      onClearRepoCreatedFilterButtonClick: () => {
        dispatch(clearRepoCreatedFilter());
      },
      onClearStarsFilterButtonClick: () => {
        dispatch(clearStarsFilter());
      },
      onClearForksFilterButtonClick: () => {
        dispatch(clearForksFilter());
      },
      onClearAuthorFilterButtonClick: () => {
        dispatch(clearAuthorFilter());
      }
    }
  }
)(Sidebar);
