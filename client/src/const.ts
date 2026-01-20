export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = (returnTo?: string) => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  // Include the return path in the callback URL
  const currentPath = returnTo || window.location.pathname;
  const callbackUrl = new URL(`${window.location.origin}/api/oauth/callback`);
  if (currentPath && currentPath !== '/') {
    callbackUrl.searchParams.set('redirect_to', currentPath);
  }
  const redirectUri = callbackUrl.toString();
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
