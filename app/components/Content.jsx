import React, { Component, PropTypes } from 'react';
import Waypoint from 'react-waypoint';

import classNames from 'classnames/bind';
import styles from 'css/components/content';
const cx = classNames.bind(styles);

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

import SearchBar from 'components/search/SearchBar';
import Sorts from 'components/Sorts';
import ResultCount from 'components/search/ResultCount';
import SearchResults from 'components/search/SearchResults';
import Loading from 'components/Loading';

import { RESULTS_PER_PAGE } from 'constants';

class Content extends Component {
  componentDidMount() {
    document.getElementById('search-field-input').focus();
  }

  calculateContentStyle(showSidebar, bigScreen) {
    let style = {
      paddingRight: "20px",
      paddingLeft: "20px",
      paddingTop: "50px"
    };
    if (showSidebar && bigScreen) {
      style.marginLeft = "280px";
      style.paddingLeft = "0px";
    }

    return style;
  }

  isLoadingMore(resultCount, searching) {
    return resultCount > 0 && searching;
  }

  render() {
    const {
      results, searching, searchText, totalResultCount, onTypingInSearchField,
      onScrollToBottom, showSidebar, bigScreen, pagesLoaded
    } = this.props;

    return <div style={this.calculateContentStyle(showSidebar, bigScreen)} className={cx('content')}>
      <SearchBar
        searchText={searchText}
        onTypingInSearchField={onTypingInSearchField} />
      <Sorts {...this.props} />
      <ResultCount {...this.props} />
      <SearchResults {...this.props} />

      <Loading active={this.isLoadingMore(results.length, searching)} spinnerName="circle" />
      <Waypoint onEnter={() => {
        onScrollToBottom(
          results.length, totalResultCount, pagesLoaded, searching
        )
      }} />
    </div>
  }
}

Content.propTypes = {
  results: PropTypes.array.isRequired,
  searching: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  totalResultCount: PropTypes.number.isRequired,
  pagesLoaded: PropTypes.number.isRequired,
  searching: PropTypes.bool.isRequired,
  bigScreen: PropTypes.bool.isRequired,
  showSidebar: PropTypes.bool.isRequired,
  onTypingInSearchField: PropTypes.func.isRequired,
  onScrollToBottom: PropTypes.func.isRequired
}

export default Content;
