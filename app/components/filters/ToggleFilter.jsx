import React, { PropTypes } from 'react';

import Toggle from 'material-ui/Toggle';

const ToggleFilter = ({ toggled, label, onToggle }) => {
  return <Toggle
    label={label}
    labelStyle={{ fontSize: "0.9em" }}
    labelPosition={"right"}
    defaultToggled={false}
    onToggle={onToggle} />
}

ToggleFilter.propTypes = {
  toggled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default ToggleFilter;
