import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';

const SearchBar = ({ onTypingInSearchField, searchText }) => {
  return <TextField
    fullWidth
    style={{ height: "60px", fontSize: "24px", marginTop: "20px" }}
    id={"search-field-input"}
    name={"searchField"}
    value={searchText}
    placeholder={"What are you looking for?"}
    onChange={e => onTypingInSearchField(e.target.value)} />
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onTypingInSearchField: PropTypes.func.isRequired
}

export default SearchBar;
