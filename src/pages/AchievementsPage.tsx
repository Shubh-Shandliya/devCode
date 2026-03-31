import { SectionHeader } from '../components/SectionHeader'
import { achievements, leadershipHighlights } from '../data/portfolioContent'

export function AchievementsPage() {
  return (
    <section className="section-card">
      <SectionHeader
        title="Achievements"
        subtitle="Measured outcomes from frontend execution, UX craft, and performance focus."
      />
      <div className="grid four-col">
        {achievements.map((achievement) => (
          <article key={achievement.label} className="metric-card">
            <p className="metric-value">{achievement.value}</p>
            <p>{achievement.label}</p>
          </article>
        ))}
      </div>
      <section className="leadership-block">
        <h3>Leadership Impact</h3>
        <ul className="leadership-list">
          {leadershipHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </section>
  )
}
