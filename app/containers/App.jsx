/* This is our only "container" component, which means that it is not concerned
   with presentation details, and is more concerned about passing data to our
   presentation components by acting as bridge between the Redux store and
   our React components. */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Loader from 'react-loader';

import classNames from 'classnames/bind';
import styles from 'css/main';
const cx = classNames.bind(styles);

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Content from 'components/Content';

import { domLoaded } from 'actions/search';

const muiTheme = getMuiTheme({
  fontFamily: 'Quicksand',
});

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    document.addEventListener('DOMContentLoaded', () => {
      dispatch(domLoaded());
    });
  }

  onScrollPastTop() {
    const { dispatch } = this.props;
    dispatch(scrolledPastTop());
  }
  onScrollIntoTop() {
    const { dispatch } = this.props;
    dispatch(scrolledIntoTop());
  }

  render() {
    const { domLoaded } = this.props;

    return <Loader loaded={domLoaded} radius={15} length={25} color={'#00BCD4'}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={cx('app')}>
          <Header {...this.props} />
          <Sidebar {...this.props} />
          <Content {...this.props} />
        </div>
      </MuiThemeProvider>
    </Loader>
  }
}

App.propTypes = {
  filters: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired,
  screenGreaterThan: PropTypes.object.isRequired,
  searching: PropTypes.bool.isRequired,
  searchError: PropTypes.bool.isRequired,
  totalResultCount: PropTypes.number.isRequired,
  hasScrolledPastTop: PropTypes.bool.isRequired,
  showSidebar: PropTypes.bool,
  domLoaded: PropTypes.bool
}

/* The connect function allows us to map the application state (data in the Redux store)
   and pass that data to our component in the form of props. Every time the state changes,
   this function is run and React determines if it is neccesary to re-render any part of
   the document */
export default connect((state) => {
  return {
    filters: state.filters,
    sorting: state.sorting,
    results: state.search.results,
    searchText: state.search.searchText,
    screenGreaterThan: state.browser.greaterThan,
    searching: state.search.searching,
    searchError: state.search.searchError,
    errorText: state.search.errorText,
    totalResultCount: state.search.totalResultCount,
    pagesLoaded: state.search.pagesLoaded,
    hasScrolledPastTop: state.search.hasScrolledPastTop,
    showSidebar: ((open, bigScreen) => {
      if (typeof open === 'undefined') {
        return bigScreen ? true : false;
      }
      return open;
    })(state.filters.open, state.browser.greaterThan.small),
    domLoaded: state.search.domLoaded
  }
})(App);
