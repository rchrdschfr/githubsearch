import React, { PropTypes } from 'react';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';

import ClearButton from 'components/filters/ClearButton';

const TextFilter = ({
  filterActive, filterIcon, value, label, placeholder,
  onClearButtonClick, onFilterChange
}) => {
  return <Toolbar style={{ backgroundColor: "white", padding: "0px" }}>
    <ToolbarGroup>
      <ClearButton
        style={{ marginTop: "30px" }}
        onClick={onClearButtonClick}
        active={filterActive}
        inactiveIcon={filterIcon} />
      <TextField style={{ width: "185px", marginTop: "14px"}}
        floatingLabelStyle={{ paddingLeft: "9px" }}
        inputStyle={{ paddingLeft: "9px" }}
        underlineStyle={{ marginLeft: "5px" }}
        floatingLabelText={label}
        value={value}
        name={"authorFilter"}
        placeholder={placeholder}
        onChange={onFilterChange} />
    </ToolbarGroup>
  </Toolbar>
}

TextFilter.propTypes = {
  filterActive: PropTypes.bool.isRequired,
  filterIcon: PropTypes.string.isRequired,
  onClearButtonClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default TextFilter;
