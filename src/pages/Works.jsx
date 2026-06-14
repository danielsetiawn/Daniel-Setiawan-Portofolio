import { projects } from '../data';

const Works = () => (
  <main className="ds-works-page">
    <header className="ds-works-page-header">
      <span className="ds-label">02 - Projects</span>
      <h1>Selected Work</h1>
    </header>

    <div className="ds-works-list">
      {projects.map((project) => (
        <article key={project.num} className="ds-work-detail">
          <div className="ds-work-detail-top">
            <div className="ds-work-title-row">
              <span>{project.num}</span>
              <h2>{project.title}</h2>
            </div>

            <div className="ds-work-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="ds-work-badges">
            <span>{project.type}</span>
            {project.isGroup && <span>Group Project</span>}
          </div>

          <p className="ds-work-description">{project.description}</p>

          {project.isGroup && project.role && (
            <div className="ds-work-copy">
              <span>My Role</span>
              <p>{project.role}</p>
            </div>
          )}

          <div className="ds-work-grid">
            <div className="ds-work-copy">
              <span>Impact</span>
              <p>{project.impact}</p>
            </div>
            <div className="ds-work-copy">
              <span>What I Learned</span>
              <p>{project.learnings}</p>
            </div>
          </div>

          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="ds-work-image"
            />
          )}

          <div className="ds-work-links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer">
                Live
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  </main>
);

export default Works;
