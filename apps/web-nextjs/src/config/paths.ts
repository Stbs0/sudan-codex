export const paths = {
  root: {
    getHref: () => "/",
  },
  drugList: {
    getHref: () => "/drug-list/",
    getHrefNo: (no: string) => `/drug-list/${no}`,
  },
  stats: {
    root: { getHref: () => "/" },
    agent: { getHref: (slug: string) => `/agent/${slug}` },
    generic: { getHref: (slug: string) => `/generic/${slug}` },
    company: { getHref: (slug: string) => `/company/${slug}` },
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
