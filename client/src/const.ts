export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Local login URL
export const getLoginUrl = (returnTo?: string) => {
  const loginPath = '/cms/login';
  if (returnTo && returnTo !== '/') {
    return `${loginPath}?returnTo=${encodeURIComponent(returnTo)}`;
  }
  return loginPath;
};
