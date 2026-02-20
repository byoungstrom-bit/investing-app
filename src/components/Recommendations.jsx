import { recommendationsData } from '../data/recommendations';
import './Recommendations.css';

export function Recommendations() {
  const { sections } = recommendationsData;

  return (
    <section className="recommendations">
      {sections.map((group) => (
        <div key={group.id} className="recommendations-group">
          <div className="section-header">
            <h2>{group.title}</h2>
            <p className="source">
              {group.youtubeUrl ? (
                <>
                  From the {group.source} —{' '}
                  <a href={group.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                  </a>
                </>
              ) : (
                group.source
              )}
            </p>
          </div>

          <div className="members-grid">
            {group.members.map((member) => (
              <article key={member.id} className="member-card expanded">
                <div className="member-header">
                  <div className="avatar">{member.avatar}</div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <span className="role">{member.role}</span>
                  </div>
                </div>

                <div className="member-content">
                  <div className="predictions-block">
                    <h4 className="block-title recommends">Recommends</h4>
                    {member.recommends.map((rec, i) => (
                      <div key={i} className="prediction-item">
                        <span className="asset">{rec.asset}</span>
                        {rec.ticker && <code className="ticker">{rec.ticker}</code>}
                        <p className="rationale">{rec.rationale}</p>
                        {rec.transcriptRef && (
                          <span className="transcript-ref">{rec.transcriptRef}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="predictions-block">
                    <h4 className="block-title against">Recommends Against</h4>
                    {member.recommendsAgainst.map((rec, i) => (
                      <div key={i} className="prediction-item">
                        <span className="asset">{rec.asset}</span>
                        {rec.ticker && <code className="ticker">{rec.ticker}</code>}
                        <p className="rationale">{rec.rationale}</p>
                        {rec.transcriptRef && (
                          <span className="transcript-ref">{rec.transcriptRef}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
