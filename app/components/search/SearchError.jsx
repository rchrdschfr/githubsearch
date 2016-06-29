import React, { PropTypes } from 'react';

const SearchError = ({ message }) => {
  return <div style={{ fontFamily: "Quicksand" }}>
    <div>{message}</div>
    </div>
}

SearchError.propTypes = {
  message: PropTypes.string.isRequired
}

export default SearchError;
