import { AnimatedStat } from '../components/AnimatedStat'
import { SectionHeader } from '../components/SectionHeader'
import { achievements, leadershipHighlights } from '../data/portfolioContent'

const sectionCard =
  'animate-rise-in card-surface-rich rounded-[1.4rem] border border-border p-9 max-[900px]:p-6'

const metricCard =
  'card-inset-rich rounded-2xl border border-border p-4 transition-all duration-200 hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--accent)_60%,var(--border-color))]'

export function AchievementsPage() {
  return (
    <section className={sectionCard}>
      <SectionHeader
        title="Proof Wall"
        subtitle="Evidence-backed outcomes from real project execution and delivery leadership."
      />
      <div className="grid grid-cols-1 gap-4 min-[901px]:grid-cols-4">
        {achievements.map((achievement) => (
          <article key={achievement.label} className={metricCard}>
            <p className="mb-2 text-3xl font-bold text-foreground">
              <AnimatedStat value={achievement.value} />
            </p>
            <p>{achievement.label}</p>
          </article>
        ))}
      </div>
      <section className="card-inset-rich mt-5 rounded-2xl border border-border p-4">
        <h3 className="mb-3">Leadership Impact</h3>
        <ul className="m-0 grid list-disc gap-2.5 pl-[1.1rem]">
          {leadershipHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </section>
  )
}
