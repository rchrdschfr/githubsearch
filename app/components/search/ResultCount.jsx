import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

class ResultCount extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  formatResultCount(count) {
    if (count) {
      if (count > 1) return `${count.toLocaleString()} results`;
      return '1 result';
    }

    return '0 results';
  }

  render() {
    const { formatResultCount } = this;
    const { totalResultCount, results } = this.props;

    return <div style={{ textAlign: "right", fontFamily: "Quicksand" }}>
      {results.length > 0 ? formatResultCount(totalResultCount) : ""}
    </div>
  }
}

ResultCount.propTypes = {
  results: PropTypes.array.isRequired,
  totalResultCount: PropTypes.number.isRequired
}

export default ResultCount;
