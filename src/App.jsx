
import React, { lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import './App.css'

const BuddyCards = lazy(() => import('./components/BuddyCards'))
const GrowEnrollment = lazy(() => import('./components/GrowEnrollment'))
const IntegratedDashboard = lazy(() => import('./components/IntegratedDashboard'))
const Lead = lazy(() => import('./components/lead/lead'))
const Insights = lazy(() => import('./components/Insights/Insights'))
const Head = lazy(() => import('./components/universities-head/head'))
const Testimonials = lazy(() => import('./components/Testimonials/testimonials'))
const Action = lazy(() => import('./components/Action/action'))
const Footer = lazy(() => import('./components/Footer/footer'))

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Suspense fallback={<div className="app__skeleton" aria-live="polite">Loading section…</div>}>
        <BuddyCards />
        <GrowEnrollment />
        <IntegratedDashboard />
        <Lead />
        <Insights />
        <Head />
        <Testimonials />
        <Action />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
