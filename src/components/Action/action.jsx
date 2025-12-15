import { useEffect, useRef, useState } from 'react'
import './action.css'
import rocketIcon from '../../assets/OnlySVG/rocket1.svg'

const Action = () => {
  const firstLineWords = ['Transform', 'your', 'students', 'journey']
  const secondLineWords = ['From', 'first', 'click', 'to', 'first', 'class.']
  const sectionRef = useRef(null)
  const [animateWords, setAnimateWords] = useState(false)

  // refs for cursor trail
  const trailRef = useRef(null) // DOM element
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const isInsideRef = useRef(false)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimateWords(entry.isIntersecting)
      },
      {
        threshold: 0.5,
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // --- cursor trail logic ---
  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const handlePointerMove = (e) => {
      // get coordinates relative to section
      const rect = sectionEl.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      targetRef.current.x = x
      targetRef.current.y = y
    }

    const handleEnter = (e) => {
      isInsideRef.current = true
      if (trailRef.current) trailRef.current.style.opacity = '1'
      // initialize positions to avoid jump
      const rect = sectionEl.getBoundingClientRect()
      targetRef.current.x = e.clientX - rect.left
      targetRef.current.y = e.clientY - rect.top
      currentRef.current.x = targetRef.current.x
      currentRef.current.y = targetRef.current.y
    }

    const handleLeave = () => {
      isInsideRef.current = false
      if (trailRef.current) trailRef.current.style.opacity = '0'
    }

    // pointer events
    sectionEl.addEventListener('pointermove', handlePointerMove)
    sectionEl.addEventListener('pointerenter', handleEnter)
    sectionEl.addEventListener('pointerleave', handleLeave)

    // animation loop: smooth follow using linear interpolation
    const ease = 0.18 // lower = more lag, higher = quicker follow
    const step = () => {
      const cur = currentRef.current
      const tgt = targetRef.current
      // lerp
      cur.x += (tgt.x - cur.x) * ease
      cur.y += (tgt.y - cur.y) * ease

      if (trailRef.current) {
        // position the dot
        trailRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      sectionEl.removeEventListener('pointermove', handlePointerMove)
      sectionEl.removeEventListener('pointerenter', handleEnter)
      sectionEl.removeEventListener('pointerleave', handleLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const wordStyle = (index) => {
    const delay = `${index * 0.25}s`
    return animateWords
      ? {
          animation: `wordColor 0.8s ease ${delay} forwards`,
        }
      : {
          animation: 'none',
          color: '#9ea1ba',
        }
  }

  return (
    <section className="action-section" ref={sectionRef}>
      {/* trailing dot element */}
      <div
        ref={trailRef}
        className="cursor-trail"
        aria-hidden="true"
        // start hidden (opacity 0) — JS will toggle opacity on enter/leave
        style={{ opacity: 0 }}
      />

      <div className="action-card">
        <p className="action-text">
          <span className="action-text-line">
            {firstLineWords.map((word, index) => (
              <span
                key={`line1-${index}`}
                className="action-text-word"
                style={wordStyle(index)}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="action-text-line">
            {secondLineWords.map((word, index) => (
              <span
                key={`line2-${index}`}
                className="action-text-word"
                style={wordStyle(index + firstLineWords.length)}
              >
                {word}
              </span>
            ))}
          </span>
        </p>
        <button type="button" className="action-cta">
          <span className="action-cta__text">See TruLeague in Action</span>
          <span className="action-cta__badge">
            <img
              className="action-cta__badge-icon"
              src={rocketIcon}
              alt="rocket icon"
            />
          </span>
        </button>
      </div>
    </section>
  )
}

export default Action
