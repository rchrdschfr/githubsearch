import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';
import Spinner from 'react-spinkit';

class Loading extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  getDisplayType() {
    const { active } = this.props;

    return active ? 'block' : 'none';
  }

  render() {
    const { getDisplayType } = this;
    const { spinnerName } = this.props;

    return <div style={{ display: getDisplayType(), margin: 'auto', width: "100px", color: 'blue' }}>
      <Spinner spinnerName={spinnerName} />
    </div>
  }
}

Loading.propTypes = {
  active: PropTypes.bool.isRequired,
  spinnerName: PropTypes.string.isRequired
}

export default Loading;
