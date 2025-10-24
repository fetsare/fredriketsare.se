import _projects from "./projects.json";
import _techIcons from "./techIcons.json";
import _socialLinks from "./socialLinks.json";
import { Github, Linkedin, Mail, FileUser } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  image?: string;
  video?: string;
  link?: string;
  source?: string;
  tags?: string[];
}

export interface TechIcon {
  className: string;
  alt: string;
  href: string;
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

const _typedProjects = _projects as Project[];

if (_typedProjects.some((project) => project.image && project.video)) {
  process.exit(1); //project cant have image and video at same time
}

export const projects = _typedProjects;
export const techIcons = _techIcons as TechIcon[];

// Map icon names to actual lucide-react components
const iconMap = {
  Github,
  Linkedin,
  Mail,
  FileUser,
};

export const socialLinks = _socialLinks.map((link) => ({
  ...link,
  icon: iconMap[link.icon as keyof typeof iconMap],
}));
