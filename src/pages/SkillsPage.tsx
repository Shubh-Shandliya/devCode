import { SectionHeader } from '../components/SectionHeader'
import { skillGroups } from '../data/portfolioContent'

export function SkillsPage() {
  return (
    <section className="section-card">
      <SectionHeader
        title="Skills"
        subtitle="Focused tech stack for fast, clean, and scalable frontend delivery."
      />
      <div className="grid two-col">
        {skillGroups.map((group) => (
          <article key={group.title} className="info-card">
            <h3 style={{marginBottom: '1rem'}}>{group.title}</h3>
            <ul className="chip-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
