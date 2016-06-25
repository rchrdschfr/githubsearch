import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

import classNames from 'classnames/bind';
import styles from 'css/components/sidebar';
const cx = classNames.bind(styles);

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import { animateScroll } from 'react-scroll';

import Filters from 'components/filters/Filters';

import { closeFilters } from 'actions/filters';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onCloseFiltersClick() {
    const { dispatch } = this.props;
    dispatch(closeFilters());
  }

  onScrollToTopButtonClick() {
    animateScroll.scrollToTop();
  }

  render() {
    const { showSidebar } = this.props;

    return <div className={cx('sidebar')}>
      <Drawer containerStyle={{ paddingLeft: "20px", paddingRight: "20px" }} open={showSidebar}>
        <div className={cx("close-filters-button")}>
          <FlatButton style={{ width: "100%", marginBottom: "0px", marginTop: "20px", textAlign: "center" }}
            onClick={this.onCloseFiltersClick}
            label="Close filters"
            labelPosition="after"
            primary={true}
            icon={<FontIcon className={"material-icons"}>subdirectory_arrow_left</FontIcon>}
          />
        </div>

        <Filters {...this.props} />

        <div className={cx("scroll-to-top-button")}>
          <FlatButton style={{ width: "100%", marginBottom: "0px", marginTop: "20px", textAlign: "center" }}
            onClick={this.onScrollToTopButtonClick}
            label="Scroll to top"
            labelPosition="after"
            primary={true}
            icon={<FontIcon className={"material-icons"}>arrow_upward</FontIcon>}
          />
        </div>
      </Drawer>
    </div>
  }
}

Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired
}

export default Sidebar;
