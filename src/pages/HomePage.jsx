import { useState, useEffect } from 'react';
import { projects } from '../data/index';

/* ── Scroll reveal hook ─────────────────────────── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ── Hero Section ───────────────────────────────── */
const HeroSection = () => (
  <section className="ds-hero">
    <div className="ds-label" style={{ marginBottom: '44px' }}>Portfolio — 2026</div>
    <h1 className="ds-hero-name">
      Daniel<br />
      <span className="ds-hero-italic">Setiawan</span>
    </h1>
    <div className="ds-hero-bottom">
      <div className="ds-hero-role">
        CS Student @ BINUS University<br />
        Full Stack Developer &amp; UI/UX Designer<br />
        Jakarta, Indonesia
      </div>
      <div className="ds-label">Scroll to explore ↓</div>
      <button
        className="ds-hero-cta"
        onClick={() => {
          const el = document.getElementById('works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        View My Work ↗
      </button>
    </div>
  </section>
);

/* ── Marquee Strip ──────────────────────────────── */
const marqueeItems = ['React', 'Node.js', 'UI/UX Design', 'Full Stack', 'TypeScript', 'Next.js', 'Open to Work', 'BINUS University'];

const MarqueeStrip = () => (
  <div className="ds-marquee-strip">
    <div className="ds-marquee-inner">
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  </div>
);

/* ── About Section ──────────────────────────────── */
const AboutSection = () => {
  const [repoCount, setRepoCount] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/danielsetiawn/repos?per_page=100')
      .then(res => res.json())
      .then(repos => {
        if (Array.isArray(repos)) setRepoCount(repos.length);
        else setRepoCount(0);
      })
      .catch(() => setRepoCount(0));
  }, []);

  return (
    <section id="about" className="ds-about-section">
      <div className="ds-about-left reveal">
        <div className="ds-label" style={{ marginBottom: '16px' }}>01 — About</div>
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
            <span className="ds-stat-num">{repoCount ?? '—'}</span>
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
          I build things<br />
          people <em>actually</em><br />
          use.
        </h2>
        <p className="ds-about-body">
          CS student at BINUS who's into building from both ends — logic that runs clean, interfaces that feel right.
          I learn by breaking things, then fixing them better.
        </p>
      </div>
    </section>
  );
};

/* ── Works Section ──────────────────────────────── */
const WorksSection = () => (
  <section id="works" className="ds-works-section">
    <div className="ds-works-header">
      <h2 className="ds-works-title">Selected Work</h2>
      <span className="ds-label">02 — Projects</span>
    </div>
    {/* <div>
      {projects.map((p, i) => (
        <a
          key={i}
          href={p.live || p.github}
          target="_blank"
          rel="noreferrer"
          className="ds-project-row reveal"
          style={{ transitionDelay: `${i * 0.07}s` }}
        >
          <span className="ds-proj-num">{p.num}</span>
          <div>
            <div className="ds-proj-title">{p.title}</div>
            <div className="ds-proj-tags">
              {p.tags.map((t, j) => <span key={j} className="ds-proj-tag">{t}</span>)}
            </div>
          </div>
          <span className="ds-proj-arrow">↗</span>
        </a>
      ))}
    </div> */}
  </section>
);

/* ── Contact Section ────────────────────────────── */
const ContactSection = () => (
  <section id="contacts" className="ds-contact-section">
    <div className="ds-contact-left reveal">
      <div className="ds-label">03 — Contact</div>
      <h2 className="ds-contact-big">
        Let's<br /><em>work</em><br />together.
      </h2>
    </div>
    <div className="ds-contact-right reveal">
      <div>
        <div className="ds-label" style={{ marginBottom: '14px' }}>Get in touch</div>
        <a className="ds-contact-email" href="mailto:daniel100setiawan@gmail.com">
          daniel100setiawan@gmail.com
        </a>
      </div>
      <div>
        <div className="ds-label" style={{ marginBottom: '12px' }}>Find me on</div>
        <div className="ds-socials">
          <a className="ds-social" href="https://github.com/danielsetiawn" target="_blank" rel="noreferrer">GitHub</a>
          <a className="ds-social" href="https://www.linkedin.com/in/daniel-setiawan-03947231b/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="ds-social" href="https://www.instagram.com/daniel_setiawn/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  </section>
);

/* ── Footer ─────────────────────────────────────── */
const Footer = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="ds-footer">
      <span className="ds-footer-copy">© 2026 Daniel Setiawan</span>
      <span className="ds-footer-copy">Local Time — {time}</span>
      <span className="ds-footer-copy">Jakarta, Indonesia</span>
    </footer>
  );
};

/* ── HomePage (main export) ─────────────────────── */
const HomePage = () => {
  useReveal();
  return (
    <div className="ds-porto">
      <HeroSection />
      {/* <MarqueeStrip /> */}
      <AboutSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;