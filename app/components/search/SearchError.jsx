import React, { Component } from 'react';
import { DEFAULT_SEARCH_ERROR_MESSAGE } from 'constants';

class SearchError extends Component {
  constructor(props) {
    super(props);
    this.message = this.props.message || DEFAULT_SEARCH_ERROR_MESSAGE;
  }
  render() {
    const { message } = this;
    return <div style={{ fontFamily: "Quicksand" }}>
      <div>{message}</div>
      </div>
  }
}

export default SearchError;
