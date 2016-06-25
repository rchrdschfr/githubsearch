import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';
import Waypoint from 'react-waypoint';

import classNames from 'classnames/bind';
import styles from 'css/components/content';
const cx = classNames.bind(styles);

import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import Sorts from 'components/Sorts';
import ResultCount from 'components/search/ResultCount';
import SearchResults from 'components/search/SearchResults';
import Loading from 'components/Loading';

import { typingInSearchField, fetchSearchResults, scrolledPastTop, scrolledIntoTop } from 'actions/search';

import { RESULTS_PER_PAGE } from 'constants';

class Content extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onTypingInSearchField(e) {
    const { dispatch } = this.props;

    dispatch(typingInSearchField(e.target.value));
  }

  componentDidMount() {
    const { dispatch, hasScrolledPastTop } = this.props;

    document.getElementById('search-field-input').focus();
  }

  onScrollToBottom() {
    const { dispatch, results, totalResultCount, pagesLoaded, searching } = this.props;

    if (!searching && results.length > 0) {
      if (pagesLoaded < (totalResultCount/RESULTS_PER_PAGE)) {
        if (results.length < totalResultCount) {
          dispatch(fetchSearchResults());
        }
      }
    }
  }

  backToTopDisplay() {
    const { results, hasScrolledPastTop } = this.props;

    return (results.length > 0 && hasScrolledPastTop) ? "block" : "none";
  }

  calculateContentStyle() {
    const { showSidebar, screenGreaterThan } = this.props;

    let style = {
      paddingRight: "20px",
      paddingLeft: "20px",
      paddingTop: "50px"
    };
    if (showSidebar && screenGreaterThan.small) {
      style.marginLeft = "280px";
      style.paddingLeft = "0px";
    }

    return style;
  }

  isLoadingMore() {
    const { searching, results } = this.props;

    return results.length > 0 && searching;
  }

  render() {
    const { isLoadingMore, filterAuthor, formatResultCount, backToTopDisplay, calculateContentStyle, getScrollToTopDisplay } = this;
    const { results, searching, searchText, totalResultCount } = this.props;

    return <div style={calculateContentStyle()} className={cx('content')}>
      <TextField
        fullWidth
        style={{ height: "60px", fontSize: "24px", marginTop: "20px" }}
        id={"search-field-input"}
        name={"searchField"}
        value={searchText}
        placeholder={"What are you looking for?"}
        onChange={this.onTypingInSearchField} />

      <Sorts {...this.props} />
      <ResultCount {...this.props} />
      <SearchResults {...this.props} />

      <Loading active={isLoadingMore()} spinnerName="circle" />
      <Waypoint onEnter={this.onScrollToBottom} />
    </div>
  }
}

Content.propTypes = {
  results: PropTypes.array.isRequired,
  totalResultCount: PropTypes.number.isRequired,
  pagesLoaded: PropTypes.number.isRequired,
  searching: PropTypes.bool.isRequired,
  screenGreaterThan: PropTypes.object.isRequired
}

export default Content;
