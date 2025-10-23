import ProjectCard from "@/components/ProjectCard";
import { type Project, techIcons } from "@/content/projects";
import projects from "@/content/projects";
import LogoLoop from "@/components/LogoLoop";

export default function Projects() {
  const logoItems = techIcons.map((icon) => ({
    node: <i className={`${icon.className} colored text-5xl text-gray-800`} />,
    href: icon.href,
    title: icon.alt,
    ariaLabel: icon.alt,
  }));

  return (
    <section id="projects">
      <LogoLoop logos={logoItems} fadeOut pauseOnHover scaleOnHover />
      <div className="w-full columns-1 md:columns-2 gap-4 space-y-4 mt-8">
        {projects.map((project: Project, index: number) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
            video={project.video}
            source={project.source}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}
