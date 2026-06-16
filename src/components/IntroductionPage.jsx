import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const IntroductionPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
  {
    title: "Features",
    path: "/features",
    description:
      "Powerful project tracking, task management, team collaboration, analytics, and reporting tools.",
  },
  {
    title: "How it works",
    path: "/how-it-works",
    description:
      "Create projects, assign tasks, monitor progress, and deliver results through a streamlined workflow.",
  },
  {
    title: "Roles",
    path: "/roles",
    description:
      "Separate permissions for Administrators, Project Managers, Team Members, and Clients.",
  },
  {
    title: "About",
    path: "/about",
    description:
      "A modern project management platform built to help organizations plan, collaborate, and succeed.",
  },
];

  return (
    <div className="min-h-screen bg-[#090E1A] flex flex-col overflow-hidden">

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-[5%] h-16 bg-[#090E1A]/85 backdrop-blur-md border-b border-blue-900/20">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm tracking-tight">
            KT
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Kabul<span className="text-orange-500">Track</span>
          </span>
        </Link>

        {/*tooltips*/}

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              <Link
                to={`#${item.title.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-slate-300 font-medium hover:text-white transition-colors duration-200"
              >
                {item.title}
              </Link>

              <div className="absolute left-1/2 top-10 z-50 w-72 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-[#111827] border border-slate-700 rounded-xl p-4 shadow-2xl">
                  <h3 className="font-semibold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-white border border-white/30 rounded-lg hover:border-white/60 hover:bg-white/10 transition-all duration-200"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-200"
          >
            Sign up free
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#0D1526] border-b border-blue-900/20 px-6 py-4 flex flex-col gap-3 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={`#${item.title.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm text-slate-300 font-medium hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <hr className="border-blue-900/20" />
            <Link
              to="/login"
              className="text-sm font-semibold text-white text-center border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold text-white bg-orange-500 px-4 py-2 rounded-lg text-center hover:bg-orange-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Sign up free
            </Link>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-[5%] pt-16 overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            Built for Kabul IT teams
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-5">
            Manage projects.{' '}
            <span className="text-blue-500">Track issues.</span>{' '}
            Ship{' '}
            <span className="text-orange-500">faster.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mb-10">
            KabulTrack helps Kabul IT firms plan sprints, log bugs, assign tasks,
            and ship better software — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link
              to="/signup"
              className="px-7 py-3.5 text-base font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get started for free
            </Link>
            <Link
              to="/login"
              className="px-7 py-3.5 text-base font-semibold text-white border border-white/30 rounded-xl hover:border-white/60 hover:bg-white/[0.06] transition-all duration-200"
            >
              Log in to workspace →
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">500<span className="text-orange-500">+</span></p>
              <p className="text-sm text-slate-500 mt-1">Issues tracked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">12<span className="text-orange-500">+</span></p>
              <p className="text-sm text-slate-500 mt-1">Teams onboarded</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">4<span className="text-orange-500">x</span></p>
              <p className="text-sm text-slate-500 mt-1">Faster sprints</p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <div className="relative z-10 text-center py-6">
        <p className="text-xs text-slate-600">
          © 2025 KabulTrack · Built for Kabul IT teams
        </p>
      </div>

    </div>
  )
}

export default IntroductionPage