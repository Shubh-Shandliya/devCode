type SectionHeaderProps = {
  title: string
  subtitle: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}
