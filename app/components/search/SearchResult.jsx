import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';

import classNames from 'classnames/bind';
import styles from 'css/components/search-result';
const cx = classNames.bind(styles);

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  getTimeAgo(timestamp) {
    return moment(timestamp).from(moment());
  }

  getLanguage(language) {
    return language || "Dothraki";
  }

  render() {
    const { getTimeAgo, getLanguage } = this;
    const { result } = this.props;

    return <Card className={cx('search-result')} style={{ fontFamily: "Quicksand" }}>
      <CardTitle
        subtitleStyle={{ color: "black" }}
        style={{ paddingBottom: "3px" }}
        title={<a href={result.url}>{result.name}</a>}
        subtitle={result.description} />
      <CardHeader
        style={{ paddingBottom: "3px" }}
        titleStyle={{ marginTop: "10px" }}
        title={<span>by <a href={result.owner.url}>{result.owner.login}</a></span>}
        avatar={result.owner.picture} />
      <CardText style={{ paddingTop: "3px" }} className={cx('details')}>
        <ul>
          <li>
            <FontIcon className={"material-icons"} style={{ color: "gold", verticalAlign: "middle" }}>
              star
            </FontIcon> x{result.stars}
          </li>
          <li>
            <FontIcon className={"material-icons"} style={{ verticalAlign: "middle" }}>
              call_split
            </FontIcon> x{result.forks}
          </li>
          <li className={cx("opaque")}>last commit was {getTimeAgo(result.latestCommit)}</li>
          <li className={cx("opaque")}>repo created {getTimeAgo(result.createdAt)}</li>
          <li className={cx("opaque")}>written in <span className={cx("language")}>{getLanguage(result.language)}</span></li>
        </ul>
      </CardText>
    </Card>
  }
}

SearchResult.propTypes = {
  result: PropTypes.shape({
    owner: PropTypes.shape({
      url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
    }),
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    latestCommit: PropTypes.string,
    createdAt: PropTypes.string,
    language: PropTypes.string
  })
}

export default SearchResult;
