import ProjectCard from "@/components/ProjectCard";
import type { Metadata } from "next";
import { type Project, techIcons, projects } from "@/content/meta";
import LogoLoop from "@/components/LogoLoop";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Fredrik Etsare.",
  alternates: { canonical: "/projects" },
  robots: { index: true, follow: true },
};

export default function Projects() {
  const logoItems = techIcons.map((icon) => ({
    node: <i className={`${icon.className} colored text-5xl text-gray-800`} />,
    href: icon.href,
    title: icon.alt,
    ariaLabel: icon.alt,
  }));

  return (
    <div>
      <LogoLoop
        logos={logoItems}
        fadeOut
        pauseOnHover
        scaleOnHover
        speed={30}
      />
      <div className="w-full columns-1 md:columns-2 gap-4 space-y-4 mt-8">
        {projects.map((project: Project, index: number) => (
          <FadeInSection key={index} direction="up" duration={1000}>
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
              video={project.video}
              source={project.source}
              tags={project.tags}
            />
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}
