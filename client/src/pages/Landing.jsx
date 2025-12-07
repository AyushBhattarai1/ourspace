import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing">
      <div className="hearts-background">
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
      </div>
      
      <div className="landing-content">
        <section className="hero-section">
          <div className="landing-header">
            <h1 className="app-title">Our Space</h1>
            <p className="tagline">Where two hearts meet, memories are made</p>
          </div>

          <div className="landing-hero">
            <div className="couple-names">
              <span className="name">Ayush</span>
              <span className="heart-divider">&</span>
              <span className="name">Neha</span>
            </div>
            <p className="hero-text">
              A private sanctuary for your love story. Share moments, write journals, 
              and create memories that last forever.
            </p>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Everything You Need</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">J</div>
              <h3>Private Journals</h3>
              <p>Write your thoughts, share with your partner, or keep them private.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">M</div>
              <h3>Special Moments</h3>
              <p>Capture and cherish your favorite memories together.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">G</div>
              <h3>Photo Gallery</h3>
              <p>Store your precious photos in one beautiful place.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">N</div>
              <h3>Love Notes</h3>
              <p>Send sweet messages and reminders to each other.</p>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Your Mode</h3>
              <p>Switch between Me, Partner, and Couple modes.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Create & Share</h3>
              <p>Write journals, add photos, capture moments.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Build Memories</h3>
              <p>Watch your love story grow together.</p>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-content">
            <div className="privacy-text">
              <h2 className="section-title">Your Privacy Matters</h2>
              <p className="privacy-description">
                This is your private sanctuary. Only you and your partner have access.
              </p>
              <div className="privacy-features">
                <div className="privacy-item">
                  <div className="privacy-check">✓</div>
                  <div>
                    <h4>Secure & Private</h4>
                    <p>Your data is protected</p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-check">✓</div>
                  <div>
                    <h4>Just Two People</h4>
                    <p>Only Ayush and Neha</p>
                  </div>
                </div>
                <div className="privacy-item">
                  <div className="privacy-check">✓</div>
                  <div>
                    <h4>Your Control</h4>
                    <p>Edit or delete anytime</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="privacy-visual">
              <div className="privacy-card">
                <div className="lock-visual"></div>
                <p>Protected Space</p>
              </div>
            </div>
          </div>
        </section>

        <section className="modes-section">
          <h2 className="section-title">Three Ways to Connect</h2>
          <div className="modes-grid">
            <div className="mode-card">
              <div className="mode-header">
                <h3>Me Mode</h3>
                <span className="mode-badge">Private</span>
              </div>
              <p>Your personal space for private thoughts and notes.</p>
              <ul className="mode-features">
                <li>Private journals</li>
                <li>Personal notes</li>
                <li>Draft entries</li>
                <li>Your eyes only</li>
              </ul>
            </div>
            
            <div className="mode-card featured">
              <div className="mode-header">
                <h3>Couple Mode</h3>
                <span className="mode-badge special">Shared</span>
              </div>
              <p>Shared space where both can create and edit together.</p>
              <ul className="mode-features">
                <li>Shared moments</li>
                <li>Joint gallery</li>
                <li>Collaborative notes</li>
                <li>Both can edit</li>
              </ul>
            </div>
            
            <div className="mode-card">
              <div className="mode-header">
                <h3>Partner Mode</h3>
                <span className="mode-badge">For You</span>
              </div>
              <p>See what your partner has written for you.</p>
              <ul className="mode-features">
                <li>Love letters</li>
                <li>Special messages</li>
                <li>Surprises</li>
                <li>View only</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">
              Having our own private space to share memories has brought us closer. 
              It is beautiful to look back at all our moments together.
            </p>
            <div className="testimonial-author">
              <div className="author-names">Ayush & Neha</div>
              <div className="author-subtitle">Together since forever</div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-subtitle">Create lasting memories in your private space</p>
          <button className="btn-enter" onClick={() => navigate('/login')}>
            Enter Our Space
            <span className="arrow">→</span>
          </button>
        </section>

        <footer className="landing-footer">
          <p>Made with love for Ayush & Neha</p>
          <div className="footer-links">
            <span>Privacy</span>
            <span>•</span>
            <span>Security</span>
            <span>•</span>
            <span>About</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing;
