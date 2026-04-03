export const SITE_TITLE = "Fredrik Etsare";
export const SITE_DESCRIPTION = "Systemutvecklare och gillar att bygga hemsidor, spela piano och dricka öl på fritiden.";

export const NAV_LINKS = [
	{ href: "/", label: "Blog" },
	{ href: "/projekt", label: "Projekt" },
	{ href: "/mig", label: "Mig" },
	{ href: "/recensioner", label: "Ratings" },
] as const;

export const REVIEW_NAV_LINKS = [
	{ href: "/recensioner/ol", label: "Öl" },
	{ href: "/recensioner/kyrkor", label: "Kyrkor" },
	{ href: "/recensioner/bocker", label: "Böcker" },
] as const;
