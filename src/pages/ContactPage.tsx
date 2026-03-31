import { contactLinks } from '../data/portfolioContent'
import { SectionHeader } from '../components/SectionHeader'

export function ContactPage() {
  return (
    <section className="section-card">
      <SectionHeader
        title="Contact"
        subtitle="Open to frontend roles, freelance projects, and collaborative product work."
      />
      <div className="contact-layout">
        <div className="contact-primary-card">
          <p className="contact-kicker">Let us build something powerful</p>
          <p className="contact-message">
            If you are hiring, scaling a product, or launching a new frontend experience,
            I am available for high-impact collaboration with fast delivery and clean
            execution.
          </p>
          <ul className="contact-list">
            <li>
              <a className="contact-button" href={`mailto:${contactLinks.email}`}>
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Email"
                >
                  <path
                    d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2v.5l8 5.2 8-5.2V8l-8 5.2L4 8Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Email</span>
              </a>
            </li>
            <li>
              <a
                className="contact-button"
                href={contactLinks.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="LinkedIn"
                >
                  <path
                    d="M6.2 8.2a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2ZM4.8 9.8h2.9V19H4.8V9.8Zm4.7 0h2.8v1.3h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.6 2 3.6 4.6V19H16V15c0-1-.1-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H9.5V9.8Z"
                    fill="currentColor"
                  />
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                className="contact-button"
                href={`https://wa.me/${contactLinks.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="WhatsApp"
                >
                  <path
                    d="M12 3.5a8.5 8.5 0 0 0-7.34 12.76L3 21l4.9-1.62A8.5 8.5 0 1 0 12 3.5Zm0 15.48a6.93 6.93 0 0 1-3.55-.98l-.25-.14-2.9.96.97-2.82-.16-.29a6.95 6.95 0 1 1 5.89 3.27Zm3.81-5.2c-.2-.1-1.2-.59-1.39-.65-.19-.07-.33-.1-.47.1-.14.2-.54.65-.66.79-.12.14-.24.16-.44.06-.2-.1-.86-.32-1.64-1.02-.61-.54-1.02-1.2-1.14-1.4-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.36.1-.12.13-.2.2-.34.06-.14.03-.26-.02-.36-.05-.1-.47-1.13-.65-1.55-.17-.41-.35-.35-.47-.36h-.4c-.14 0-.36.05-.55.25-.19.2-.72.7-.72 1.7s.74 1.97.84 2.1c.1.14 1.45 2.2 3.5 3.09.49.21.87.33 1.17.43.49.15.94.13 1.3.08.4-.06 1.2-.49 1.38-.96.17-.48.17-.89.12-.97-.05-.08-.18-.13-.38-.24Z"
                    fill="currentColor"
                  />
                </svg>
                <span>WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>

        <aside className="contact-side-card">
          <h3>Why teams reach out</h3>
          <ul className="contact-points">
            <li>Fast delivery with production-ready quality</li>
            <li>Clean UI systems with performance-first approach</li>
            <li>Strong collaboration and reliable communication</li>
          </ul>
          <div className="contact-metrics">
            <article>
              <p className="contact-metric-value">&lt;24h</p>
              <p>Typical response time</p>
            </article>
            <article>
              <p className="contact-metric-value">200+</p>
              <p>Project deliveries</p>
            </article>
          </div>
        </aside>
      </div>
    </section>
  )
}
