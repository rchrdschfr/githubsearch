import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

import classNames from 'classnames/bind';
import styles from 'css/components/search-results';
const cx = classNames.bind(styles);

import Loading from 'components/Loading';
import SearchResult from 'components/search/SearchResult';
import EmptyResults from 'components/search/EmptyResults';
import GetStarted from 'components/search/GetStarted';
import SearchError from 'components/search/SearchError';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  initialResultsLoaded() {
    const { searching, pagesLoaded } = this.props;

    return (!searching || pagesLoaded > 0);
  }

  shouldShowEmptyResultText() {
    const { results, pagesLoaded } = this.props;

    if (pagesLoaded > 0 && results.length === 0) {
      return true;
    }

    return false;
  }

  render() {
    const { initialResultsLoaded, shouldShowEmptyResultText } = this;
    const { searching, results, searchError, errorText, searchText, pagesLoaded, totalResultCount } = this.props;

    if (!searchError) {
      if (searchText) {
        return <div className={cx('search-results')}>
          <Loading active={!initialResultsLoaded()} spinnerName="circle" />
          <ul className={cx('results-list')} style={{ display: shouldShowEmptyResultText() ? 'none' : 'block' }}>
            {results.map((result, index) => {
              return <li key={index} className={cx('result')}>
                <SearchResult result={result} />
              </li>
            })}
          </ul>
          <div style={{ display: shouldShowEmptyResultText() ? 'block' : 'none' }}>
            <EmptyResults />
          </div>
        </div>
      }
      else {
        return <div className={cx('search-results')}><GetStarted /></div>
      }
    }
    else {
      return <div className={cx('search-results')}><SearchError message={errorText} /></div>
    }
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  pagesLoaded: PropTypes.number.isRequired
}

export default SearchResults;
