import { SectionHeader } from '../components/SectionHeader'
import { projects } from '../data/portfolioContent'

export function ProjectsPage() {
  return (
    <section className="section-card">
      <SectionHeader
        title="Projects"
        subtitle="Selected work built with React and AI-accelerated delivery workflows."
      />
      <div className="grid two-col">
        {projects.map((project) => (
          <article key={project.name} className="info-card">
            <h3 style={{marginBottom: '0.5rem'}}>{project.name}</h3>
            <p style={{marginBottom: '0.5rem'}}>{project.description}</p>
            <p style={{color: 'var(--text-strong)' , marginBottom: '0.5rem'}}>
              <strong>Tech:</strong> {project.technologies}
            </p>
            <p style={{color: 'var(--text-strong)' , marginBottom: '0.5rem'}}>
              <strong>Impact:</strong> {project.achievement}
            </p>
            {project.link ? (
              <a
                className="button button-ghost project-link-button"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit Project
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
