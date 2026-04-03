import { Link } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/portfolioContent'

const sectionCard =
  'animate-rise-in card-surface-rich rounded-[1.4rem] border border-border p-9 max-[900px]:p-6'

const btnGhost =
  'btn-slide-fill group mt-4 inline-flex items-center rounded-xl border border-border bg-surface-glass px-4 py-2.5 font-semibold text-foreground no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-hover'

function FeaturedProjectCard({
  category,
  name,
  context,
  problem,
  solution,
  impact,
  technologies,
  internalLink,
  link,
}: (typeof projects)[number]) {
  return (
    <ProjectCard>
      <p className="mb-2 inline-block rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-2.5 py-0.5 text-xs font-semibold text-accent">
        Featured Case Study • {category}
      </p>
      <h3 className="mb-2">{name}</h3>
      <p className="mb-2">
        <strong>Context:</strong> {context}
      </p>
      <p className="mb-2">
        <strong>Problem:</strong> {problem}
      </p>
      <p className="mb-2">
        <strong>Solution:</strong> {solution}
      </p>
      <p className="mb-2 text-foreground">
        <strong>Impact:</strong> {impact}
      </p>
      <p className="mb-2 text-foreground">
        <strong>Tech:</strong> {technologies}
      </p>
      {internalLink ? (
        <Link className={btnGhost} to={internalLink}>
          <span>Open Cinematic Experience</span>
          <span
            aria-hidden="true"
            className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </Link>
      ) : null}
      {link ? (
        <a className={btnGhost} href={link} target="_blank" rel="noreferrer">
          <span>Read Case Study</span>
          <span
            aria-hidden="true"
            className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </a>
      ) : null}
    </ProjectCard>
  )
}

export function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured)
  const remainingProjects = projects.filter((project) => !project.featured)

  return (
    <section className={sectionCard}>
      <SectionHeader
        title="Case Study Previews"
        subtitle="Problem -> solution -> measurable impact across modern web product builds."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {['SaaS', 'AI', 'Web App', 'E-commerce', 'Crypto'].map((cat) => (
          <span key={cat} className="rounded-full border border-border bg-surface-hover px-3 py-1 text-sm">
            {cat}
          </span>
        ))}
      </div>
      {featuredProjects.length > 0 ? (
        <div className="mb-4 flex flex-col gap-4">
          {featuredProjects.map((project) => (
            <div key={project.name}>
              <FeaturedProjectCard {...project} />
            </div>
          ))}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 min-[901px]:grid-cols-2">
        {remainingProjects.map((project) => (
          <ProjectCard key={project.name}>
            <p className="mb-2 inline-block rounded-full border border-border bg-surface-hover px-2.5 py-0.5 text-xs font-semibold text-accent">
              {project.category}
            </p>
            <h3 className="mb-2">{project.name}</h3>
            <p className="mb-2"><strong>Context:</strong> {project.context}</p>
            <p className="mb-2"><strong>Problem:</strong> {project.problem}</p>
            <p className="mb-2"><strong>Solution:</strong> {project.solution}</p>
            <p className="mb-2 text-foreground">
              <strong>Tech:</strong> {project.technologies}
            </p>
            <p className="mb-2 text-foreground">
              <strong>Impact:</strong> {project.impact}
            </p>
            {project.internalLink ? (
              <Link className={btnGhost} to={project.internalLink}>
                <span>Open Cinematic Experience</span>
                <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            ) : null}
            {project.link ? (
              <a className={btnGhost} href={project.link} target="_blank" rel="noreferrer">
                <span>Read Case Study</span>
                <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            ) : null}
          </ProjectCard>
        ))}
      </div>
    </section>
  )
}
