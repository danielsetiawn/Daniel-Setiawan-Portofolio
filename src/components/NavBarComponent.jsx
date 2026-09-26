import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navLinks } from '../data';

const SunIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const getInitialTheme = () => {
  const saved = localStorage.getItem('ds-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const NavBarComponent = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemChange = (e) => {
      if (!localStorage.getItem('ds-theme')) {
        const newTheme = e.matches ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.toggle('light', newTheme === 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('ds-theme', nextTheme);
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (link) => {
    if (!link.sectionId) {
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
    setTimeout(() => {
      document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="ds-nav">
      <button className="ds-nav-brand" onClick={goHome}>
        DS
      </button>

      <div className="ds-nav-center">
        {navLinks.map((link) => (
          <button
            key={link.id}
            className="ds-nav-link"
            onClick={() => handleNavClick(link)}
          >
            {link.text}
          </button>
        ))}
      </div>

      <div className="ds-nav-right">
        <button
          className="ds-nav-avail"
          onClick={() => handleNavClick({ sectionId: 'contacts' })}
          title="Scroll to Contact"
        >
          <span className="ds-nav-dot" />
          Open for work
        </button>

        <button
          className="ds-theme-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
};

export default NavBarComponent;
