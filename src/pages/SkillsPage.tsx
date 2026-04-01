import { lazy, Suspense } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { ProjectCard } from '../components/ProjectCard'
import { usePageVisible } from '../hooks/usePageVisible'
import { useReducedMotionThree } from '../hooks/useReducedMotionThree'
import { skillGroups } from '../data/portfolioContent'

const SectionAccent = lazy(() =>
  import('../components/three/SectionAccent').then((mod) => ({ default: mod.SectionAccent })),
)

const sectionCard =
  'animate-rise-in card-surface-rich rounded-[1.4rem] border border-border p-9 max-[900px]:p-6'

const chipLi =
  'rounded-full border border-border bg-surface-hover px-4 py-[0.65rem] text-sm max-[900px]:rounded-[0.55rem]'

export function SkillsPage() {
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
        title="Capabilities"
        subtitle="What I reliably deliver for product teams, startups, and client projects."
      />
      <div className="relative z-10 grid grid-cols-1 gap-4 min-[901px]:grid-cols-2">
        {skillGroups.map((group) => (
          <ProjectCard key={group.title}>
            <h3 className="mb-4">{group.title}</h3>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li key={item} className={chipLi}>
                  {item}
                </li>
              ))}
            </ul>
          </ProjectCard>
        ))}
      </div>
    </section>
  )
}
