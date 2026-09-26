import { useEffect, useState } from 'react';
import { projects, skills } from '../data';

const repoCountCacheKey = 'ds-github-repo-count';
const repoCountFallback = 4;

const getYearsSince = (startYear, startMonth) => {
  const startDate = new Date(startYear, startMonth - 1, 1);
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const monthDiff = now.getMonth() - startDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
    years--;
  }
  return Math.max(1, years);
};

const getCachedRepoCount = () => {
  try {
    const cached = localStorage.getItem(repoCountCacheKey);
    const count = Number(cached);

    return cached === null || !Number.isFinite(count) ? repoCountFallback : count;
  } catch {
    return repoCountFallback;
  }
};

const useReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
};

const HeroSection = () => {
  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="ds-hero">
      <div className="ds-label" style={{ marginBottom: '44px' }}>
        Portfolio — {new Date().getFullYear()}
      </div>

      <h1 className="ds-hero-name">
        Daniel
        <br />
        <span className="ds-hero-italic">Setiawan</span>
      </h1>

      <div className="ds-hero-bottom">
        <div className="ds-hero-role">
          CS Student @ BINUS University (Expected 2028)
          <br />
          Full Stack &amp; AI Engineer
          <br />
          Jakarta, Indonesia
        </div>
        <div className="ds-label">Scroll to explore</div>
        <button className="ds-hero-cta" onClick={scrollToWorks}>
          View My Work
        </button>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const [repoCount, setRepoCount] = useState(getCachedRepoCount);
  const codingYears = getYearsSince(2024, 8);
  const techCount = skills.reduce((total, group) => total + group.items.length, 0);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.github.com/users/danielsetiawn', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        return response.json();
      })
      .then((user) => {
        if (typeof user.public_repos !== 'number') return;

        try {
          localStorage.setItem(repoCountCacheKey, String(user.public_repos));
        } catch {
          setRepoCount(user.public_repos);
          return;
        }

        setRepoCount(user.public_repos);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setRepoCount(getCachedRepoCount());
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="about" className="ds-about-section">
      <div className="ds-about-left reveal">
        <div className="ds-label" style={{ marginBottom: '16px' }}>
          01 - About
        </div>

        <div className="ds-stat-grid">
          <div className="ds-stat">
            <span className="ds-stat-num">{codingYears}+</span>
            <span className="ds-stat-lbl">Years</span>
          </div>
          <div className="ds-stat">
            <span className="ds-stat-num">10+</span>
            <span className="ds-stat-lbl">Projects</span>
          </div>
          <div className="ds-stat">
            <span className="ds-stat-num">{repoCount ?? '-'}</span>
            <span className="ds-stat-lbl">GitHub Repos</span>
          </div>
          <div className="ds-stat">
            <span className="ds-stat-num">{techCount}+</span>
            <span className="ds-stat-lbl">Tech Stacks</span>
          </div>
        </div>
      </div>

      <div className="ds-about-right reveal">
        <h2 className="ds-about-big">
          I build things
          <br />
          people <em>actually</em>
          <br />
          use.
        </h2>
        <p className="ds-about-body">
          CS student at BINUS who is into building from both ends: logic that runs
          clean, interfaces that feel right. I learn by breaking things, then fixing
          them better.
        </p>
      </div>
    </section>
  );
};

const SkillsSection = () => (
  <section id="skills" className="ds-skills-section">
    <div className="ds-skills-header reveal">
      <h2 className="ds-skills-title">Tech Stack &amp; Tools</h2>
      <span className="ds-label">Stack &amp; Expertise</span>
    </div>

    <div className="ds-skills-grid reveal">
      {skills.map((group, index) => (
        <div key={group.category} className="ds-skill-col">
          <div className="ds-skill-col-header">
            <span className="ds-skill-num">0{index + 1}</span>
            <h3 className="ds-skill-category">{group.category}</h3>
          </div>
          <div className="ds-skill-tags">
            {group.items.map((item) => (
              <span key={item} className="ds-skill-tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const WorksSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleProject = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="works" className="ds-works-section">
      <div className="ds-works-header">
        <h2 className="ds-works-title">Selected Work</h2>
        <span className="ds-label">02 - Projects</span>
      </div>

      {projects.map((project, index) => {
        const isOpen = openIndex === index;
        const isOngoing = project.status === 'In Progress' || project.status === 'Ongoing';

        return (
          <article key={project.num} className="ds-accordion-item">
            <button
              className="ds-accordion-header"
              onClick={() => toggleProject(index)}
              aria-expanded={isOpen}
            >
              <span className="ds-proj-num">{project.num}</span>
              <span className="ds-accordion-title-block">
                <span className="ds-proj-header-row">
                  <span className="ds-proj-title">{project.title}</span>
                  {isOngoing && (
                    <span className="ds-status-pill in-progress">
                      <span className="ds-status-dot" />
                      {project.status}
                    </span>
                  )}
                </span>
                <span className="ds-proj-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="ds-proj-tag">
                      {tag}
                    </span>
                  ))}
                </span>
              </span>
              <svg
                className={`ds-accordion-chevron${isOpen ? ' open' : ''}`}
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className={`ds-accordion-body${isOpen ? ' open' : ''}`}>
              <div className="ds-accordion-inner">
                <div className="ds-accordion-badges">
                  <span className="ds-badge-type">{project.type}</span>
                  {project.isGroup && <span className="ds-badge-group">Group Project</span>}
                  {project.status && (
                    <span className={`ds-badge-status ${isOngoing ? 'in-progress' : ''}`}>
                      {isOngoing && <span className="ds-status-dot" />}
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="ds-accordion-desc">{project.description}</p>

                {project.image && (
                  <div className="ds-accordion-img-wrap">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="ds-accordion-img"
                    />
                  </div>
                )}

                {project.isGroup && project.role && (
                  <div className="ds-accordion-field">
                    <div className="ds-accordion-label">My Role</div>
                    <p className="ds-accordion-text">{project.role}</p>
                  </div>
                )}

                <div className="ds-accordion-grid">
                  <div className="ds-accordion-field">
                    <div className="ds-accordion-label">Impact</div>
                    <p className="ds-accordion-text">{project.impact}</p>
                  </div>
                  <div className="ds-accordion-field">
                    <div className="ds-accordion-label">What I Learned</div>
                    <p className="ds-accordion-text">{project.learnings}</p>
                  </div>
                </div>

                <div className="ds-accordion-links">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="ds-accordion-link"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="ds-accordion-link muted"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('daniel100setiawan@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacts" className="ds-contact-section">
      <div className="ds-contact-left reveal">
        <div className="ds-label">03 - Contact</div>
        <h2 className="ds-contact-big">
          Let's
          <br />
          <em>work</em>
          <br />
          together.
        </h2>
      </div>

      <div className="ds-contact-right reveal">
        <div>
          <div className="ds-label" style={{ marginBottom: '14px' }}>
            Get in touch
          </div>
          <div className="ds-contact-email-row">
            <a className="ds-contact-email" href="mailto:daniel100setiawan@gmail.com">
              daniel100setiawan@gmail.com
            </a>
            <button
              className="ds-contact-copy-btn"
              onClick={copyEmail}
              aria-label="Copy email address"
              title="Copy email to clipboard"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div>
          <div className="ds-label" style={{ marginBottom: '12px' }}>
            Find me on
          </div>
          <div className="ds-socials">
            <a
              className="ds-social"
              href="https://github.com/danielsetiawn"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="ds-social"
              href="https://www.linkedin.com/in/daniel-setiawan-03947231b/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="ds-social"
              href="https://www.instagram.com/daniel_setiawn/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const LocalClock = () => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>Local Time - {time}</span>;
};

const Footer = () => (
  <footer className="ds-footer">
    <span className="ds-footer-copy">(c) {new Date().getFullYear()} Daniel Setiawan</span>
    <span className="ds-footer-copy">
      <LocalClock />
    </span>
    <span className="ds-footer-copy">Jakarta, Indonesia</span>
  </footer>
);

const HomePage = () => {
  useReveal();

  return (
    <div className="ds-porto">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
