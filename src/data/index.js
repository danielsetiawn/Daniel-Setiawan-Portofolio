export const navLinks = [
  {
    id: 1,
    path: "/",
    sectionId: "about",
    text: "About",
  },
  {
    id: 2,
    path: "/",
    sectionId: "skills",
    text: "Stack",
  },
  {
    id: 3,
    path: "/",
    sectionId: "works",
    text: "Work",
  },
  {
    id: 4,
    path: "/",
    sectionId: "contacts",
    text: "Contact",
  },
];

export const skills = [
  {
    category: "Frontend",
    label: "Frontend Engineering",
    description: "Building responsive, modern client applications with clean state architecture and type safety.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    label: "Backend & Systems",
    description: "Developing performant REST APIs, microservices, and database models with clean routing.",
    items: ["Python", "FastAPI", "Node.js", "MySQL"],
  },
  {
    category: "AI & Data",
    label: "AI & Machine Learning",
    description: "Training machine learning and deep learning models, NLP pipelines, and data exploration.",
    items: ["PyTorch", "Machine Learning", "NLP", "Pandas"],
  },
  {
    category: "Tools & Design",
    label: "Tools & Workflow",
    description: "Modern engineering workflows from Figma UI prototyping to containerization and deployment.",
    items: ["Git", "Docker", "Figma", "Vercel"],
  },
];

export const projects = [
  {
    num: "01",
    title: "CV Generator",
    description: "A web app that lets users fill out a form and instantly generate a clean, downloadable CV — no design tools needed.",
    status: "Completed",
    type: "Self-initiated",
    isGroup: false,
    role: null,
    impact: "Deployed on Vercel; generates a formatted CV in under a minute, cutting the resume-building process significantly for users.",
    learnings: "Learned how to handle dynamic PDF generation on the client side and how to structure form state cleanly in React.",
    tags: ["React", "Node.js", "Python"],
    github:"https://github.com/danielsetiawn/CV-Generator",
    live: "https://cv-generator-five-rho.vercel.app/",
    image: "/images/cv-generator.png", 
  },
  {
    num: "02",
    title: "AI Market Analyst",
    description: "An AI-powered system designed to analyze financial trends, stock market movements, and news sentiment using machine learning models.",
    status: "In Progress",
    type: "Self-initiated",
    isGroup: false,
    role: null,
    impact: "Currently in development with predictive modeling pipelines and sentiment analysis for financial intelligence.",
    learnings: "Building financial data ingestion workflows, time-series forecasting, and integrating machine learning models.",
    tags: ["Python", "Machine Learning", "FastAPI"],
    github: "https://github.com/danielsetiawn/AI-market-analyst",
    live: null,
    image: null,
  },
];