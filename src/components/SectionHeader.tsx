type SectionHeaderProps = {
  title: string
  subtitle: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="mb-3">{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}
