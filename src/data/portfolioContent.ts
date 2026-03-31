export type SkillGroup = {
  title: string
  items: string[]
}

export type Project = {
  name: string
  description: string
  technologies: string
  achievement: string
  link?: string
}

export const heroContent = {
  name: 'Shubham Sharma',
  role: 'Frontend Developer',
  intro:
    'I build modern, high-performing web experiences that are smooth, intuitive, and conversion-focused—combining clean frontend architecture, strong UI thinking, and AI-powered workflows to deliver products faster without compromising quality.',
  aiLine:
    'I use AI tools daily to accelerate development, improve code quality, and deliver websites faster without compromising performance.',
  tagline: 'React-first builds with premium UI/UX, engineered for performance from the ground up.',
}

export const domainHighlights = [
  'Web Extensions',
  'Crypto Exchanges Frontend',
  'NFT Platforms',
  'Health Apps',
  'Enterprise and Business Websites',
]

export const landingHighlights = [
  {
    title: 'Product-Focused UI Architecture',
    description:
      'I design frontend systems that scale with product growth, not just screens that look good.',
  },
  {
    title: 'Fast Delivery, Clean Standards',
    description:
      'From planning to release, I optimize delivery speed while keeping maintainable, production-grade code quality.',
  },
  {
    title: 'Performance by Default',
    description:
      'Every interface is built with smooth rendering, responsive behavior, and practical optimization in mind.',
  },
]

export const collaborationFlow = [
  {
    step: '01',
    title: 'Discovery & Product Clarity',
    description:
      'I align with your vision, technical scope, and business goals to define a clear execution path.',
  },
  {
    step: '02',
    title: 'Design-to-Code Execution',
    description:
      'I build polished interfaces with reusable components, modern animations, and consistent design language.',
  },
  {
    step: '03',
    title: 'Optimization & Launch',
    description:
      'I fine-tune performance, strengthen UX details, and deliver release-ready frontend with confidence.',
  },
]

export const trustMetrics = [
  { value: '200+', label: 'Projects shipped across product and services' },
  { value: '7 Years', label: 'Hands-on frontend and leadership experience' },
  { value: '45%', label: 'Average faster delivery using AI-assisted workflows' },
]

export const aboutContent = [
  'I started my frontend journey by transforming static ideas into responsive, user-friendly interfaces, and gradually evolved into building complete React JS applications from concept to production.',

  'Today, I specialize in creating scalable frontend systems with reusable components, clean UI architecture, and practical UX decisions that align closely with business goals.',

  'I’ve also taken on responsibilities of guiding and mentoring frontend developers, helping maintain consistency in code quality, delivery, and overall product experience.',

  'Along with frontend delivery, I have worked on system design decisions, including defining a generic monorepo approach to improve shared architecture, reusability, and cross-team development speed.',

  'I have also built and scaled frontend products across multiple domains, including web extensions, exchange platforms, NFT products, health applications, and many other modern websites.',

  'Over time, I’ve adapted to rapid changes in the IT landscape—embracing new tools, workflows, and technologies to consistently build modern, efficient web applications.',

  'I actively leverage AI to accelerate development, streamline UI creation, debug faster, and solve complex problems—allowing me to deliver high-quality results in less time.',
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript','TypeScript', 'React JS', 'Next.js'],
  },
  {
    title: 'Styling',
    items: ['Tailwind CSS', 'Bootstrap', 'SCSS'],
  },
  {
    title: 'Tools & Libraries',
    items: [
      'Git',
      'GitHub',
      'Vite',
      'Framer Motion',
      'Recharts',
      'Axios',
      'React Hook Form',
      'Yup',
      'Redux Toolkit',
      'Shadcn UI',
      'Material UI',
      'Bootstrap',
      'Ant Design',
      'Tailwind CSS',
      'Figma',
      'AI Tools (ChatGPT, Copilot, AI UI Generators)'
    ]
  },
  {
    title: 'AI-Assisted Development',
    items: [
      'Leveraging AI to significantly accelerate development workflows',
      'Generating and refining UI experiences with AI precision',
      'Solving complex problems faster with AI-assisted debugging',
    ]
  },
  {
    title: 'Architecture & System Design',
    items: [
      'Frontend system design for scalable web platforms',
      'Generic monorepo approach for shared libraries and apps',
      'Reusable architecture patterns for faster team delivery',
    ]
  },
  {
    title: 'AI Tools',
    items: [
      'ChatGPT',
      'GitHub Copilot',
      'Cursor AI',
      'Windsurf AI',
      'AntiGravity',
      'Claude',
      'Gemini',
    ]
  }
]

export const projects: Project[] = [
  {
    name: 'GEMS Trade',
    description:
      'Gems Trade is the natural next step in the evolution of the Gems ecosystem, expanding on the foundation built by the Gems Launchpad. By introducing the $GEMS token as a core utility and integrating it with Gems Trade, we’re creating a unified hub for trading, investing, and community engagement. This power hub brings together cutting-edge features, exclusive benefits, and a thriving community to shape the future of crypto, all while strengthening the ecosystem that began with the Launchpad.',
    technologies: 'React JS, Recharts, SCSS, Ant Design',
    achievement:
      'Reduced data reading time by 35% using clear chart storytelling and optimized component rendering.',
    link: 'https://www.gems.trade/',
  },
  {
    name: 'Instanode',
    description:
      'Deploy nodes, validators, rollups, and appchains in minutes with transparent pricing, seamless scalability, and complete control, only with Instanodes.',
    technologies: 'Vite, React JS, Framer Motion, Tailwind CSS',
    achievement:
      'Used AI-assisted code generation and refactoring to ship core modules 40% faster.',
    link: 'https://www.instanodes.io/',
  },
  {
    name: 'Future Wallet',
    description:
      'Future Wallet is a decentralized, non-custodial, multi-chain wallet designed to make digital asset access simpler, more intuitive, and more practical for modern users.',
    technologies: 'React JS, JavaScript,SCSS, Ant Design, Recharts',
    achievement:
      'Improved engagement with motion-led UI and reusable widgets while keeping smooth performance on mobile.',
    link: 'https://futurewallet.io/',
  },
  {
    name: 'Atlas Wallet - Chrome Extension',
    description:`The World's No.1 Crypto Wallet available directly on your desktop. Secure, convenient, feature-rich access to the world of crypto.`,
    technologies: 'React JS, JavaScript, SCSS, Ant Design',
    achievement:
      'Defined a generic monorepo setup for shared UI modules and leveraged AI tools for faster iterations, cutting design-to-code turnaround by 45%.',
  },
  {
    name: '200+ Multi-Domain Deliveries',
    description:
      'Delivered more than 200 projects across internal platforms, external service-based engagements, and full-scale product builds, spanning multiple industries and business models.',
    technologies:
      'React JS, Next.js, TypeScript, Vite, UI/UX Systems, Performance Optimization',
    achievement:
      'Consistently shipped reliable, scalable frontend solutions across fast-moving client and product environments.',
  },
]

export const achievements = [
  {
    value: '200+',
    label: 'Projects delivered across internal platforms, service-based work, and product ecosystems',
  },
  {
    value: '45%',
    label: 'Faster delivery with AI-assisted development, design iteration, and debugging workflows',
  },
  {
    value: '35%+',
    label: 'UI/UX quality improvement with cleaner design systems and interaction-focused interfaces',
  },
  {
    value: '95+',
    label: 'Performance scores achieved on optimized production pages',
  },
  {
    value: '7 Years',
    label: 'Overall frontend experience across fast-evolving tech and product environments',
  },
]

export const leadershipHighlights = [
  'As a Team Lead and developer, I deliver projects in less time while maintaining better design quality and functional, production-ready code.',
  'I collaborate closely with teams to keep morale strong, create a positive delivery culture, and ensure no team member feels demotivated.',
  'I have mentored and trained multiple developers in frontend design and development, helping them level up in both UI thinking and implementation quality.',
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
  // github: 'https://github.com/your-username',
}
