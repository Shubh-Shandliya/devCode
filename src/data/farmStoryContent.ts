export type FarmScene = {
  id: string
  chapter: string
  layoutType: 'vertical' | 'timeline'
  title: string
  caption: string
  imageAlt: string
  image: string
  headlineParts?: string[]
}

export const farmHero = {
  eyebrow: 'Featured Work Project',
  title: 'Rooted in soil. Driven by life.',
  subtitle:
    'A cinematic digital film about farming, animals, harvest, and the quiet beauty of rural living.',
  meta: {
    role: 'Creative Developer + Storytelling Designer',
    tools: 'React, Framer Motion, Three.js, Tailwind, TypeScript',
    challenge: 'Turn everyday farm moments into an emotionally rich scroll narrative.',
    goal: 'Create a premium portfolio case study with immersive storytelling.',
  },
}

export const farmScenes: FarmScene[] = [
  {
    id: 'life-on-farm',
    chapter: '02',
    layoutType: 'vertical',
    title: 'Life on Farm',
    caption: 'Mornings begin with light over fields, soil breathing under every step.',
    imageAlt: 'Wide landscape of farm fields at sunrise',
    image:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=80',
    headlineParts: ['Life', 'On', 'Farm'],
  },
  {
    id: 'animals',
    chapter: '03',
    layoutType: 'vertical',
    title: 'Animals',
    caption: 'Feeding the life that feeds us. Care, rhythm, and trust every day.',
    imageAlt: 'Cows resting in a rural farm shelter',
    image:
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1800&q=80',
    headlineParts: ['Care', 'Trust', 'Rhythm'],
  },
  {
    id: 'harvesting',
    chapter: '04',
    layoutType: 'vertical',
    title: 'Harvesting Process',
    caption: 'Grass cut. Crops gathered. Every season leaves a mark on our hands.',
    imageAlt: 'Farmer harvesting crops in the field',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=80',
    headlineParts: ['Harvest', 'Labor', 'Season'],
  },
  {
    id: 'machinery',
    chapter: '05',
    layoutType: 'vertical',
    title: 'Machinery',
    caption: 'The tractor moves like a heartbeat through the land, steady and strong.',
    imageAlt: 'Tractor moving through crop rows',
    image:
      'https://images.unsplash.com/photo-1592982537447-6f2a6a0f0f83?auto=format&fit=crop&w=1800&q=80',
    headlineParts: ['Iron', 'Power', 'Motion'],
  },
  {
    id: 'gardening',
    chapter: '06',
    layoutType: 'vertical',
    title: 'Gardening at Home',
    caption: 'Flowers, fruits, and vegetables turn home into a living garden.',
    imageAlt: 'Small home garden with vegetables and flowers',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1800&q=80',
    headlineParts: ['Home', 'Garden', 'Bloom'],
  },
]

export const milkProcessSteps = [
  {
    title: 'Morning Milking',
    text: 'Fresh milk is collected gently, with animal comfort as the first priority.',
  },
  {
    title: 'Cooling and Filtering',
    text: 'Milk is filtered and cooled quickly to preserve quality and freshness.',
  },
  {
    title: 'Home Kitchen Use',
    text: 'From tea to curd and ghee, every drop becomes part of daily family life.',
  },
]

export const farmClosing = {
  chapter: '08',
  title: 'The Day Ends, The Story Continues',
  text: 'From sunrise labor to evening calm, farming is not only work. It is memory, care, and legacy.',
}

export const tractorRailCards = [
  {
    title: 'Field Start',
    caption: 'The first engine sound opens the day.',
    image:
      'https://images.unsplash.com/photo-1530267981375-fb31e63fc8b6?auto=format&fit=crop&w=1800&q=80',
  },
  {
    title: 'Grass Run',
    caption: 'Clean rows and measured movement across the land.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1800&q=80',
  },
  {
    title: 'Tool Rhythm',
    caption: 'Machine and human rhythm working in sync.',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=80',
  },
  {
    title: 'End Of Shift',
    caption: 'Dust settles while the day closes with purpose.',
    image:
      'https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&w=1800&q=80',
  },
]
