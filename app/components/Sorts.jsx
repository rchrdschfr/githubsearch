import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

import classNames from 'classnames/bind';
import styles from 'css/components/sorts';
const cx = classNames.bind(styles);

import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import { changeSortType, changeSortOrder, clearSorting } from 'actions/sorting';

class Sorts extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onSortTypeChange(event, index, payload) {
    const { dispatch } = this.props;
    dispatch(changeSortType(payload));
  }

  onSortOrderChange(event, index, payload) {
    const { dispatch } = this.props;
    dispatch(changeSortOrder(payload));
  }

  onClearSortingButtonClick() {
    const { dispatch } = this.props;
    dispatch(clearSorting());
  }

  calculateSortsDisplay() {
    const { results } = this.props;

    return results.length > 0 ? 'block' : 'none';
  }

  render() {
    const { calculateSortsDisplay } = this;
    const { sorting, results } = this.props;

    return <div className={cx('sorts')} style={{ display: calculateSortsDisplay() }}>
      <Toolbar style={{ backgroundColor: 'transparent' }}>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text="sort by" style={{ fontFamily: "Quicksand", marginRight: "0px" }} />
          <DropDownMenu value={sorting.type} onChange={this.onSortTypeChange} style={{ marginRight: "0px" }}>
            <MenuItem value={"relevance"} primaryText="relevance" />
            <MenuItem value={"stars"} primaryText="number of stars" />
            <MenuItem value={"forks"} primaryText="number of forks" />
            <MenuItem value={"updated"} primaryText="time of last commit" />
          </DropDownMenu>
          <DropDownMenu value={sorting.order} onChange={this.onSortOrderChange}>
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
  results: PropTypes.array.isRequired
}

export default Sorts;
