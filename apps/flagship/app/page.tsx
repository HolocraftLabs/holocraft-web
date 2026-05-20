const capabilities = [
  {
    label: "AI product systems",
    copy: "Applied AI interfaces, prompt workflows, and production-ready user journeys for teams that need more than a demo.",
  },
  {
    label: "Cinematic frontend",
    copy: "High-fidelity web experiences with precise interaction, motion direction, responsive systems, and strong brand memory.",
  },
  {
    label: "Automation infrastructure",
    copy: "Operational workflows that connect research, delivery, client intake, internal review, and repeatable execution.",
  },
];

const process = [
  "Research the operational problem",
  "Design the system and interaction model",
  "Prototype the experience under real constraints",
  "Ship, measure, and extract reusable infrastructure",
];

const signals = [
  ["Studio mode", "AI-native creative engineering"],
  ["Primary stack", "Next.js, TypeScript, Tailwind, automation"],
  ["Operating bias", "Clarity, maintainability, speed"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060606] text-white">
      <section className="relative min-h-screen px-6 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(48,145,255,0.22),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,#060606_0%,#111111_45%,#061016_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:84px_84px] opacity-35" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#060606] to-transparent" />
        </div>

        <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 pb-5 text-sm text-white/70">
          <a className="font-semibold tracking-[0.28em] text-white" href="#">
            HOLOCRAFT
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            <a className="transition hover:text-white" href="#systems">
              Systems
            </a>
            <a className="transition hover:text-white" href="#process">
              Process
            </a>
            <a className="transition hover:text-white" href="#brief">
              Brief
            </a>
          </nav>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 pt-24 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-36">
          <div>
            <p className="mb-6 max-w-xl text-sm font-medium uppercase tracking-[0.32em] text-cyan-200/80">
              AI-native creative engineering studio
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Advanced digital systems with cinematic precision.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              Holocraft designs and builds AI-assisted products, immersive
              frontends, and automation infrastructure for teams that need
              technical depth and a distinct digital identity.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center border border-white bg-white px-6 text-sm font-semibold text-black transition hover:bg-cyan-100"
                href="#brief"
              >
                Start a project brief
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center border border-white/18 px-6 text-sm font-semibold text-white transition hover:border-white/45"
                href="#systems"
              >
                Explore capabilities
              </a>
            </div>
          </div>

          <aside className="border border-white/12 bg-white/[0.035] p-5 backdrop-blur">
            <div className="grid gap-3">
              {signals.map(([label, value]) => (
                <div
                  className="border border-white/10 bg-black/30 p-4"
                  key={label}
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    {label}
                  </p>
                  <p className="mt-2 text-base font-medium text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        className="border-y border-white/10 bg-[#0b0d0f] px-6 py-20 sm:px-8 lg:px-12"
        id="systems"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/70">
              Systems
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Built for work that needs product thinking, software discipline,
              and memorable experience design.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <article className="bg-[#0b0d0f] p-7" key={capability.label}>
                <h3 className="text-xl font-semibold">{capability.label}</h3>
                <p className="mt-4 leading-7 text-white/62">
                  {capability.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12" id="process">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/70">
              Process
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              A studio workflow designed to turn ambiguity into shipped systems.
            </h2>
          </div>

          <div className="grid gap-4">
            {process.map((step, index) => (
              <div
                className="grid gap-5 border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[4rem_1fr] sm:items-center"
                key={step}
              >
                <span className="font-mono text-sm text-cyan-200/75">
                  0{index + 1}
                </span>
                <p className="text-xl font-medium text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-white/10 bg-white text-black px-6 py-20 sm:px-8 lg:px-12"
        id="brief"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
              Project brief
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Start with the problem, the system, and the outcome worth shipping.
            </h2>
          </div>
          <div className="border border-black/12 p-6">
            <p className="leading-7 text-black/68">
              Holocraft is being shaped around focused, high-leverage builds:
              AI-assisted products, premium web platforms, automation systems,
              and immersive interaction prototypes.
            </p>
            <a
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
              href="mailto:studio@holocraft.dev?subject=Holocraft%20project%20brief"
            >
              Send project brief
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
