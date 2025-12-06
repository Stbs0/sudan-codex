export const paths = {
  root: {
    getHref: () => "/",
  },
  drugList: {
    getHref: () => "/drug-list/",
    getHrefNo: (no: string) => `/drug-list/${no}`,
  },
  stats: {
    root: { getHref: () => "/stats/" },
    agent: { getHref: (slug: string) => `/stats/agent/${slug}` },
    generic: { getHref: (slug: string) => `/stats/generic/${slug}` },
    company: { getHref: (slug: string) => `/stats/company/${slug}` },
  },
  privacyPolicy: {
    getHref: () => `/privacy-policy`,
  },
  userInfo: {
    getHref: () => "/user-info",
  },
  logIn: {
    getHref: () => "/log-in",
  },
  signUp: {
    getHref: () => "/sign-up",
  },
} as const;
