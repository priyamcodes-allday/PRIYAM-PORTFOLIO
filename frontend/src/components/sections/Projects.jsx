import ProjectCard from "./ProjectCard";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-8 bg-[#F1F0E9] py-16 text-[#171A1B] md:py-24 lg:py-28 xl:py-32"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8 xl:max-w-[1260px]">
        <h2
          id="projects-title"
          className="font-['Oswald'] text-4xl font-bold uppercase tracking-tight lg:text-5xl"
        >
          PROJECTS
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
