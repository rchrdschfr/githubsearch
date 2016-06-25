import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

import classNames from 'classnames/bind';
import styles from 'css/components/header';
const cx = classNames.bind(styles);

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';

import { toggleFilters, openFilters } from 'actions/filters';

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onToggleFiltersClick() {
    const { dispatch } = this.props;
    dispatch(openFilters());
  }

  calculateTitleStyle() {
    const { showSidebar, screenGreaterThan } = this.props;

    let style = {};
    if (screenGreaterThan.small) {
      style.position = "absolute";
      if (showSidebar) {
        return {...style, left: "280px"};
      }
      else {
        return {...style, left: "80px"};
      }
    }
  }

  render() {
    const { calculateTitleStyle } = this;

    return <div className={cx('header')}>
      <AppBar
        title={"GitHubSearch"}
        style={{ position: "fixed", backgroundColor: "orange", fontFamily: "Cabin" }}
        titleStyle={calculateTitleStyle()}
        onLeftIconButtonTouchTap={this.onToggleFiltersClick} />
    </div>
  }
}

Header.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  screenGreaterThan: PropTypes.object.isRequired
}

export default Header;
