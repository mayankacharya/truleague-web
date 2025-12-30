import React, { useState } from 'react';
import './testimonials.css';
import AvatarPrimary from '../../assets/OnlySVG/avator2.svg';
import AvatarSecondary from '../../assets/OnlySVG/mwn1.svg';

const testimonialData = [
  {
    id: 'college',
    label: 'College',
    quote:
      '"The success has led us to expand use of TruLeague across more programs, and to more intentionally integrate it into our recruitment and marketing efforts."',
    name: 'Laura Quinlan',
    role: 'Senior Director of Graduate Admissions, Simmons University',
    avatar: AvatarPrimary,
  },
  {
    id: 'school',
    label: 'School',
    quote:
      '"The success has led us to expand use of TruLeague across more programs, and to more intentionally integrate it into our recruitment and marketing efforts."',
    name: 'Laura Quinlan',
    role: 'Senior Director of Graduate Admissions, Simmons University',
    avatar: AvatarSecondary,
  },
];

const Testimonials = () => {
  const [activeId, setActiveId] = useState('college');

  const activeTestimonial = testimonialData.find(
    (item) => item.id === activeId
  );

  const isCollegeActive = activeId === 'college';
  const isSchoolActive = activeId === 'school';

  // 🔁 Arrow click = tab switch
  const handlePrev = () => {
    // LEFT arrow → College par le jaata hai
    setActiveId('college');
  };

  const handleNext = () => {
    // RIGHT arrow → School par le jaata hai
    setActiveId('school');
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        {/* ===== HEADING ===== */}
        <div className="testimonials-heading">
          <div className="testimonials-heading-main">
            <h2 className="testimonials-title">Testimonials</h2>
          </div>

          {/* ===== TABS ===== */}
          <div className="testimonials-tabs">
            {testimonialData.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`testimonials-tab ${
                  item.id === activeId ? 'is-active' : ''
                }`}
                onClick={() => setActiveId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== CARD ===== */}
        <div className="testimonials-card" key={activeId}>
          <p className="testimonial-quote">{activeTestimonial.quote}</p>

          <div className="testimonial-person">
            <div className="testimonial-person__info">
              <img
                className="testimonial-avatar"
                src={activeTestimonial.avatar}
                alt={activeTestimonial.name}
              />
              <div>
                <p className="testimonial-name">
                  {activeTestimonial.name}
                </p>
                <p className="testimonial-role">
                  {activeTestimonial.role}
                </p>
              </div>
            </div>

            {/* ===== ARROWS ===== */}
            <div className="testimonial-person__controls">
              <div className="testimonial-nav">
                {/* LEFT ARROW */}
                <button
                  type="button"
                  className={`testimonial-nav__arrow testimonial-nav__arrow--prev ${
                    isCollegeActive ? 'highlight' : ''
                  }`}
                  onClick={handlePrev}
                  aria-label="Go to College testimonial"
                >
                  ‹
                </button>

                {/* RIGHT ARROW */}
                <button
                  type="button"
                  className={`testimonial-nav__arrow testimonial-nav__arrow--next ${
                    isSchoolActive ? '' : 'disabled'
                  }`}
                  onClick={handleNext}
                  aria-label="Go to School testimonial"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
