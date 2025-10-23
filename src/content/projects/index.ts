import _projects from "./projects.json";

export interface Project {
  title: string;
  description: string;
  image?: string;
  video?: string;
  link?: string;
  source?: string;
  tags?: string[];
}

const projects = _projects as Project[];

if (projects.some((project) => project.image && project.video)) {
  process.exit(1); //project cant have image and video at same time
}

export default projects;

export interface TechIcon {
  className: string;
  alt: string;
  href: string;
}

export const techIcons: TechIcon[] = [
  {
    className: "devicon-javascript-plain",
    alt: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    className: "devicon-typescript-plain",
    alt: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  {
    className: "devicon-react-original",
    alt: "React",
    href: "https://react.dev/",
  },
  {
    className: "devicon-nodejs-plain",
    alt: "Node.js",
    href: "https://nodejs.org/",
  },
  {
    className: "devicon-java-plain",
    alt: "Java",
    href: "https://www.java.com/",
  },
  {
    className: "devicon-git-plain",
    alt: "Git",
    href: "https://git-scm.com/",
  },
  {
    className: "devicon-docker-plain",
    alt: "Docker",
    href: "https://www.docker.com/",
  },
  {
    className: "devicon-spring-plain",
    alt: "Spring Framework",
    href: "https://spring.io/",
  },
  {
    className: "devicon-tailwindcss-plain",
    alt: "Tailwind CSS",
    href: "https://tailwindcss.com/",
  },
  {
    className: "devicon-html5-plain",
    alt: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    className: "devicon-css3-plain",
    alt: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    className: "devicon-amazonwebservices-plain",
    alt: "Amazon Web Services",
    href: "https://aws.amazon.com/",
  },
  {
    className: "devicon-github-plain",
    alt: "GitHub",
    href: "https://github.com/",
  },
];

export const imageLogos = [
  {
    src: "",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "",
    alt: "Company 3",
    href: "https://company3.com",
  },
];
