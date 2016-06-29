import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/filters';
const cx = classNames.bind(styles);

import FontIcon from 'material-ui/FontIcon';

import SelectFilter from 'components/filters/SelectFilter';
import TextFilter from 'components/filters/TextFilter';
import ToggleFilter from 'components/filters/ToggleFilter';

import {
  LANGUAGE_FILTER_OPTIONS, LAST_COMMIT_FILTER_OPTIONS, REPO_CREATED_FILTER_OPTIONS,
  STARS_FILTER_OPTIONS, FORKS_FILTER_OPTIONS
} from 'constants';

const Filters = ({
  filters, onLanguageFilterChange, onLastCommitFilterChange, onRepoCreatedFilterChange,
  onStarsFilterChange, onForksFilterChange, onShowForkedReposToggle, onAuthorFilterChange,
  onClearLanguageFilterButtonClick, onClearLastCommitFilterButtonClick, onClearRepoCreatedFilterButtonClick,
  onClearStarsFilterButtonClick, onClearForksFilterButtonClick, onClearAuthorFilterButtonClick
}) => {
  return <div className={cx('filters')}>

    <div className={cx(["filter", "language-filter"])}>
      <SelectFilter selectOptions={LANGUAGE_FILTER_OPTIONS}
        filterActive={filters.language ? true : false}
        filterIcon={'text_format'}
        value={filters.language}
        onFilterChange={onLanguageFilterChange}
        onClearButtonClick={onClearLanguageFilterButtonClick}
        label={"Written in..."} />
    </div>
    <div className={cx(["filter", "last-commit-filter"])}>
      <SelectFilter selectOptions={LAST_COMMIT_FILTER_OPTIONS}
        filterActive={filters.lastCommit ? true : false}
        filterIcon={"update"}
        value={filters.lastCommit}
        onFilterChange={onLastCommitFilterChange}
        onClearButtonClick={onClearLastCommitFilterButtonClick}
        label={"Last commit was..."} />
    </div>
    <div className={cx(["filter", "repo-created-filter"])}>
      <SelectFilter selectOptions={REPO_CREATED_FILTER_OPTIONS}
        filterActive={filters.repoCreated ? true : false}
        filterIcon={"create"}
        value={filters.repoCreated}
        onFilterChange={onRepoCreatedFilterChange}
        onClearButtonClick={onClearRepoCreatedFilterButtonClick}
        label={"Repo created..."} />
    </div>
    <div className={cx(["filter", "stars-filter"])}>
      <SelectFilter selectOptions={STARS_FILTER_OPTIONS}
        filterActive={filters.stars ? true : false}
        filterIcon={"star"}
        value={filters.stars}
        onFilterChange={onStarsFilterChange}
        onClearButtonClick={onClearStarsFilterButtonClick}
        label={"Has at least..."} />
    </div>
    <div className={cx(["filter", "forks-filter"])}>
      <SelectFilter selectOptions={FORKS_FILTER_OPTIONS}
        filterActive={filters.forks ? true : false}
        filterIcon={"call_split"}
        value={filters.forks}
        onFilterChange={onForksFilterChange}
        onClearButtonClick={onClearForksFilterButtonClick}
        label={"Has at least..."} />
    </div>
    <div className={cx(["filter", "show-forked-repos-filter"])}>
      <ToggleFilter onToggle={onShowForkedReposToggle}
        toggled={filters.showForkedRepos}
        label={"Include forked repos?"} />
    </div>
    <div className={cx(["filter", "author-filter"])}>
      <TextFilter onClearButtonClick={onClearAuthorFilterButtonClick}
        filterActive={filters.author ? true : false}
        filterIcon={"person"}
        label={filters.author ? "Author's name is..." : ""}
        placeholder={"Author's name is..."}
        onFilterChange={onAuthorFilterChange}
        value={filters.author} />
    </div>

  </div>
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
  }),
  onLanguageFilterChange: PropTypes.func.isRequired,
  onLastCommitFilterChange: PropTypes.func.isRequired,
  onRepoCreatedFilterChange: PropTypes.func.isRequired,
  onStarsFilterChange: PropTypes.func.isRequired,
  onForksFilterChange: PropTypes.func.isRequired,
  onShowForkedReposToggle: PropTypes.func.isRequired,
  onAuthorFilterChange: PropTypes.func.isRequired,
  onClearLanguageFilterButtonClick: PropTypes.func.isRequired,
  onClearLastCommitFilterButtonClick: PropTypes.func.isRequired,
  onClearRepoCreatedFilterButtonClick: PropTypes.func.isRequired,
  onClearStarsFilterButtonClick: PropTypes.func.isRequired,
  onClearForksFilterButtonClick: PropTypes.func.isRequired,
  onClearAuthorFilterButtonClick: PropTypes.func.isRequired
}

export default Filters;
