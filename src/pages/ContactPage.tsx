import { lazy, Suspense } from 'react'
import { AnimatedStat } from '../components/AnimatedStat'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'
import { usePageVisible } from '../hooks/usePageVisible'
import { useReducedMotionThree } from '../hooks/useReducedMotionThree'
import { contactLinks } from '../data/portfolioContent'

const SectionAccent = lazy(() =>
  import('../components/three/SectionAccent').then((mod) => ({ default: mod.SectionAccent })),
)

const sectionCard =
  'animate-rise-in card-surface-rich rounded-[1.4rem] border border-border p-9 max-[900px]:p-6'

const contactBtn =
  'btn-slide-fill inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface-glass px-3.5 py-2.5 font-semibold text-foreground no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_60%,var(--border-color))] hover:shadow-soft-glow'

const contactIcon = 'size-4 shrink-0 text-accent'

export function ContactPage() {
  const reduceMotion = useReducedMotionThree()
  const isPageVisible = usePageVisible()

  return (
    <section className={`${sectionCard} relative isolate overflow-hidden`}>
      {!reduceMotion && isPageVisible ? (
        <Suspense fallback={null}>
          <SectionAccent />
        </Suspense>
      ) : null}
      <SectionHeader
        title="Contact"
        subtitle="Hiring, freelance build, or redesign request — send the goal and timeline."
      />
      <div className="relative z-10 grid grid-cols-1 gap-4 min-[901px]:grid-cols-[1.2fr_0.8fr]">
        <ProjectCard>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-surface-hover px-3 py-1 text-sm">Frontend Role</span>
            <span className="rounded-full border border-border bg-surface-hover px-3 py-1 text-sm">Freelance Build</span>
            <span className="rounded-full border border-border bg-surface-hover px-3 py-1 text-sm">UI/UX Redesign</span>
          </div>
          <p className="mb-3 inline-block rounded-full border border-[color-mix(in_srgb,var(--accent)_55%,var(--border-color))] px-[0.65rem] py-0.5 text-sm text-accent">
            Tell me your goal. I will send a clear execution plan in under 24 hours.
          </p>
          <p>
            If you are hiring, scaling a product, or launching a new frontend experience, I can help with
            premium UI execution, strong frontend architecture, and reliable delivery.
          </p>
          <ul className="mt-4 m-0 grid list-none gap-3 p-0">
            {/* <li className="flex flex-wrap items-center gap-3">
              <a className={contactBtn} href={contactLinks.calendly} target="_blank" rel="noreferrer">
                <span>Book Intro Call</span>
              </a>
            </li> */}
            <li className="flex flex-wrap items-center gap-3">
              <a className={contactBtn} href={`mailto:${contactLinks.email}`}>
                <svg className={contactIcon} viewBox="0 0 24 24" role="img" aria-label="Email">
                  <path
                    d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2v.5l8 5.2 8-5.2V8l-8 5.2L4 8Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Email</span>
              </a>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <a
                className={contactBtn}
                href={contactLinks.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <svg className={contactIcon} viewBox="0 0 24 24" role="img" aria-label="LinkedIn">
                  <path
                    d="M6.2 8.2a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2ZM4.8 9.8h2.9V19H4.8V9.8Zm4.7 0h2.8v1.3h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.6 2 3.6 4.6V19H16V15c0-1-.1-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H9.5V9.8Z"
                    fill="currentColor"
                  />
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <a
                className={contactBtn}
                href={`https://wa.me/${contactLinks.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg className={contactIcon} viewBox="0 0 24 24" role="img" aria-label="WhatsApp">
                  <path
                    d="M12 3.5a8.5 8.5 0 0 0-7.34 12.76L3 21l4.9-1.62A8.5 8.5 0 1 0 12 3.5Zm0 15.48a6.93 6.93 0 0 1-3.55-.98l-.25-.14-2.9.96.97-2.82-.16-.29a6.95 6.95 0 1 1 5.89 3.27Zm3.81-5.2c-.2-.1-1.2-.59-1.39-.65-.19-.07-.33-.1-.47.1-.14.2-.54.65-.66.79-.12.14-.24.16-.44.06-.2-.1-.86-.32-1.64-1.02-.61-.54-1.02-1.2-1.14-1.4-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.36.1-.12.13-.2.2-.34.06-.14.03-.26-.02-.36-.05-.1-.47-1.13-.65-1.55-.17-.41-.35-.35-.47-.36h-.4c-.14 0-.36.05-.55.25-.19.2-.72.7-.72 1.7s.74 1.97.84 2.1c.1.14 1.45 2.2 3.5 3.09.49.21.87.33 1.17.43.49.15.94.13 1.3.08.4-.06 1.2-.49 1.38-.96.17-.48.17-.89.12-.97-.05-.08-.18-.13-.38-.24Z"
                    fill="currentColor"
                  />
                </svg>
                <span>WhatsApp</span>
              </a>
            </li>
          </ul>
        </ProjectCard>

        <ProjectCard>
          <h3 className="mb-3">Engagement Snapshot</h3>
          <ul className="mb-4 grid list-disc gap-2 pl-[1.1rem]">
            <li>Availability: Open for selected frontend roles and freelance builds</li>
            <li>Project minimum: 2-week scoped sprint engagements</li>
            <li>Delivery style: Milestone-based execution with weekly updates</li>
          </ul>
          <div className="grid grid-cols-2 gap-3">
            <article className="card-inset-rich rounded-xl border border-border p-3">
              <p className="mb-1 font-bold text-foreground">
                <AnimatedStat value="<24h" />
              </p>
              <p>Typical response time</p>
            </article>
            <article className="card-inset-rich rounded-xl border border-border p-3">
              <p className="mb-1 font-bold text-foreground">
                <AnimatedStat value="200+" />
              </p>
              <p>Project deliveries</p>
            </article>
          </div>
        </ProjectCard>
      </div>
    </section>
  )
}
