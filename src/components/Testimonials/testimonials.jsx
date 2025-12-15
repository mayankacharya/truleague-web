import React, { useState } from 'react';
import './testimonials.css';
import AvatarPrimary from '../../assets/OnlySVG/avator2.svg';
import AvatarSecondary from '../../assets/OnlySVG/mwn1.svg';

const testimonialData = [
  {
    id: 'college',
    label: 'College',
    quote:
      '“The success has led us to expand use of TruLeague across more programs, and to more intentionally integrate it into our recruitment and marketing efforts.”',
    name: 'Laura Quinlan',
    role: 'Senior Director of Graduate Admissions, Simmons University',
    avatar: AvatarPrimary,
  },
  {
    id: 'school',
    label: 'School',
    quote:
      '“The success has led us to expand use of TruLeague across more programs, and to more intentionally integrate it into our recruitment and marketing efforts.”',
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

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + testimonialsCount) % testimonialsCount;
    setActiveId(testimonialData[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % testimonialsCount;
    setActiveId(testimonialData[nextIndex].id);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="testimonials-heading">
          <div className="testimonials-heading-main">
            {/* <span className="testimonial-quote-mark testimonial-quote-mark--left">“</span> */}
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
              {/* <span className="testimonial-quote-mark testimonial-quote-mark--right">”</span> */}
              <div className="testimonial-nav">
                <button
                  type="button"
                  className="testimonial-nav__arrow testimonial-nav__arrow--prev"
                  aria-label="Previous testimonial"
                  onClick={handlePrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="testimonial-nav__arrow testimonial-nav__arrow--next"
                  aria-label="Next testimonial"
                  onClick={handleNext}
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
