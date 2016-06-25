import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ClearButton from 'components/filters/ClearButton';

class SelectFilter extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { filterActive, filterIcon, onClearButtonClick, onFilterChange, selectOptions, value, label } = this.props;

    return <Toolbar style={{ backgroundColor: "white", padding: "0px" }}>
      <ToolbarGroup>
        <ClearButton
          onClick={onClearButtonClick}
          active={filterActive}
          inactiveIcon={filterIcon} />
        <SelectField
          floatingLabelStyle={{ paddingLeft: "9px" }}
          labelStyle={{ fontSize: "0.85em", fontFamily: "Roboto" }}
          menuStyle={{ paddingLeft: "9px", color: "black" }}
          underlineStyle={{ marginLeft: "5px", backgroundColor: "blue" }}
          floatingLabelText={label}
          style={{ width: "185px" }}
          value={value}
          onChange={onFilterChange}>
          {selectOptions.map((option, index) => {
            return <MenuItem key={index} value={option.value} primaryText={option.label} />
          })}
        </SelectField>
      </ToolbarGroup>
    </Toolbar>
  }
}

SelectFilter.propTypes = {
  filterActive: PropTypes.bool.isRequired,
  filterIcon: PropTypes.string.isRequired,
  onClearButtonClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  selectOptions: PropTypes.array.isRequired
}

export default SelectFilter;
