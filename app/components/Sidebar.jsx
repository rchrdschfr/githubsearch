import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/sidebar';
const cx = classNames.bind(styles);

import Drawer from 'material-ui/Drawer';

import CloseFiltersButton from 'components/filters/CloseFiltersButton';
import Filters from 'components/filters/Filters';
import ScrollToTopButton from 'components/ScrollToTopButton';

class Sidebar extends Component {
  render() {
    const { showSidebar, onCloseFiltersClick } = this.props;

    return <div className={cx('sidebar')}>
      <Drawer containerStyle={{ paddingLeft: "20px", paddingRight: "20px" }} open={showSidebar}>
        <div className={cx("close-filters-button")}>
          <CloseFiltersButton onCloseFiltersClick={onCloseFiltersClick} />
        </div>

        <div className={cx("filters")}>
          <Filters {...this.props} />
        </div>

        <div className={cx("scroll-to-top-button")}>
          <ScrollToTopButton />
        </div>
      </Drawer>
    </div>
  }
}

Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  onCloseFiltersClick: PropTypes.func.isRequired
}

export default Sidebar;
