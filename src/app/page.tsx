import FadeInSection from "@/components/FadeInSection";
import DontPressMe from "@/components/DontPressMe";

export default function Home() {
  return (
    <div>
      <FadeInSection direction="right" delay={100}>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Web Developer from Stockholm, Sweden who enjoys creating cool stuff
          that is not nececsarily useful. Currently prusuing a degree in
          Computer and System sciences at the{" "}
          <a className="text-blue-400 hover:underline" href="">
            Department of Computer- and System Sciences
          </a>
          . Some technology i work with are React, Typescript, Golang,
          Tailwindcss, Nextjs, Java, .NET.
        </p>
      </FadeInSection>
      <DontPressMe />
    </div>
  );
}
