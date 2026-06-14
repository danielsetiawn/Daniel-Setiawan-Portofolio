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

const SystemIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const themeIcons = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  system: <SystemIcon />,
};

const themeOptions = ['light', 'dark', 'system'];

const getSavedTheme = () => localStorage.getItem('ds-theme') || 'dark';

const applyTheme = (theme) => {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const shouldUseLight = theme === 'light' || (theme === 'system' && prefersLight);

  document.documentElement.classList.toggle('light', shouldUseLight);
};

const NavBarComponent = () => {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState(getSavedTheme);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    applyTheme(currentTheme);

    const query = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemTheme = () => {
      if (currentTheme === 'system') applyTheme('system');
    };

    query.addEventListener('change', handleSystemTheme);
    return () => query.removeEventListener('change', handleSystemTheme);
  }, [currentTheme]);

  useEffect(() => {
    const closeMenu = (event) => {
      if (!event.target.closest('#nav-theme-dropdown')) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setTheme = (theme) => {
    localStorage.setItem('ds-theme', theme);
    setCurrentTheme(theme);
    setIsThemeOpen(false);
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
        <div className="ds-nav-avail">
          <span className="ds-nav-dot" />
          Available
        </div>

        <div className="ds-theme-dropdown" id="nav-theme-dropdown">
          <button
            className="ds-theme-btn"
            onClick={() => setIsThemeOpen((open) => !open)}
            aria-label="Toggle theme"
          >
            {themeIcons[currentTheme]}
          </button>

          <div className={`ds-dropdown-menu${isThemeOpen ? ' open' : ''}`}>
            {themeOptions.map((theme) => (
              <button
                key={theme}
                className={`ds-dropdown-item${currentTheme === theme ? ' active' : ''}`}
                onClick={() => setTheme(theme)}
              >
                {themeIcons[theme]}
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
