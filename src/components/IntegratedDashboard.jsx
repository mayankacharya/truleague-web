import React, { useEffect, useRef } from "react";
import dashboardPreview from "../assets/dashboard.png";
import "./IntegratedDashboard.css";

const IntegratedDashboard = () => {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame.classList.remove("pop");
          void frame.offsetWidth; // force reflow
          frame.classList.add("pop");
          
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="dashboard-hero" ref={sectionRef}>
      <div className="dashboard-content">
        <h1>Integrated Dashboard</h1>
        <p>Measure progress, response time, and yield impact</p>

        <div className="dashboard-stage">
          <div className="dashboard-frame" ref={frameRef}>
            
            {/* DASHBOARD IMAGE */}
            <img
              src={dashboardPreview}
              alt="Integrated dashboard preview"
              className="dashboard-image"
            />

            {/* 👇 BOTTOM WHITE SCREEN (BOX INTERIOR) */}
            <div className="dashboard-bottom-screen"></div>

            {/* OPTIONAL SOFT SHADOW SVG */}
            <svg
              className="dashboard-shadow"
              viewBox="0 0 816 200"
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="shadowGrad" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
                  <stop offset="70%" stopColor="#000" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse
                cx="408"
                cy="40"
                rx="500"
                ry="80"
                fill="url(#shadowGrad)"
              />
            </svg>

          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegratedDashboard;
