import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/sorts';
const cx = classNames.bind(styles);

import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

class Sorts extends Component {
  calculateSortsDisplay(resultCount) {
    return resultCount > 0 ? 'block' : 'none';
  }

  render() {
    const { sorting, results, onSortTypeChange, onSortOrderChange, onClearSortingButtonClick } = this.props;

    return <div className={cx('sorts')} style={{ display: this.calculateSortsDisplay(results.length) }}>
      <Toolbar style={{ backgroundColor: 'transparent' }}>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text="sort by" style={{ fontFamily: "Quicksand", marginRight: "0px" }} />
          <DropDownMenu value={sorting.type} onChange={onSortTypeChange} style={{ marginRight: "0px" }}>
            <MenuItem value={"relevance"} primaryText="relevance" />
            <MenuItem value={"stars"} primaryText="number of stars" />
            <MenuItem value={"forks"} primaryText="number of forks" />
            <MenuItem value={"updated"} primaryText="time of last commit" />
          </DropDownMenu>
          <DropDownMenu value={sorting.order} onChange={onSortOrderChange}>
            <MenuItem value={"desc"} primaryText="descending" />
            <MenuItem value={"asc"} primaryText="ascending" />
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    </div>
  }
}

Sorts.propTypes = {
  sorting: PropTypes.shape({
    order: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }),
  results: PropTypes.array.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onSortOrderChange: PropTypes.func.isRequired,
  onClearSortingButtonClick: PropTypes.func.isRequired
}

export default Sorts;
