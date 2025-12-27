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
  const [activeId, setActiveId] = useState(testimonialData[0].id);
  const currentIndex = testimonialData.findIndex((item) => item.id === activeId);
  const testimonialsCount = testimonialData.length;
  const activeTestimonial = testimonialData[currentIndex];

  // Check if we can go to previous/next
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < testimonialsCount - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      const prevIndex = currentIndex - 1;
      setActiveId(testimonialData[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      const nextIndex = currentIndex + 1;
      setActiveId(testimonialData[nextIndex].id);
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="testimonials-heading">
          <div className="testimonials-heading-main">
            <div>
              <h2 className="testimonials-title">Testimonials</h2>
            </div>
          </div>
          <div className="testimonials-tabs">
            {testimonialData.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`testimonials-tab ${item.id === activeId ? 'is-active' : ''}`}
                onClick={() => setActiveId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="testimonials-card">
          <p className="testimonial-quote">{activeTestimonial.quote}</p>

          <div className="testimonial-person">
            <div className="testimonial-person__info">
              <img
                className="testimonial-avatar"
                src={activeTestimonial.avatar}
                alt={activeTestimonial.name}
              />
              <div>
                <p className="testimonial-name">{activeTestimonial.name}</p>
                <p className="testimonial-role">{activeTestimonial.role}</p>
              </div>
            </div>
            <div className="testimonial-person__controls">
              <div className="testimonial-nav">
                <button
                  type="button"
                  className={`testimonial-nav__arrow testimonial-nav__arrow--prev ${
                    canGoPrev ? 'highlight' : ''
                  }`}
                  aria-label="Previous testimonial"
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`testimonial-nav__arrow testimonial-nav__arrow--next ${
                    !canGoNext ? 'disabled' : ''
                  }`}
                  aria-label="Next testimonial"
                  onClick={handleNext}
                  disabled={!canGoNext}
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