import type { ReactNode } from 'react'

type SectionShellProps = {
  className: string
  eyebrowClassName: string
  eyebrow: string
  children: ReactNode
}

type SectionGridProps = {
  children: ReactNode
  className?: string
}

export function SectionShell({
  className,
  eyebrowClassName,
  eyebrow,
  children,
}: SectionShellProps) {
  return (
    <div className={className}>
      <p className={eyebrowClassName}>{eyebrow}</p>
      {children}
    </div>
  )
}

export function SectionGrid({ children, className = '' }: SectionGridProps) {
  return (
    <div className={`section-grid-three ${className}`.trim()}>
      {children}
    </div>
  )
}
