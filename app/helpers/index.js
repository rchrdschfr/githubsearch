export function shouldShowSidebar(open, bigScreen) {
  if (typeof open === 'undefined') {
    return bigScreen ? true : false;
  }
  return open;
}
