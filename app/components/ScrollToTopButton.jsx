import React, { PropTypes } from 'react';
import { animateScroll } from 'react-scroll';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const ScrollToTopButton = () => {
  return <FlatButton style={{ width: "100%", marginBottom: "0px", marginTop: "20px", textAlign: "center" }}
    onClick={() => {
      animateScroll.scrollToTop();
    }}
    label="Scroll to top"
    labelPosition="after"
    primary={true}
    icon={<FontIcon className={"material-icons"}>arrow_upward</FontIcon>}
  />
}

export default ScrollToTopButton;
