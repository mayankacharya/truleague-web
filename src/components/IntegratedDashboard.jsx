import React, { useEffect, useRef } from 'react'
import dashboardPreview from '../assets/dashboard.png'
import './IntegratedDashboard.css'

const IntegratedDashboard = () => {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const frameEl = frameRef.current
    if (!el || !frameEl) return

    const handleIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        // replay animation by removing and re-adding class
        frameEl.classList.remove('pop')
        // force reflow to allow animation restart
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        void frameEl.offsetWidth
        frameEl.classList.add('pop')
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.45, // adjust when you want it to trigger
    })

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="dashboard-hero" ref={sectionRef}>
      <div className="dashboard-content">
        <h1>Integrated Dashboard</h1>
        <p>Measure progress, response time, and yield impact</p>

        <div className="dashboard-stage">
          <div className="dashboard-frame" ref={frameRef}>
            <img
              src={dashboardPreview}
              alt="Integrated dashboard preview"
              className="dashboard-image"
            />
            <svg
              className="dashboard-shadow"
              viewBox="0 0 816 200"
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="shadowGrad" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="#5DADE2" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#3498DB" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2980B9" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="408" cy="40" rx="500" ry="80" fill="url(#shadowGrad)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegratedDashboard
