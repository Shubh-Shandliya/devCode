import { SectionHeader } from '../components/SectionHeader'
import { aboutContent, hobbies } from '../data/portfolioContent'

export function AboutPage() {
  return (
    <section className="section-card">
      <SectionHeader
        title="About Me"
        subtitle="Professional mindset with a friendly, collaborative approach."
      />
      <div className="content-stack">
        {aboutContent.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="hobbies-block">
        <h3>Hobbies</h3>
        <ul className="chip-list">
          {hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
