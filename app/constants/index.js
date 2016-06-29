export const RESULTS_PER_PAGE = 30;
export const TYPING_DELAY = 500;
export const DEFAULT_SEARCH_ERROR_MESSAGE = "Oops, something went wrong :( Try again.";

export const LANGUAGE_FILTER_OPTIONS = [
  'JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++',
  'C', 'Shell', 'C#', 'Objective-C', 'R', 'VimL', 'Go', 'Perl',
  'CoffeeScript', 'TeX', 'Swift', 'Scala', 'Emacs Lisp', 'Haskell',
  'Lua', 'Clojure', 'Matlab', 'Arduino', 'Makefile', 'Groovy', 'Puppet',
  'Rust', 'Powershell'].sort().map((language) => {
   return { value: language, label: language }
});

export const LAST_COMMIT_FILTER_OPTIONS = [
  { value: "last24Hours", label: "in the last 24 hours" },
  { value: "lastWeek", label: "in the last week" },
  { value: "lastMonth", label: "in the last month" },
  { value: "last3Months", label: "in the last 3 months" },
  { value: "lastYear", label: "in the last year" },
  { value: "moreThanYear", label: "more than a year ago" }
];

export const REPO_CREATED_FILTER_OPTIONS = [
  { value: "last24Hours", label: "in the last 24 hours" },
  { value: "lastWeek", label: "in the last week" },
  { value: "lastMonth", label: "in the last month" },
  { value: "last3Months", label: "in the last 3 months" },
  { value: "lastYear", label: "in the last year" },
  { value: "moreThanYear", label: "more than a year ago" }
];

export const STARS_FILTER_OPTIONS = [
  10, 50, 100, 500, 1000, 10000, 50000
].map((stars) => {
  return { value: stars, label: `${stars.toLocaleString()} stars` }
});

export const FORKS_FILTER_OPTIONS = [
  10, 50, 100, 500, 1000, 10000, 50000
].map((forks) => {
  return { value: forks, label: `${forks.toLocaleString()} forks` }
});

// GitHub only lets us do 10 searches per minute for unauthenticated requests.
// We get 30 per minute if the request is authenticated. For now I've created
// a dummy GitHub account and just put the credentials here so that we can access
// the GitHub API in the client. There is probably a better solution for production,
// but for the purposes of this app as a technical test we will just leave it
// like this so we can enjoy getting more requests per minute :)
export const GITHUB_USER_NAME = 'chardboy';
export const GITHUB_PASSWORD = 'password1';
