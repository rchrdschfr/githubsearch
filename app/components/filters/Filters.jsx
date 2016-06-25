import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';


import classNames from 'classnames/bind';
import styles from 'css/components/filters';
const cx = classNames.bind(styles);

import FontIcon from 'material-ui/FontIcon';

import SelectFilter from 'components/filters/SelectFilter';
import TextFilter from 'components/filters/TextFilter';
import ToggleFilter from 'components/filters/ToggleFilter';

import { changeForksFilter, clearForksFilter,
  changeLanguageFilter, changeLastCommitFilter, changeStarsFilter, changeShowForkedReposFilter,
  changeRepoCreatedFilter, changeAuthorFilter,
  clearLanguageFilter, clearLastCommitFilter,
  clearRepoCreatedFilter, clearStarsFilter, clearAuthorFilter } from 'actions/filters';

class Filters extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.languageOptions = [
      'JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++',
      'C', 'Shell', 'C#', 'Objective-C', 'R', 'VimL', 'Go', 'Perl',
      'CoffeeScript', 'TeX', 'Swift', 'Scala', 'Emacs Lisp', 'Haskell',
      'Lua', 'Clojure', 'Matlab', 'Arduino', 'Makefile', 'Groovy', 'Puppet',
      'Rust', 'Powershell'].sort().map((language) => {
       return { value: language, label: language }
    });
    this.lastCommitOptions = [
      { value: "last24Hours", label: "in the last 24 hours" },
      { value: "lastWeek", label: "in the last week" },
      { value: "lastMonth", label: "in the last month" },
      { value: "last3Months", label: "in the last 3 months" },
      { value: "lastYear", label: "in the last year" },
      { value: "moreThanYear", label: "more than a year ago" }
    ];
    this.repoCreatedOptions = this.lastCommitOptions;
    this.starsOptions = [
      10, 50, 100, 500, 1000, 10000, 50000
    ];
    this.forksOptions = this.starsOptions;
  }

  onLanguageFilterChange(event, index, payload) {
    const { dispatch } = this.props;
    dispatch(changeLanguageFilter(payload))
  }
  onLastCommitFilterChange(event, index, payload) {
    const { dispatch } = this.props;
    dispatch(changeLastCommitFilter(payload));
  }
  onRepoCreatedFilterChange(event, index, payload) {
    const { dispatch } = this.props;
    dispatch(changeRepoCreatedFilter(payload));
  }
  onStarsFilterChange(event, index, payload) {
    const { dispatch } = this.props;
    dispatch(changeStarsFilter(payload));
  }
  onForksFilterChange(event, index, payload) {
    const { dispatch } = this.props;
    dispatch(changeForksFilter(payload));
  }
  onAuthorFilterChange(e) {
    const { dispatch } = this.props;
    dispatch(changeAuthorFilter(e.target.value));
  }
  onShowForkedReposToggle(e, switchIsOn) {
    const { dispatch } = this.props;
    dispatch(changeShowForkedReposFilter(switchIsOn));
  }

  onClearLanguageFilterButtonClick() {
    const { dispatch, filters } = this.props;
    if (filters.language) {
      dispatch(clearLanguageFilter());
    }
  }
  onClearLastCommitFilterButtonClick() {
    const { dispatch, filters } = this.props;
    if (filters.lastCommit) {
      dispatch(clearLastCommitFilter());
    }
  }
  onClearRepoCreatedFilterButtonClick() {
    const { dispatch, filters } = this.props;
    if (filters.repoCreated) {
      dispatch(clearRepoCreatedFilter());
    }
  }
  onClearStarsFilterButtonClick() {
    const { dispatch, filters } = this.props;
    if (filters.stars) {
      dispatch(clearStarsFilter());
    }
  }
  onClearForksFilterButtonClick() {
    const { dispatch, filters } = this.props;
    if (filters.forks) {
      dispatch(clearForksFilter());
    }
  }
  onClearAuthorFilterButtonClick() {
    const { dispatch, filters } = this.props;
    if (filters.author) {
      dispatch(clearAuthorFilter());
    }
  }

  render() {
    const { filters } = this.props;

    return <div className={cx('filters')}>

      <div className={cx(["filter", "language-filter"])}>
        <SelectFilter selectOptions={this.languageOptions}
          filterActive={filters.language ? true : false}
          filterIcon={'text_format'}
          value={filters.language}
          onFilterChange={this.onLanguageFilterChange}
          onClearButtonClick={this.onClearLanguageFilterButtonClick}
          label={"Written in..."} />
      </div>
      <div className={cx(["filter", "last-commit-filter"])}>
        <SelectFilter selectOptions={this.lastCommitOptions}
          filterActive={filters.lastCommit ? true : false}
          filterIcon={"update"}
          value={filters.lastCommit}
          onFilterChange={this.onLastCommitFilterChange}
          onClearButtonClick={this.onClearLastCommitFilterButtonClick}
          label={"Last commit was..."} />
      </div>
      <div className={cx(["filter", "repo-created-filter"])}>
        <SelectFilter selectOptions={this.repoCreatedOptions}
          filterActive={filters.repoCreated ? true : false}
          filterIcon={"create"}
          value={filters.repoCreated}
          onFilterChange={this.onRepoCreatedFilterChange}
          onClearButtonClick={this.onClearRepoCreatedFilterButtonClick}
          label={"Repo created..."} />
      </div>
      <div className={cx(["filter", "stars-filter"])}>
        <SelectFilter selectOptions={this.starsOptions.map((stars) => {
            return { value: stars, label: `${stars.toLocaleString()} stars` }
          })}
          filterActive={filters.stars ? true : false}
          filterIcon={"star"}
          value={filters.stars}
          onFilterChange={this.onStarsFilterChange}
          onClearButtonClick={this.onClearStarsFilterButtonClick}
          label={"Has at least..."} />
      </div>
      <div className={cx(["filter", "forks-filter"])}>
        <SelectFilter selectOptions={this.forksOptions.map((forks) => {
            return { value: forks, label: `${forks.toLocaleString()} forks` }
          })}
          filterActive={filters.forks ? true : false}
          filterIcon={"call_split"}
          value={filters.forks}
          onFilterChange={this.onForksFilterChange}
          onClearButtonClick={this.onClearForksFilterButtonClick}
          label={"Has at least..."} />
      </div>
      <div className={cx(["filter", "show-forked-repos-filter"])}>
        <ToggleFilter onToggle={this.onShowForkedReposToggle}
          toggled={filters.showForkedRepos}
          label={"Include forked repos?"} />
      </div>
      <div className={cx(["filter", "author-filter"])}>
        <TextFilter onClearButtonClick={this.onClearAuthorFilterButtonClick}
          filterActive={filters.author ? true : false}
          filterIcon={"person"}
          label={filters.author ? "Author's name is..." : ""}
          placeholder={"Author's name is..."}
          onFilterChange={this.onAuthorFilterChange}
          value={filters.author} />
      </div>

    </div>
  }
}

Filters.propTypes = {
  filters: PropTypes.shape({
    language: PropTypes.string.isRequired,
    lastCommit: PropTypes.string.isRequired,
    repoCreated: PropTypes.string.isRequired,
    stars: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    forks: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    showForkedRepos: PropTypes.bool.isRequired,
    author: PropTypes.string.isRequired,
  })
}

export default Filters;
