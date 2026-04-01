import { SectionHeader } from '../components/SectionHeader'
import { aboutContent, hobbies } from '../data/portfolioContent'

const sectionCard =
  'animate-rise-in card-surface-rich rounded-[1.4rem] border border-border p-9 max-[900px]:p-6'

const chipLi =
  'rounded-full border border-border bg-surface-hover px-4 py-[0.65rem] text-sm max-[900px]:rounded-[0.55rem]'

export function AboutPage() {
  return (
    <section className={sectionCard}>
      <SectionHeader
        title="About"
        subtitle="Product-minded frontend execution with clear communication and measurable outcomes."
      />
      <div className="grid gap-[0.85rem]">
        {aboutContent.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 min-[901px]:grid-cols-3">
        <article className="card-inset-rich rounded-xl border border-border p-4">
          <p className="text-sm font-semibold text-accent">Now</p>
          <p className="mt-2">Building high-conversion web app interfaces for product and service teams.</p>
        </article>
        <article className="card-inset-rich rounded-xl border border-border p-4">
          <p className="text-sm font-semibold text-accent">Before</p>
          <p className="mt-2">Scaled from UI implementation to architecture decisions and team guidance.</p>
        </article>
        <article className="card-inset-rich rounded-xl border border-border p-4">
          <p className="text-sm font-semibold text-accent">Next</p>
          <p className="mt-2">Leading bigger product systems with stronger frontend business impact.</p>
        </article>
      </div>
      <div className="mt-6">
        <h3 className="mb-3">Beyond Work</h3>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {hobbies.map((hobby) => (
            <li key={hobby} className={chipLi}>
              {hobby}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
