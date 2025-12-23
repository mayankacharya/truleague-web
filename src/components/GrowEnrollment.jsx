import React, { useEffect, useRef, useState } from "react";
import "./GrowEnrollment.css";
import enrollmentSVG from "../assets/OnlySVG/enrollment1.svg";
import aiPowered from "../assets/OnlySVG/AI-powered.svg";
import belong from "../assets/OnlySVG/belonging.svg";
import dummy1 from "../assets/OnlySVG/mwn1.svg";
import dummy2 from "../assets/OnlySVG/avator2.svg";


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


const useTypewriter = (text, active, speed = 28) => {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!active) {
      setOutput("");
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, active, speed]);

  return output;
};


const cards = [
  {
    title: "Inquiry to enrollment",
    points: [
      "Capture stealth applicants early",
      "Full-funnel engagement and conversions",
      "Move students from ‘maybe’ to ‘yes’"
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

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scroll = -rect.top;
      const vh = window.innerHeight;

      const index = Math.floor(scroll / vh);
      const localProgress = (scroll % vh) / vh;

      setActiveIndex(Math.max(0, Math.min(index, cards.length - 1)));
      setProgress(Math.max(0, Math.min(localProgress, 1)));
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
          Yield isn’t a moment—it’s a relationship. TruLeague builds that
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

          const EXIT_Y = vh * 0.45;
          const ENTER_OFFSET = 120;

          if (i < activeIndex) {
            translateY = -EXIT_Y;
            scale = 0.9;
            blur = 6;
            opacity = 0;
            zIndex = 0;
          }

          if (i === activeIndex) {
            translateY = -progress * EXIT_Y;
            scale = 1 - progress * 0.08;
            blur = progress * 4;
            opacity = 1 - progress * 0.25;
            zIndex = 2;
          }

          if (i === activeIndex + 1) {
            translateY = vh - ENTER_OFFSET - progress * (vh - ENTER_OFFSET);
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
                filter: `blur(${blur}px)`,
                opacity,
                zIndex
              }}
            >
              <div className="enroll-card__content">
                <h3>{card.title}</h3>
                <ul>
                  {card.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

             <div className="enroll-card__image">
  <img className="main-image" src={card.image} alt={card.title} />

  {/* corner avatars – sirf first card ke liye */}
  {card.title === "Inquiry to enrollment" && (
    <>
      <img className="corner-avatar top-left" src={dummy1} alt="" />
      <img className="corner-avatar bottom-right" src={dummy2} alt="" />
    </>
  )}

   {/* ✅ ONLY AI-powered insights */}
  
</div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
