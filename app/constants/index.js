export const RESULTS_PER_PAGE = 30;
export const TYPING_DELAY = 500;
export const DEFAULT_SEARCH_ERROR_MESSAGE = "Oops, something went wrong :( Try again.";

// GitHub only lets us do 10 searches per minute for unauthenticated requests.
// We get 30 per minute if the request is authenticated. For now I've created
// a dummy GitHub account and just put the credentials here so that we can access
// the GitHub API in the client. There is probably a better solution for production,
// but for the purposes of this app as a technical test we will just leave it
// like this so we can enjoy getting more requests per minute :)
export const GITHUB_USER_NAME = 'chardboy';
export const GITHUB_PASSWORD = 'password1';
