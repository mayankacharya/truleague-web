import React, { useEffect, useRef, useState } from 'react'
import iconInsights from '../../assets/OnlySVG/Frame1.svg'
import iconInsights1 from '../../assets/OnlySVG/Frame2.svg'
import iconInsights2 from '../../assets/OnlySVG/Frame3.svg'
import './lead.css'

const metrics = [
  {
    label: 'increase in yield optimization',
    value: '15–25%',
    target: 25,
    suffix: '%',
    icon: iconInsights
  },
  {
    label: 'reduction in summer melt',
    value: '30%',
    target: 30,
    suffix: '%',
    icon: iconInsights1
  },
  {
    label: 'in retention & student satisfaction',
    value: 'XX%',
    target: 48,
    suffix: '%',
    icon: iconInsights2
  }
]

const Lead = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState(metrics.map(() => 0))
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.5
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    let rafId

    if (!isVisible) {
      setCounts(metrics.map(() => 0))
      setIsCounting(false)
      return undefined
    }

    setIsCounting(true)
    const duration = 1400
    const startTime = performance.now()

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCounts(
        metrics.map(metric => Math.round(metric.target * progress))
      )
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setIsCounting(false)
      }
    }

    rafId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  const getDisplayValue = (index) => {
    if (isCounting) {
      const suffix = metrics[index].suffix ?? ''
      return `${counts[index]}${suffix}`
    }
    return metrics[index].value
  }

  return (
    <section className="lead-impact" ref={sectionRef}>
      <div className="lead-impact__content">
        <p className="lead-impact__title">Proven impact for institutions that lead</p>
        <div className="lead-impact__metrics">
          {metrics.map((metric, index) => (
            <div className="lead-impact__metric" key={metric.label}>
              <img className="lead-impact__icon" src={metric.icon} alt={`${metric.label} icon`} />
              <div>
                <strong>{getDisplayValue(index)}</strong>
                <p>{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Lead
