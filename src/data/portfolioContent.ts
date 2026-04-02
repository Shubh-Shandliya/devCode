export type SkillGroup = {
  title: string
  items: string[]
}

export type Project = {
  name: string
  context: string
  problem: string
  solution: string
  impact: string
  technologies: string
  link?: string
  internalLink?: string
  category: 'SaaS' | 'AI' | 'Web App' | 'E-commerce' | 'Crypto'
  featured?: boolean
}

export const heroContent = {
  name: 'Shubham Sharma',
  role: 'Product-Focused Frontend Engineer',
  intro:
    'I build frontend experiences that increase conversion, retention, and product trust for modern web apps.',
  aiLine:
    'Using React, Next.js, and AI-assisted execution, I help teams ship premium interfaces faster without sacrificing performance or maintainability.',
  tagline: 'Built for recruiters who hire outcomes and clients who pay for business impact.',
}

export const domainHighlights = [
  'SaaS Product UI',
  'AI Web Apps',
  'E-commerce Experiences',
  'Growth Landing Pages',
  'Complex Dashboard Systems',
]

export const landingHighlights = [
  {
    title: 'Outcome-Driven Product UI',
    description:
      'Every interface is designed to support measurable outcomes like conversion, activation, and user trust.',
  },
  {
    title: 'Fast Delivery with Production Standards',
    description:
      'I move quickly with AI-assisted workflows while keeping clean architecture and long-term maintainability.',
  },
  {
    title: 'Premium UX + Performance by Default',
    description:
      'Smooth interactions, responsive layouts, and optimization are engineered in from day one.',
  },
]

export const collaborationFlow = [
  {
    step: '01',
    title: 'Discovery and Goal Mapping',
    description:
      'We align on product goals, user pain points, and measurable success metrics before coding starts.',
  },
  {
    step: '02',
    title: 'Design to Production Execution',
    description:
      'I ship polished interfaces with reusable architecture, premium motion, and consistent UI language.',
  },
  {
    step: '03',
    title: 'Optimization and Scale',
    description:
      'After release, I optimize performance, tighten UX details, and prepare the system for future growth.',
  },
]

export const trustMetrics = [
  { value: '200+', label: 'Projects shipped across product and service teams' },
  { value: '<24h', label: 'Typical response time for hiring and project inquiries' },
  { value: '45%', label: 'Faster delivery enabled by AI-assisted development workflows' },
]

export const aboutContent = [
  'I started by translating static designs into clean, responsive interfaces. Today, I lead end-to-end frontend execution for web apps where UI quality and business outcomes matter equally.',
  'My work combines product thinking, scalable architecture, and modern interaction design to help teams launch faster without creating future technical debt.',
  'I also mentor developers and shape frontend systems so teams can ship consistently with high quality across fast-moving product cycles.',
  'From monorepo architecture decisions to final UI polish, I focus on predictable delivery, clear communication, and measurable impact.',
  'I actively use AI to accelerate research, implementation, and debugging, which gives teams speed while preserving engineering standards.',
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Product UI Engineering',
    items: [
      'React, Next.js, TypeScript architecture',
      'Design system implementation and scalable component libraries',
      'Complex state and data-driven interface engineering',
    ],
  },
  {
    title: 'Performance and Quality',
    items: [
      'Performance optimization, rendering strategy, and Lighthouse improvements',
      'Accessibility-first implementation with production-ready QA mindset',
      'Maintainable code standards and team-friendly architecture',
    ],
  },
  {
    title: 'AI-Accelerated Delivery',
    items: [
      'AI-supported prototyping and faster implementation cycles',
      'Rapid debugging, code refinement, and edge-case validation',
      'Faster iteration loops while maintaining delivery quality',
    ]
  },
  {
    title: 'Collaboration and Delivery',
    items: [
      'Clear async updates and stakeholder communication',
      'Scoping features to hit deadlines without quality loss',
      'Reliable execution across product, service, and startup teams',
    ]
  },
]

export const projects: Project[] = [
  {
    name: 'Rural Farming Story - Cinematic Case Study',
    context:
      'Immersive storytelling experience built as a premium portfolio feature around real farming and rural life.',
    problem:
      'Most project pages feel static and fail to emotionally communicate lived experiences and daily rituals.',
    solution:
      'Created a scroll-based narrative with cinematic transitions, subtle Three.js atmosphere, and motion-driven chapters.',
    impact:
      'Transforms a personal real-world story into a memorable, high-end digital case study for portfolio differentiation.',
    technologies: 'React, TypeScript, Tailwind CSS, Framer Motion, Three.js',
    category: 'Web App',
    internalLink: '/projects/farm-story',
    featured: true,
  },
  {
    name: 'GEMS Trade',
    context: 'Crypto trading product dashboard for active market users.',
    problem:
      'Users needed fast market comprehension, but the interface overloaded them with dense data blocks.',
    solution:
      'I redesigned dashboard hierarchy, optimized chart rendering, and introduced clearer visual storytelling.',
    impact:
      'Reduced data reading time by 35% while keeping interactions smooth under heavy market updates.',
    technologies: 'React JS, Recharts, SCSS, Ant Design',
    category: 'Web App',
    link: 'https://www.gems.trade/',
    featured: true,
  },
  {
    name: 'Instanode',
    context: 'Landing + product onboarding experience for infrastructure deployment.',
    problem:
      'The team needed faster launch velocity for multiple pages while preserving premium UX quality.',
    solution:
      'Built modular UI blocks with Framer Motion and Tailwind, then accelerated iteration through AI-assisted workflows.',
    impact:
      'Shipped core modules 40% faster with consistent visual quality and cleaner handoff for future updates.',
    technologies: 'Vite, React JS, Framer Motion, Tailwind CSS',
    category: 'SaaS',
    link: 'https://www.instanodes.io/',
  },
  {
    name: 'Future Wallet',
    context: 'Multi-chain wallet experience balancing complexity with usability.',
    problem:
      'Wallet workflows were complex for non-technical users, creating friction across key actions.',
    solution:
      'Introduced motion-led guidance, reusable widgets, and cleaner interaction flows across core screens.',
    impact:
      'Improved engagement quality and mobile usability while preserving performance across device types.',
    technologies: 'React JS, JavaScript,SCSS, Ant Design, Recharts',
    category: 'Crypto',
    link: 'https://futurewallet.io/',
  },
  {
    name: 'Atlas Wallet - Chrome Extension',
    context: 'Browser extension wallet with fast-release requirements.',
    problem:
      'The team needed a scalable frontend foundation to avoid repeated component and logic rewrites.',
    solution:
      'Defined a reusable monorepo architecture and shared UI module strategy for extension and web surfaces.',
    impact:
      'Cut design-to-code turnaround by 45% and improved release consistency across frontend touchpoints.',
    technologies: 'React JS, JavaScript, SCSS, Ant Design',
    category: 'Web App',
    link: 'https://www.atlaswallet.com/chrome-extension/',
  },
  {
    name: '200+ Multi-Domain Deliveries',
    context:
      'Delivered frontend projects across internal platforms, client engagements, and full product ecosystems in multiple industries.',
    problem:
      'Teams needed fast execution across varied domains while still maintaining consistent quality and frontend standards.',
    solution:
      'Applied reusable architecture patterns, AI-assisted workflows, and product-first UI decisions to adapt quickly by domain.',
    impact:
      'Consistently delivered reliable, scalable frontend outcomes across high-velocity and high-variation project environments.',
    technologies:
      'React JS, Next.js, TypeScript, Vite, UI Systems, Performance Optimization',
    category: 'Web App',
  },
]

export const achievements = [
  {
    value: '200+',
    label: 'Projects delivered across product, service, and startup environments',
  },
  {
    value: '45%',
    label: 'Faster delivery using AI-assisted development and iteration workflows',
  },
  {
    value: '35%',
    label: 'Faster user comprehension on optimized dashboard experiences',
  },
  {
    value: '95+',
    label: 'Performance scores on optimized production pages',
  },
  {
    value: '7 Years',
    label: 'Frontend experience across high-velocity product environments',
  },
]

export const leadershipHighlights = [
  'Led teams to ship faster while maintaining premium UI quality and release confidence.',
  'Established frontend standards that improved consistency across shared products.',
  'Mentored developers in both UI thinking and implementation discipline for stronger team output.',
]

export const hobbies = [
  'Driving on long routes for focus and refresh',
  'Playing cricket and enjoying team competition',
  'Participating in different games for fun and balance',
]

export const contactLinks = {
  email: 'shubhampandit899@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shubham-sharma-9ba14b243?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  whatsapp: '918607944454',
  calendly: 'https://calendly.com/shubhampandit899',
}

export const testimonials = [
  {
    quote:
      'Shubham consistently transformed rough product ideas into polished interfaces that were production-ready and fast.',
    author: 'Product Manager, Fintech Platform',
  },
  {
    quote:
      'He combines strong UI taste with engineering discipline. We shipped faster without compromising code quality.',
    author: 'Engineering Lead, SaaS Startup',
  },
  {
    quote:
      'Reliable communication, fast execution, and premium frontend quality. Exactly what clients expect.',
    author: 'Founder, Product Studio',
  },
]

export const hiringFaq = [
  {
    question: 'What engagement models do you support?',
    answer:
      'I work on full-time frontend roles, contract projects, and fixed-scope freelance builds.',
  },
  {
    question: 'How quickly can we start?',
    answer:
      'Most engagements can start within 3-7 days after scope alignment and kickoff planning.',
  },
  {
    question: 'What do clients receive first?',
    answer:
      'A clear execution plan with milestones, timeline, and a prioritized delivery roadmap.',
  },
]
