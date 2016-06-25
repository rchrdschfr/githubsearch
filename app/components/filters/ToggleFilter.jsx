import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

import Toggle from 'material-ui/Toggle';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import ClearButton from 'components/filters/ClearButton';

class ToggleFilter extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { toggled, label, onToggle } = this.props;

    return <Toggle
      label={label}
      labelStyle={{ fontSize: "0.9em" }}
      labelPosition={"right"}
      defaultToggled={false}
      onToggle={onToggle} />
  }
}

ToggleFilter.propTypes = {
  toggled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default ToggleFilter;
