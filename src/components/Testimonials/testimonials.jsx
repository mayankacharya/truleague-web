import React, { useState } from 'react';
import './testimonials.css';
import AvatarPrimary from '../../assets/OnlySVG/laura.svg';
import AvatarSecondary from '../../assets/OnlySVG/laura.svg';

// 🔥 COMPLETE DATA STRUCTURE: Multiple testimonials per tab
const testimonialData = {
  college: [
    {
      id: 1,
      quote:
        '"The success has led us to expand use of TruLeague across more programs, and to more intentionally integrate it into our recruitment and marketing efforts."',
      name: 'Laura Quinlan',
      role: 'Senior Director of Graduate Admissions',
      organization: 'Simmons University',
      avatar: AvatarPrimary,
    },
    {
      id: 2,
      quote:
        '"TruLeague has become an essential tool in our enrollment strategy."',
      name: 'Dr. Daniel Richer',
      role: 'Executive Director of Enrollment Strategy',
      organization: 'Worcester Polytechnic Institute',
      avatar: AvatarPrimary,
    },
  ],
  student: [
    {
      id: 1,
      quote:
        '"TruLeague helped me connect with current students and get real answers about campus life before making my decision."',
      name: 'Emily Chen',
      role: 'Freshman',
      organization: 'Computer Science',
      avatar: AvatarSecondary,
    },
    {
      id: 2,
      quote:
        '"The community on TruLeague made me feel welcomed even before I arrived on campus. It was invaluable in my decision process."',
      name: 'Michael Rodriguez',
      role: 'Sophomore',
      organization: 'Business Administration',
      avatar: AvatarSecondary,
    },
  ],
};

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('college'); // college or student
  const [currentIndex, setCurrentIndex] = useState(0); // index within current tab

  // Get current tab's testimonials
  const currentTestimonials = testimonialData[activeTab];
  const activeTestimonial = currentTestimonials[currentIndex];
  
  // Check if we're at first/last position
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === currentTestimonials.length - 1;

  // 🔥 TAB SWITCH - Reset index when switching tabs
  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
    setCurrentIndex(0); // Reset to first testimonial of new tab
  };

  // 🔥 ARROW NAVIGATION - Within current tab
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentTestimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
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
            <button
              type="button"
              className={`testimonials-tab ${
                activeTab === 'college' ? 'is-active' : ''
              }`}
              onClick={() => handleTabSwitch('college')}
            >
              College
            </button>
            <button
              type="button"
              className={`testimonials-tab ${
                activeTab === 'student' ? 'is-active' : ''
              }`}
              onClick={() => handleTabSwitch('student')}
            >
              Student
            </button>
          </div>
        </div>

        {/* ===== CARD ===== */}
        <div className="testimonials-card" key={`${activeTab}-${currentIndex}`}>
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
                <p className="testimonial-organization">
                  {activeTestimonial.organization}
                </p>
              </div>
            </div>

            {/* ===== ARROWS - Navigate within current tab ===== */}
            <div className="testimonial-person__controls">
              <div className="testimonial-nav">
                {/* LEFT ARROW - Previous testimonial in current tab */}
                <button
                  type="button"
                  className={`testimonial-nav__arrow testimonial-nav__arrow--prev ${
                    !isFirst ? 'highlight' : ''
                  }`}
                  onClick={handlePrev}
                  disabled={isFirst}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
 
                {/* RIGHT ARROW - Next testimonial in current tab */}
                <button
                  type="button"
                  className={`testimonial-nav__arrow testimonial-nav__arrow--next ${
                    isLast ? 'disabled' : ''
                  }`}
                  onClick={handleNext}
                  disabled={isLast}
                  aria-label="Next testimonial"
                >
                  →
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