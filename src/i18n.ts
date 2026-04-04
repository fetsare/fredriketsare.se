import {
  NAV_LINKS,
  NAV_LINKS_EN,
  REVIEW_NAV_LINKS,
  REVIEW_NAV_LINKS_EN,
} from "./consts";

export type SiteLocale = "sv" | "en";

export const DEFAULT_LOCALE: SiteLocale = "sv";

type NavLink = {
  href: string;
  label: string;
};

const SV_TO_EN_SEGMENT: Record<string, string> = {
  projekt: "projects",
  mig: "about",
  bilder: "images",
  kyrkor: "churches",
  ol: "beer",
};

const EN_TO_SV_SEGMENT: Record<string, string> = {
  projects: "projekt",
  about: "mig",
  images: "bilder",
  churches: "kyrkor",
  beer: "ol",
};

const normalizePath = (pathname: string) => {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
};

export const getLocaleFromPathname = (pathname: string): SiteLocale => {
  const path = normalizePath(pathname);
  return path === "/en" || path.startsWith("/en/") ? "en" : "sv";
};

const stripLocalePrefix = (pathname: string) => {
  const path = normalizePath(pathname);
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) return path.replace("/en", "");
  return path;
};

export const getLocalizedPath = (
  pathname: string,
  targetLocale: SiteLocale,
): string => {
  const sourceLocale = getLocaleFromPathname(pathname);
  const strippedPath = stripLocalePrefix(pathname);

  const segments = strippedPath.split("/").filter(Boolean);

  if (segments.length > 0) {
    const mapper =
      sourceLocale === "sv" && targetLocale === "en"
        ? SV_TO_EN_SEGMENT
        : sourceLocale === "en" && targetLocale === "sv"
          ? EN_TO_SV_SEGMENT
          : undefined;

    if (mapper) {
      for (let i = 0; i < segments.length; i += 1) {
        segments[i] = mapper[segments[i]] ?? segments[i];
      }
    }
  }

  const pathWithoutLocale = `/${segments.join("/")}`.replace(/\/+/g, "/");
  const normalizedWithoutLocale =
    pathWithoutLocale === "//" || pathWithoutLocale === "" ? "/" : pathWithoutLocale;

  if (targetLocale === "en") {
    return normalizedWithoutLocale === "/"
      ? "/en"
      : `/en${normalizedWithoutLocale}`;
  }

  return normalizedWithoutLocale;
};

export const getOtherLocale = (locale: SiteLocale): SiteLocale =>
  locale === "sv" ? "en" : "sv";

export const getMainNavLinks = (locale: SiteLocale): readonly NavLink[] =>
  locale === "en" ? NAV_LINKS_EN : NAV_LINKS;

export const getReviewNavLinks = (locale: SiteLocale): readonly NavLink[] =>
  locale === "en" ? REVIEW_NAV_LINKS_EN : REVIEW_NAV_LINKS;
