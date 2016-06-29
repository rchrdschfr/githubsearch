import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/search-results';
const cx = classNames.bind(styles);

import Loading from 'components/Loading';
import SearchResult from 'components/search/SearchResult';
import EmptyResults from 'components/search/EmptyResults';
import GetStarted from 'components/search/GetStarted';
import SearchError from 'components/search/SearchError';

import { DEFAULT_SEARCH_ERROR_MESSAGE } from 'constants';

class SearchResults extends Component {
  initialResultsLoaded(searching, pagesLoaded) {
    return (!searching || pagesLoaded > 0);
  }

  shouldShowEmptyResultText(resultCount, pagesLoaded) {
    if (pagesLoaded > 0 && resultCount === 0) {
      return true;
    }

    return false;
  }

  render() {
    const { searching, results, searchError, errorText, searchText, pagesLoaded, totalResultCount } = this.props;

    if (!searchError) {
      if (searchText) {
        return <div className={cx('search-results')}>
          <Loading active={!this.initialResultsLoaded(searching, pagesLoaded)} spinnerName="circle" />
          <ul className={cx('results-list')}
            style={{ display: this.shouldShowEmptyResultText(results.length, pagesLoaded) ? 'none' : 'block' }}>
            {results.map((result, index) => {
              return <li key={index} className={cx('result')}>
                <SearchResult result={result} />
              </li>
            })}
          </ul>
          <div style={{ display: this.shouldShowEmptyResultText(results.length, pagesLoaded) ? 'block' : 'none' }}>
            <EmptyResults />
          </div>
        </div>
      }
      else {
        return <div className={cx('search-results')}>
          <GetStarted />
        </div>
      }
    }
    else {
      return <div className={cx('search-results')}>
        <SearchError message={errorText || DEFAULT_SEARCH_ERROR_MESSAGE} />
      </div>
    }
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  searching: PropTypes.bool.isRequired,
  totalResultCount: PropTypes.number.isRequired,
  searchError: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  pagesLoaded: PropTypes.number.isRequired
}

export default SearchResults;
