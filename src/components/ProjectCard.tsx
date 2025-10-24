import type { Project } from "@/content/meta";
import Image from "next/image";
import { CodeIcon, ExternalLinkIcon } from "lucide-react";

export default function ProjectCard(project: Project) {
  const { title, description, image, video, link, source, tags } = project;
  return (
    <div className="flex flex-col break-inside-avoid items-center shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="relative w-full h-64 group bg-gray-100 dark:bg-gray-800">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : null}

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-110 transition-all text-white shadow-md"
              title="View Demo"
            >
              <ExternalLinkIcon size={24} />
            </a>
          )}

          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-900 hover:scale-110 transition-all text-white shadow-md"
              title="View Code"
            >
              <CodeIcon size={24} />
            </a>
          )}
        </div>
      </div>

      <div className="p-5 w-full">
        <h2 className="text-2xl font-bold text-left w-full mb-2">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
