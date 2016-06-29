/* This is the component that gets mounted on to the document */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Loader from 'react-loader';

import classNames from 'classnames/bind';
import styles from 'css/main';
const cx = classNames.bind(styles);

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';
import Content from 'containers/Content';

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
    const { onDomLoaded } = this.props;
    document.addEventListener('DOMContentLoaded', () => {
      onDomLoaded();
    });
  }

  render() {
    const { domLoaded } = this.props;

    return <Loader loaded={domLoaded} radius={15} length={25} color={'#00BCD4'}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={cx('app')}>
          <Header />
          <Sidebar />
          <Content />
        </div>
      </MuiThemeProvider>
    </Loader>
  }
}

App.propTypes = {
  domLoaded: PropTypes.bool.isRequired,
  onDomLoaded: PropTypes.func.isRequired
}

/* The connect function allows us to map the application state (data in the Redux store)
   and pass that data to our component in the form of props. Every time the state changes,
   this function is run and React determines if it is neccesary to re-render any part of
   the document */
export default connect(
  (state) => {
    return {
      domLoaded: state.search.domLoaded
    }
  },
  (dispatch) => {
    return {
      onDomLoaded: () => {
        dispatch(domLoaded());
      }
    }
  }
)(App);
