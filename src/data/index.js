export const navLinks = [
  {
    id: 1,
    path: '/',
    sectionId: 'about',
    text: 'About',
  },
  {
    id: 2,
    path: '/works',
    sectionId: null,
    text: 'Work',
  },
  {
    id: 3,
    path: '/',
    sectionId: 'contacts',
    text: 'Contact',
  },
];

export const projects = [
  {
    num: '01',
    title: 'CV Generator',
    description:
      'A web app that lets users fill out a form and instantly generate a clean, downloadable CV without opening a design tool.',
    type: 'Self-initiated',
    isGroup: false,
    role: null,
    impact:
      'Deployed on Vercel and generates a formatted CV in under a minute, making resume setup faster for users.',
    learnings:
      'Learned how to handle dynamic PDF generation on the client side and structure form state cleanly in React.',
    tags: ['React', 'Node.js', 'Python'],
    github: 'https://github.com/danielsetiawn/CV-Generator',
    live: 'https://cv-generator-five-rho.vercel.app/',
    image: '/images/cv-generator.png',
  },
];
