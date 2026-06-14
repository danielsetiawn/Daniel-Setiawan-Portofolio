import { useEffect, useState } from 'react';
import { projects } from '../data';

const repoCountCacheKey = 'ds-github-repo-count';
const repoCountFallback = 4;

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
        Portfolio - 2026
      </div>

      <h1 className="ds-hero-name">
        Daniel
        <br />
        <span className="ds-hero-italic">Setiawan</span>
      </h1>

      <div className="ds-hero-bottom">
        <div className="ds-hero-role">
          CS Student @ BINUS University
          <br />
          Full Stack Developer &amp; UI/UX Designer
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
            <span className="ds-stat-num">2+</span>
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
            <span className="ds-stat-num">5+</span>
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

const WorksSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

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

        return (
          <article key={project.num} className="ds-accordion-item">
            <button
              className="ds-accordion-header"
              onClick={() => toggleProject(index)}
              aria-expanded={isOpen}
            >
              <span className="ds-proj-num">{project.num}</span>
              <span className="ds-accordion-title-block">
                <span className="ds-proj-title">{project.title}</span>
                <span className="ds-proj-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="ds-proj-tag">
                      {tag}
                    </span>
                  ))}
                </span>
              </span>
              <span className={`ds-accordion-chevron${isOpen ? ' open' : ''}`}>v</span>
            </button>

            <div className={`ds-accordion-body${isOpen ? ' open' : ''}`}>
              <div className="ds-accordion-inner">
                <div className="ds-accordion-badges">
                  <span className="ds-badge-type">{project.type}</span>
                  {project.isGroup && <span className="ds-badge-group">Group Project</span>}
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
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="ds-accordion-link muted"
                    >
                      GitHub
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

const ContactSection = () => (
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
        <a className="ds-contact-email" href="mailto:daniel100setiawan@gmail.com">
          daniel100setiawan@gmail.com
        </a>
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

const Footer = () => {
  const [time, setTime] = useState(
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

  return (
    <footer className="ds-footer">
      <span className="ds-footer-copy">(c) 2026 Daniel Setiawan</span>
      <span className="ds-footer-copy">Local Time - {time}</span>
      <span className="ds-footer-copy">Jakarta, Indonesia</span>
    </footer>
  );
};

const HomePage = () => {
  useReveal();

  return (
    <div className="ds-porto">
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
