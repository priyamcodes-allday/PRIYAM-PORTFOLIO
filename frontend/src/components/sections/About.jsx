import Container from "../common/Container";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-8 pb-16 pt-16 md:pb-32 md:pt-32 lg:pb-40 lg:pt-44"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_2fr] lg:gap-16">
          <h2
            id="about-title"
            className="text-lg font-semibold text-white/90 lg:pl-10 lg:pt-1 xl:pl-14"
          >
            About Me
          </h2>
          <div className="min-w-0">
            <p className="max-w-[850px] text-xl leading-[1.35] font-normal text-white/90 sm:text-2xl lg:text-3xl">
              I'm Priyam Deb, a full-stack developer focused on building clean,
              practical and scalable web applications. I work primarily with
              React, Node.js, Express and MongoDB, combining responsive frontend
              experiences with reliable backend architecture.
            </p>
            <dl className="grid gap-10 text-center sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:mt-20"></dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
