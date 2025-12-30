import React, { useState, useEffect, useRef } from 'react';
import './Insights.css';

import InsightsSVG from '../../assets/OnlySVG/insights.svg';
import InsightsSVG1 from '../../assets/OnlySVG/insights1.svg';
import InsightsSVG2 from '../../assets/OnlySVG/insights2.svg';
import InsightsSVG3 from '../../assets/OnlySVG/insights3.svg';

const InsightsCarousel = () => {

  const isDesktop = window.innerWidth >= 1024;
  if (!isDesktop) return null;

  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const insightCards = [
    { id: 1, title: 'Predict student behavior and sentiment to improve yield', icon: InsightsSVG },
    { id: 2, title: 'Personalize communication for diverse student groups', icon: InsightsSVG1 },
    { id: 3, title: 'Refine strategies with real-time enrollment insight', icon: InsightsSVG2 },
    { id: 4, title: 'Engage early to reduce melt and boost retention', icon: InsightsSVG3 },
  ];

  const totalSlides = insightCards.length;

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const height = el.offsetHeight - window.innerHeight;

      const progress = Math.min(1, Math.max(0, -rect.top / height));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="insights-master-container">
      <div className="insights-viewport">
        <div
          className="insights-scroll-container"
          style={{
            transform: `translateX(-${scrollProgress * 100 * (totalSlides - 1)}vw)`
          }}
        >
          {insightCards.map((card, index) => {
            const local =
              Math.min(1, Math.max(0, (scrollProgress - index / totalSlides) * totalSlides));

            return (
              <InsightSlide
                key={card.id}
                index={index}
                local={local}
                card={card}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ================= SLIDE ================= */

const InsightSlide = ({ card, index, local }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  let translateX = 0;

  if (cardRef.current && imgRef.current) {
    const cardWidth = cardRef.current.offsetWidth;
    const imgWidth = imgRef.current.offsetWidth;

    const maxTranslate = cardWidth - imgWidth - 48; // padding safe
    const rawMove = local * maxTranslate;

    translateX = Math.min(Math.max(rawMove, 0), maxTranslate);
  }

  return (
    <div className="insights-item">
      <div className="insights-item-content">

        {index === 0 ? (
          <div className="insights-text">
            <h2 className="insights-heading">
              Recruit Smarter With Real-Time AI Insights
            </h2>
          </div>
        ) : (
          <div className="insights-text insights-text--placeholder" />
        )}

        <div className="insights-card-container">
          <div className="insights-card" ref={cardRef}>
            <img
              ref={imgRef}
              src={card.icon}
              alt=""
              className="card-icon"
              style={{ transform: `translateX(${translateX}px)` }}
            />
            <p className="card-text">{card.title}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsightsCarousel;
