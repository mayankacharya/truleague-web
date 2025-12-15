import React from 'react'
import heroVideo from '../assets/Landing Page Video with globe.mp4'
import './Hero.css'

const Hero = () => (
  <section className="hero-section">
    <div className="hero-section__video-wrapper">
      <video
        className="hero-section__video"
        src={heroVideo}
        muted
        autoPlay
        loop
        playsInline
        preload="none"
      />
    </div>
    <div className="hero-section__content">
      {/* <p className="hero-section__eyebrow">Peer engagement insights</p> */}
      <h1 className="hero-section__title">
        <span className="hero-section__title-line">
          Authentic Connections. Smarter Insights.
        </span>
        <span className="hero-section__title-line hero-section__title-line--strong">
          Stronger Enrollment.
        </span>
      </h1>
      <p className="hero-section__subtext">
        TruLeague blends authentic peer engagement with real-time analytics to
        increase yield and optimize recruitment performance across the funnel.
      </p>
      <button type="button" className="hero-section__cta">
        Increase yield by 15%
      </button>
    </div>
  </section>
)

export default Hero
