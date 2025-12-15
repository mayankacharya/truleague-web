import React, { useEffect, useMemo, useRef, useState } from 'react'
import './GrowEnrollment.css'
import inquirySVG from '../assets/OnlySVG/enrollment1.svg'
import aiInsightsSVG from '../assets/OnlySVG/AI-powered.svg'
import belongingSVG from '../assets/OnlySVG/belonging.svg'
import veryPositiveSVG from '../assets/OnlySVG/verypositive01.svg'
import PositiveSVG from '../assets/OnlySVG/positive.svg'
import neaturlSVG from '../assets/OnlySVG/neaturl.svg'
import negativeSVG from '../assets/OnlySVG/negative.svg'
import aiPoweredIcon from '../assets/OnlySVG/Powered by AI.svg'



const blockData = [
  {
    id: 'inquiry',
    title: 'Inquiry to enrollment',
    // subtitle: 'Turn early interest into full applications by giving every prospect a confident next step.',
    align: 'left',
    lines: [
      'Capture stealth applicants early',
      'Full-full engagement and conversions',
      'Move students from ‘maybe’ to ‘yes’',
    ],
    image: inquirySVG,
  },
  {
    id: 'insights',
    title: 'AI-powered insights',
    // subtitle: 'Understand patterns across leads so counselors can act faster on the right students.',
    align: 'right',
    lines: [
      'Gain real-time enrollment marketing insights',
      'Predict enrollment intent and class',
      'Understand student fit and sentiment',
    ],
    image: 'https://placehold.co/260x220?text=Insights',
  },
  {
    id: 'belonging',
    title: 'Foster belonging & trust',
    // subtitle: 'Keep admitted students energized with community touchpoints that reinforce their choice.',
    align: 'left',
    lines: [
      'Build vibrant admitted student community',
      'Boost yield and reduce melt',
      'Drive retention and career readiness',
    ],
    image: belongingSVG,
  },
]

const belongingMessages = [
  {
    id: 'counselor',
    text: 'Glad to talk to you. Let me know if you need help in admissions.',
    align: 'left',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80',
    avatarAlt: 'Admissions counselor portrait',
  },
  {
    id: 'student',
    text: 'Thank you for all your answers. Now I have clarity to move forward.',
    align: 'right',
    avatar:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=160&q=80',
    avatarAlt: 'Prospective student portrait',
  },
]

const admissionStages = [
  { id: 'interested', label: 'Interested', value: 1200 },
  { id: 'applied', label: 'Applied', value: 850 },
  { id: 'enrolled', label: 'Enrolled', value: 430 },
]

const mediaOverrides = {
  insights: aiInsightsSVG,
}

const inquiryPortrait =
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80'
const inquiryQuoteLines = [
  'Keen to know about sport clubs and activities in the college.',
  'I am a state level basketball player.',
]

const sentimentMetrics = [
  { label: 'Very Positive', value: 96, tone: 'positive', icon: '🚀' },
  { label: 'Positive', value: 64, tone: 'positive', icon: '😊' },
  { label: 'Neutral', value: 8, tone: 'neutral', icon: '👌' },
  { label: 'Negative', value: 2, tone: 'negative', icon: '⚠️' },
]

const useCountUpArray = (targets, isActive) => {
  const [counts, setCounts] = useState(() => targets.map(() => 0))

  useEffect(() => {
    if (!isActive) {
      setCounts(() => targets.map(() => 0))
      return undefined
    }

    setCounts(() => targets.map(() => 0))
    const timers = targets.map((target, index) => {
      let current = 0
      const duration = 850
      const stepTime = 25
      const steps = Math.max(1, Math.round(duration / stepTime))
      const increment = target / steps

      const timer = setInterval(() => {
        current = Math.min(target, current + increment)
        setCounts((prev) => {
          if (prev[index] === target) {
            return prev
          }
          const next = [...prev]
          next[index] = Math.round(current)
          return next
        })

        if (current >= target) {
          clearInterval(timer)
        }
      }, stepTime)

      return timer
    })

    return () => timers.forEach((timer) => clearInterval(timer))
  }, [isActive, targets])

  return counts
}

const SentimentCard = ({ isActive }) => {
  const targetValues = useMemo(
    () => sentimentMetrics.map((m) => m.value),
    []
  )
  const counts = useCountUpArray(targetValues, isActive)

  return (
    <div className="conversation-sentiment">
      <div className="conversation-sentiment__header">
        <div className="conversation-sentiment__title">
          Conversation Sentiment <span className="chevron">▼</span>
        </div>
        <div className="conversation-sentiment__ai">
  <img
    src={aiPoweredIcon}
    alt="AI Powered"
    className="conversation-sentiment__ai-icon"
  />
</div>

      </div>

      <div className="conversation-sentiment__grid">
        <div className="sentiment-box very-positive">
          <div className="sentiment-box__top">
            <span>Very Positive</span>
            <img
           src={veryPositiveSVG}
           alt="Positive"
           className="sentiment-box__icon"
           />

          </div>
          <div className="sentiment-box__value">{counts[0]}</div>
        </div>

        <div className="sentiment-box positive">
          <div className="sentiment-box__top">
            <span>Positive</span>
            <img
           src={PositiveSVG}
           alt="Positive"
           className="sentiment-box__icon"
           />
          </div>
          <div className="sentiment-box__value">{counts[1]}</div>
        </div>

        <div className="sentiment-box neutral">
          <div className="sentiment-box__top">
            <span>Neutral</span>
            <img
           src={neaturlSVG}
           alt="Positive"
           className="sentiment-box__icon"
           />
          </div>
          <div className="sentiment-box__value">{counts[2]}</div>
        </div>

        <div className="sentiment-box negative">
          <div className="sentiment-box__top">
            <span>Negative</span>
            <img
           src={negativeSVG}
           alt="Positive"
           className="sentiment-box__icon"
           />
          </div>
          <div className="sentiment-box__value">{counts[3]}</div>
        </div>
      </div>
    </div>
  )
}

const useWordReveal = (length, isActive) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setCount(0)
      return undefined
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 120)

    return () => clearInterval(interval)
  }, [isActive, length])

  return count
}

const SentimentFooter = ({ isActive = true }) => {
  const line1 = '96% of your conversations are positive.'
  const line2 = 'Follow up on the 2 negative ones now.'

  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setText1('')
      setText2('')
      setStep(0)
      return
    }

    let i = 0
    const interval1 = setInterval(() => {
      setText1(line1.slice(0, i + 1))
      i++
      if (i === line1.length) {
        clearInterval(interval1)
        setTimeout(() => setStep(1), 350)
      }
    }, 28)

    return () => clearInterval(interval1)
  }, [isActive])

  useEffect(() => {
    if (step !== 1) return

    let j = 0
    const interval2 = setInterval(() => {
      setText2(line2.slice(0, j + 1))
      j++
      if (j === line2.length) {
        clearInterval(interval2)
      }
    }, 28)

    return () => clearInterval(interval2)
  }, [step])

  return (
    <div className="sentiment-footer-figma">
      <p className="sentiment-footer-figma__line sentiment-footer-figma__line--primary">
        {text1}
        <span className="typing-caret" />
      </p>

      {step >= 1 && (
        <p className="sentiment-footer-figma__line sentiment-footer-figma__line--alert">
          {text2}
          <span className="typing-caret" />
        </p>
      )}
    </div>
  )
}



const useStaggeredReveal = (length, isActive, delay = 900, initialDelay = 200) => {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!isActive || length <= 0) {
      setVisibleCount(0)
      return undefined
    }

    setVisibleCount(0)
    const timers = Array.from({ length }, (_, index) => {
      return setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, index + 1))
      }, initialDelay + index * delay)
    })

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [isActive, delay, initialDelay, length])

  return visibleCount
}

const BelongingOverlay = ({ isActive }) => {
  const visibleCount = useStaggeredReveal(belongingMessages.length, isActive, 950, 150)
  const stageTargets = useMemo(() => admissionStages.map((stage) => stage.value), [])
  const stageValues = useCountUpArray(stageTargets, isActive)
  const stageGoal = 1500

  return (
    <div className="belonging-overlay">
      <div className="belonging-messages">
        {belongingMessages.map((message, index) => {
          if (index >= visibleCount) {
            return null
          }
          return (
            <div
              key={message.id}
              className={`belonging-message belonging-message--${message.align}`}
            >
              {message.avatar && (
                <span className="belonging-message__avatar" aria-hidden="true">
                  <img src={message.avatar} alt={message.avatarAlt ?? ''} loading="lazy" />
                </span>
              )}
              <p className="belonging-message__text">{message.text}</p>
            </div>
          )
        })}
      </div>
      <div className="admission-stage-card">
        <p className="admission-stage-card__title">
          Admission Stage
          <span className="admission-stage-card__marker" aria-hidden="true">
            ▼
          </span>
        </p>
        {admissionStages.map((stage, index) => {
          const value = stageValues[index] ?? 0
          const widthPercent = Math.min((value / stageGoal) * 100, 100)

          return (
            <div
              key={stage.id}
              className={`admission-stage-card__row admission-stage-card__row--${stage.id}`}
            >
              <div className="admission-stage-card__label-row">
                <span className="admission-stage-card__label">{stage.label}</span>
                <strong className="admission-stage-card__value">{value}</strong>
              </div>
              <div className="admission-stage-card__bar">
                <div
                  className="admission-stage-card__fill"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

 const useTypewriter = (lines, isActive) => {
  const [revealedLines, setRevealedLines] = useState([])
  const [activeLine, setActiveLine] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setRevealedLines([])
      setActiveLine(0)
      return
    }

    if (activeLine >= lines.length) return

    const timer = setTimeout(() => {
      setRevealedLines((prev) => [...prev, lines[activeLine]])
      setActiveLine((prev) => prev + 1)
    }, 700 + activeLine * 150) // natural reading delay

    return () => clearTimeout(timer)
  }, [activeLine, isActive, lines])

  return {
    revealedLines,
    activeLine,
  }
}






const InquiryQuote = ({ isActive }) => {
  const wordLines = useMemo(() => inquiryQuoteLines.map((line) => line.split(' ')), [])
  const totalWords = wordLines.reduce((sum, words) => sum + words.length, 0)
  const revealedCount = useWordReveal(totalWords, isActive)

  let wordPointer = 0
  return (
    <>
      {wordLines.map((words, lineIndex) => {
        const startIndex = wordPointer
        const remaining = Math.max(0, revealedCount - wordPointer)
        const showCount = Math.min(words.length, remaining)
        const visibleWords = words.slice(0, showCount)
        wordPointer += words.length

        return (
          <p key={`line-${lineIndex}`} className="inquiry-badge__line">
            {visibleWords.map((word, wordIdx) => (
              <span
                key={`${word}-${startIndex + wordIdx}`}
                className="inquiry-badge__word"
                style={{ animationDelay: `${(startIndex + wordIdx) * 60}ms` }}
              >
                {word}
              </span>
            ))}
          </p>
        )
      })}
    </>
  )
}

const EnrollmentBlock = ({
  block,
  isActive,
  setRef,
  scrollDirection,
  index,
  activeIndex,
  progress: progressProp,
}) => {
  const shouldAnimate = isActive || index === 0
const { revealedLines, activeLine } = useTypewriter(block.lines, shouldAnimate)
  const stackClass = isActive
    ? 'stack-active'
    : index < activeIndex
    ? 'stack-past'
    : 'stack-next'
  const depth = Math.abs(index - activeIndex)
  const zIndex = isActive ? 1200 : 900 - depth * 50
  const directionClass = `direction-${scrollDirection}`
  const progress = Math.max(0, Math.min(1, progressProp ?? 0))
  let dynamicOpacity = 1
  let dynamicFilter = 'none'

  if (!isActive) {
    if (stackClass === 'stack-next') {
      dynamicOpacity = 0.45 + progress * 0.5
      const grayscale = Math.max(0, 0.35 - progress * 0.35)
      dynamicFilter = `saturate(${0.75 + progress * 0.25}) brightness(${0.85 + progress * 0.15}) grayscale(${grayscale})`
    } else {
      dynamicOpacity = 0.2 + progress * 0.55
      const grayscale = Math.max(0, 0.55 - progress * 0.45)
      dynamicFilter = `saturate(${0.6 + progress * 0.4}) brightness(${0.9 + progress * 0.08}) grayscale(${grayscale})`
    }
  }

  return (
    <article
      ref={setRef}
      data-block-id={block.id}
      data-block-index={index}
      className={`grow-block ${isActive ? 'active' : ''} ${stackClass} align-${
        block.align ?? 'left'
      } ${directionClass}`}
      style={{ zIndex, opacity: dynamicOpacity, filter: dynamicFilter }}
    >
      <div className="grow-block__media">
        <img src={mediaOverrides[block.id] ?? block.image} alt={block.title} loading="lazy" />
        {block.id === 'belonging' && <BelongingOverlay isActive={isActive} />}
        {block.id === 'insights' && (
          <>
            <SentimentCard isActive={isActive} />
            <SentimentFooter isActive={isActive} />
          </>
        )}
        {block.id === 'inquiry' && (
          <>
            <span className="inquiry-avatar avatar-one" />
            <span className="inquiry-avatar avatar-two" />
            <div className="inquiry-badge">
              <div className="inquiry-badge__body">
                <div className="inquiry-badge__avatar">
                  <img src={inquiryPortrait} alt="Student portrait" loading="lazy" />
                </div>
                <div className="inquiry-badge__text">
                  <InquiryQuote isActive={isActive} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="grow-block__content">
        <h3>{block.title}</h3>
        <p className="grow-block__subtitle">{block.subtitle}</p>
       <div className="grow-block__lines">
  {block.lines.map((line, index) => {
    const isRevealed = index < revealedLines.length
    const isActive = index === activeLine

    return (
      <p
        key={index}
        className={`reveal-line ${isRevealed ? 'is-visible' : ''} ${
          isActive ? 'is-active' : ''
        }`}
      >
        <span className="reveal-line__text">{line}</span>
      </p>
    )
  })}
</div>


      </div>
    </article>
  )
}

const GrowEnrollment = () => {
  const [activeBlock, setActiveBlock] = useState(blockData[0].id)
  const [activeIndex, setActiveIndex] = useState(0)
  const blockRefs = useRef([])
  const [scrollDirection, setScrollDirection] = useState('down')
  const directionRef = useRef('down')
  const [highlightProgress, setHighlightProgress] = useState(() => blockData.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length === 0) {
          return
        }

        const viewportCenter = (window.innerHeight || 0) / 2
        const primaryPick = visibleEntries.reduce((best, entry) => {
          const entryCenter =
            entry.boundingClientRect.top + entry.boundingClientRect.height / 2
          const distance = Math.abs(entryCenter - viewportCenter)

          if (!best || distance < best.distance) {
            return { entry, distance }
          }

          return best
        }, null)
        const primary = primaryPick ? primaryPick.entry : visibleEntries[0]

        setActiveBlock(primary.target.dataset.blockId)
        setActiveIndex(Number(primary.target.dataset.blockIndex))
      },
      { threshold: 0.25, rootMargin: '-30px 0px -40px 0px' }
    )

    blockRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node)
      }
    })

    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let prevScrollY = window.scrollY || 0
    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0
      if (currentScrollY > prevScrollY && directionRef.current !== 'down') {
        directionRef.current = 'down'
        setScrollDirection('down')
      } else if (currentScrollY < prevScrollY && directionRef.current !== 'up') {
        directionRef.current = 'up'
        setScrollDirection('up')
      }
      prevScrollY = currentScrollY

      const viewportCenter = (window.innerHeight || 0) / 2
      const maxDistance = Math.max(120, (window.innerHeight || 0) * 1.4)
      const newProgress = blockData.map((_, index) => {
        const node = blockRefs.current[index]
        if (!node) {
          return 0
        }

        const rect = node.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const distance = Math.abs(center - viewportCenter)
        const raw = 1 - distance / maxDistance
        return Math.max(0, Math.min(1, raw))
      })

      setHighlightProgress(newProgress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="grow-enrollment">
      <div className="grow-enrollment__header">
        {/* <p className="eyebrow">Increase yield and grow enrollment</p> */}
        <h2>Increase Yield and Grow Enrollment</h2>
        <p>
         Yield isn’t a moment—it’s a relationship. TruLeague builds that relationship early, sustaining it through personalized, peer-driven engagement and real-time insights.
        </p>
      </div>

      <div className="grow-enrollment__blocks">
        {blockData.map((block, index) => (
          <EnrollmentBlock
            key={block.id}
            block={block}
            isActive={activeBlock === block.id}
            setRef={(el) => {
              blockRefs.current[index] = el
            }}
            scrollDirection={scrollDirection}
            index={index}
            activeIndex={activeIndex}
            progress={highlightProgress[index] ?? 0}
          />
        ))}
      </div>
    </section>
  )
}

export default GrowEnrollment
