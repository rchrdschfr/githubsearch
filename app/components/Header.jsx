import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/header';
const cx = classNames.bind(styles);

import AppBar from 'material-ui/AppBar';

class Header extends Component {
  calculateTitleStyle(showSidebar, bigScreen) {
    let style = {};
    if (bigScreen) {
      style.position = "absolute";
      if (showSidebar) {
        return {...style, left: "280px"};
      }
      else {
        return {...style, left: "80px"};
      }
    }
    return style;
  }

  render() {
    const { onToggleFiltersClick, showSidebar, bigScreen } = this.props;
    return <div className={cx('header')}>
      <AppBar
        title={"GitHubSearch"}
        style={{ position: "fixed", backgroundColor: "orange", fontFamily: "Cabin" }}
        titleStyle={this.calculateTitleStyle(showSidebar, bigScreen)}
        onLeftIconButtonTouchTap={onToggleFiltersClick} />
    </div>
  }
}

Header.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  bigScreen: PropTypes.bool.isRequired,
  onToggleFiltersClick: PropTypes.func.isRequired
}

export default Header;
