import React, { useEffect, useRef, useState } from "react";
import "./GrowEnrollment.css";
import enrollmentSVG from "../assets/OnlySVG/enrollment1.svg";
import aiPowered from "../assets/OnlySVG/AI-powered.svg";
import belong from "../assets/OnlySVG/belonging.svg";
import dummy1 from "../assets/OnlySVG/mwn1.svg";
import dummy2 from "../assets/OnlySVG/avator2.svg";
import poweredByAI from "../assets/OnlySVG/Powered by AI.svg";

const SentimentCard = () => {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
        } else {
          setStart(false);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const veryPositive = useCountUp(96, start);
  const positive = useCountUp(64, start);
  const neutral = useCountUp(8, start);
  const negative = useCountUp(2, start);

  return (
    <div ref={ref} className="sentiment-card">
     <div className="sentiment-header">
  <span>Conversation Sentiment</span>

  <img
    src={poweredByAI}
    alt="Powered by AI"
    className="ai-powered-logo"
  />
</div>


      <div className="sentiment-grid">
        <div className="sentiment-box very">
          Very Positive
          <strong>{veryPositive}%</strong>
        </div>
        <div className="sentiment-box positive">
          Positive
          <strong>{positive}%</strong>
        </div>
        <div className="sentiment-box neutral">
          Neutral
          <strong>{neutral}%</strong>
        </div>
        <div className="sentiment-box negative">
          Negative
          <strong>{negative}%</strong>
        </div>
      </div>

      <div className="sentiment-footer">
        {veryPositive}% of your conversations are positive. <br />
        <span>Follow up on the {negative} negative ones now.</span>
      </div>
    </div>
  );
};

const FosterOverlays = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const interested = useCountUp(1200, show);
  const applied = useCountUp(850, show);
  const enrolled = useCountUp(430, show);

  const interestedPct = (interested / 1200) * 100;
  const appliedPct = (applied / 1200) * 100;
  const enrolledPct = (enrolled / 1200) * 100;

  return (
    <div ref={ref} className={`foster-overlay ${show ? "show" : ""}`}>
      <div className="foster-chat bubble-1">
        Glad to talk to you.<br />
        Let me know if you need help in admissions.
      </div>

      <div className="foster-chat bubble-2">
        Thank you for all your answers.<br />
        Now I have clarity to move forward.
      </div>

      <div className="admission-card">
        <div className="admission-title">Admission Stage</div>

        <div className="admission-row interested">
          <div
            className="admission-fill"
            style={{ width: `${interestedPct}%` }}
          />
          <span className="label">Interested</span>
          <strong>{interested}</strong>
        </div>

        <div className="admission-row applied">
          <div
            className="admission-fill"
            style={{ width: `${appliedPct}%` }}
          />
          <span className="label">Applied</span>
          <strong>{applied}</strong>
        </div>

        <div className="admission-row enrolled">
          <div
            className="admission-fill"
            style={{ width: `${enrolledPct}%` }}
          />
          <span className="label">Enrolled</span>
          <strong>{enrolled}</strong>
        </div>
      </div>
    </div>
  );
};

const useCountUp = (target, start) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }

    let current = 0;
    const step = Math.ceil(target / 40);

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(current);
    }, 25);

    return () => clearInterval(timer);
  }, [target, start]);

  return value;
};

const cards = [
  {
    title: "Inquiry to enrollment",
    points: [
      "Capture stealth applicants early",
      "Full-funnel engagement and conversions",
      "Move students from 'maybe' to 'yes'"
    ],
    image: enrollmentSVG,
    align: "right"
  },
  {
    title: "AI-powered insights",
    points: [
      "Gain real-time enrollment marketing insights",
      "Predict enrollment intent and class",
      "Understand student fit and sentiment"
    ],
    image: aiPowered,
    align: "left"
  },
  {
    title: "Foster belonging & trust",
    points: [
      "Build vibrant admitted student community",
      "Boost yield and reduce melt",
      "Drive retention and career readiness"
    ],
    image: belong,
    align: "right"
  }
];

const gradients = [
  "radial-gradient(83.1% 126.66% at 66.78% 20.84%, #F1F3FF 0%, #CDD4FF 100%)",
  "radial-gradient(66.49% 131.64% at 68.77% 21.16%, #F8F9FF 0%, #E1C8DE 100%)",
  "radial-gradient(83.87% 144.71% at 65.24% 30.7%, #F8F9FF 0%, #DAD3F1 100%)"
];

export default function GrowEnrollment() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 useEffect(() => {
  const onScroll = () => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scroll = Math.max(0, -rect.top);
    const vh = window.innerHeight;

    const rawIndex = scroll / vh;

    // 👇 stable index (NO jump)
    const index = Math.min(
      cards.length - 1,
      Math.floor(rawIndex)
    );

    // 👇 progress tied to SAME index
    const localProgress = rawIndex - index;

    setActiveIndex(index);
    setProgress(Math.min(Math.max(localProgress, 0), 1));
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}, []);


  return (
    <section
      ref={sectionRef}
      className="grow-enrollment"
      style={{ height: `${cards.length * 100}vh` }}
    >
      {/* HEADER */}
      <div className="grow-enrollment__header">
        <h2>Increase Yield and Grow Enrollment</h2>
        <p>
          Yield isn't a moment—it's a relationship. TruLeague builds that
          relationship early, sustaining it through personalized, peer-driven
          engagement and real-time insights.
        </p>
      </div>

      {/* STICKY STAGE */}
      <div className="sticky-stage">
        {cards.map((card, i) => {
          const vh = window.innerHeight;

          let translateY = vh;
          let scale = 1;
          let blur = 0;
          let opacity = 1;
          let zIndex = 1;

          // Mobile-specific animation adjustments
          const EXIT_Y = isMobile ? vh * 0.5 : vh * 0.55; // 🔥 WEB: 0.45 → 0.55
          const ENTER_OFFSET = isMobile ? 80 : 140; // 🔥 WEB: 120 → 140

          if (i < activeIndex) {
  translateY = -EXIT_Y + progress * 40; // 👈 tiny easing
  opacity = 0;
  scale = isMobile ? 0.92 : 0.9;
  zIndex = 0;
}


          if (i === activeIndex) {
            translateY = -progress * EXIT_Y;
            scale = 1 - progress * (isMobile ? 0.06 : 0.1); // 🔥 WEB: 0.08 → 0.1
            blur = progress * (isMobile ? 3 : 4);
            opacity = 1 - progress * (isMobile ? 0.25 : 0.2); // 🔥 WEB: 0.25 → 0.2
            zIndex = 2;
          }

         if (i === activeIndex + 1) {
  const startOffset = vh * 0.92; // 👈 IMPORTANT
  translateY =
    startOffset - progress * (startOffset - ENTER_OFFSET);
  zIndex = 3;
}


          if (i > activeIndex + 1) {
            translateY = vh;
            opacity = 0;
          }

          return (
            <div
              key={i}
              className={`enroll-card ${
                card.align === "left" ? "layout-left" : "layout-right"
              }`}
              style={{
                background: gradients[i % gradients.length],
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex
              }}
            >
              <div
                className={`enroll-card__content ${
                  card.title === "AI-powered insights" ? "content-shift-right" : ""
                } ${
                  card.title === "Foster belonging & trust" ? "foster-content" : ""
                }`}
              >
                <h3>{card.title}</h3>
                <ul className="foster-points">
                  {card.points.map((p, idx) => (
                    <li key={idx} style={{ animationDelay: `${idx * 0.2}s` }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="enroll-card__image">
                <img className="main-image" src={card.image} alt={card.title} />

                {card.title === "Inquiry to enrollment" && (
                  <>
                    <img className="corner-avatar top-left" src={dummy1} alt="" />
                    <img className="corner-avatar bottom-right" src={dummy2} alt="" />
                    <div className={`inquiry-chat-bubble inquiry-reveal`}>
                      <img src={dummy1} alt="" className="chat-avatar" />
                      <p>
                        Keen to know about sport clubs <br />
                        and activities in the college.<br />
                        I am a state level basketball player.
                      </p>
                    </div>
                  </>
                )}

                {card.title === "AI-powered insights" && <SentimentCard />}

                {card.title === "Foster belonging & trust" && <FosterOverlays />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}