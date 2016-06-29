import React, { PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const CloseFiltersButton = ({ onCloseFiltersClick }) => {
  return <FlatButton style={{ width: "100%", marginBottom: "0px", marginTop: "20px", textAlign: "center" }}
    onClick={onCloseFiltersClick}
    label="Close filters"
    labelPosition="after"
    primary={true}
    icon={<FontIcon className={"material-icons"}>subdirectory_arrow_left</FontIcon>}
  />
}

CloseFiltersButton.propTypes = {
  onCloseFiltersClick: PropTypes.func.isRequired
}

export default CloseFiltersButton;
