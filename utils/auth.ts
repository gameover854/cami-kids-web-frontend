export function setAuthToken(token: string, maxAgeSeconds = 8 * 60 * 60) {
  localStorage.setItem("token", token);
  document.cookie = `auth_token=${token}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

export function clearAuthToken() {
  localStorage.removeItem("token");
  document.cookie = "auth_token=; path=/; max-age=0; samesite=lax";
}

export function getSafeRedirectPath(redirect: string | null | undefined) {
  if (!redirect) return "/admin";
  if (!redirect.startsWith("/")) return "/admin";
  if (redirect.startsWith("//")) return "/admin";
  if (redirect.startsWith("/login")) return "/admin";
  return redirect;
}

export function hasAuthCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((item) => item.trim().startsWith("auth_token="));
}
