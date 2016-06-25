import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

import FontIcon from 'material-ui/FontIcon';

class ClearButton extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  getStyle() {
    const { style } = this.props;

    let customStyle = style || {};
    customStyle.marginTop = customStyle.marginTop || "40px";
    customStyle.cursor = "pointer";

    return customStyle;
  }

  getIcon() {
    const { active, inactiveIcon } = this.props;

    return active ? 'close' : inactiveIcon;
  }

  render() {
    const { getStyle, getIcon } = this;
    const { onClick } = this.props;

    return <FontIcon className={"material-icons"} style={getStyle()}
      onClick={onClick}>
      {getIcon()}
    </FontIcon>
  }
}

ClearButton.propTypes = {
  active: PropTypes.bool,
  inactiveIcon: PropTypes.string,
  onClick: PropTypes.func
}

export default ClearButton;
