import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, FileCheck, MessageSquare, Sun, Moon } from 'lucide-react';
import { Footer } from './Footer';
import { ScholarPathLogo } from './ScholarPathLogo';

export const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('jwt_token'));
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    syncTheme();
    window.addEventListener('themechange', syncTheme);
    return () => window.removeEventListener('themechange', syncTheme);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    fetch('/api/profile')
      .then((res) => {
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('jwt_token');
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
    window.dispatchEvent(new Event('themechange'));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-brand-subtle)]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-surface)]/85 dark:bg-[#0B1F3A]/85 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <ScholarPathLogo variant="full" />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Day/Night Theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="w-9 h-9 rounded-full bg-[var(--color-surface-secondary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center justify-center transition-colors border border-[var(--color-border)] cursor-pointer overflow-hidden relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                  >
                    <Moon className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
                <Link to="/app/readiness" className="sp-btn sp-btn-primary">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="sp-btn sp-btn-primary">
                  <span>Start Your Journey</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Expanded Hero Section */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-start"
            >
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wider uppercase text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Study Abroad Platform
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[48px] sm:text-[64px] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em]"
            >
              Your path to <span className="text-[var(--color-brand)]">higher education abroad.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[var(--color-text-secondary)] text-[18px] leading-relaxed max-w-xl"
            >
              Assess your readiness, discover universities, prepare your documents, and navigate your application journey with AI.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-2"
            >
              <Link
                to={isLoggedIn ? "/app/readiness" : "/register"}
                className="sp-btn sp-btn-primary h-12 px-8 shadow-lg shadow-[var(--color-brand-subtle)]"
              >
                <span>{isLoggedIn ? "Go to Dashboard" : "Start Your Journey"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={isLoggedIn ? "/app/universities" : "/login?redirect=%2Fapp%2Funiversities"}
                className="sp-btn sp-btn-secondary h-12 px-8"
              >
                <span>Explore Universities</span>
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center justify-center relative min-h-[420px] lg:h-[540px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-full max-w-[640px] relative z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 540"
                className="w-full h-auto overflow-visible drop-shadow-sm"
                role="img"
                aria-label="ScholarPathAI dashboard preview"
              >
                <defs>
                  <style>
                    {`
                      .hero-card-bg { fill: #FFFFFF; transition: fill 0.25s ease; }
                      .hero-title { fill: #0B1B3A; transition: fill 0.25s ease; }
                      .hero-subtitle { fill: #6B7A99; transition: fill 0.25s ease; }
                      .hero-label { fill: #3B4B6B; transition: fill 0.25s ease; }
                      .hero-muted { fill: #8A97B3; transition: fill 0.25s ease; }
                      .hero-track { fill: #E6EEFF; transition: fill 0.25s ease; }
                      .hero-ring-track { stroke: #E6EEFF; transition: stroke 0.25s ease; }
                      .hero-badge-bg { fill: #EAF1FF; transition: fill 0.25s ease; }
                      .hero-glow-stop { stop-color: #CFE4FF; }

                      .dark .hero-card-bg { fill: #0F2742; stroke: rgba(255, 255, 255, 0.08); stroke-width: 1px; }
                      .dark .hero-title { fill: #F8FAFC; }
                      .dark .hero-subtitle { fill: #94A3B8; }
                      .dark .hero-label { fill: #CBD5E1; }
                      .dark .hero-muted { fill: #64748B; }
                      .dark .hero-track { fill: #1E3A5F; }
                      .dark .hero-ring-track { stroke: #1E3A5F; }
                      .dark .hero-badge-bg { fill: #1E3A5F; }
                      .dark .hero-glow-stop { stop-color: #1677FF; }

                      @keyframes hero-path-flow {
                        to { stroke-dashoffset: -48; }
                      }
                      .hero-flowing-path {
                        animation: hero-path-flow 3.2s linear infinite;
                      }
                    `}
                  </style>
                  <radialGradient id="hero-glow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" className="hero-glow-stop" stopOpacity="0.85" />
                    <stop offset="1" className="hero-glow-stop" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="hero-blue" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2F7DFF" />
                    <stop offset="1" stopColor="#1259E0" />
                  </linearGradient>
                  <filter id="hero-shadow" x="-20%" y="-20%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#1F6BFF" floodOpacity="0.18" />
                  </filter>
                </defs>

                {/* Glow */}
                <circle cx="320" cy="270" r="270" fill="url(#hero-glow)" />

                {/* Flowing Dotted journey path */}
                <path
                  d="M60 470 C 40 330, 110 250, 90 130"
                  fill="none"
                  stroke="#1F6BFF"
                  strokeOpacity="0.45"
                  strokeWidth="3"
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                  className="hero-flowing-path"
                />

                {/* Main card: readiness (gentle breathing motion) */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <g filter="url(#hero-shadow)">
                    <rect x="100" y="120" width="420" height="290" rx="26" className="hero-card-bg" />
                  </g>
                  <text x="130" y="160" fontSize="16" fontWeight="700" className="hero-title">
                    Readiness Score
                  </text>
                  <text x="130" y="180" fontSize="12" className="hero-subtitle">
                    Based on your profile
                  </text>

                  <circle cx="195" cy="290" r="52" fill="none" className="hero-ring-track" strokeWidth="12" />
                  <motion.circle
                    cx="195"
                    cy="290"
                    r="52"
                    fill="none"
                    stroke="url(#hero-blue)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    transform="rotate(-90 195 290)"
                    initial={{ strokeDasharray: "0 327" }}
                    animate={{ strokeDasharray: "268 59" }}
                    transition={{ duration: 1.4, delay: 0.25, ease: "easeOut" }}
                  />
                  <text x="195" y="299" textAnchor="middle" fontSize="26" fontWeight="800" className="hero-title">
                    82%
                  </text>

                  <g fontSize="12" className="hero-label">
                    <text x="290" y="238">Academics</text>
                    <text x="290" y="276">English test</text>
                    <text x="290" y="314">Finances</text>
                    <text x="290" y="352">Documents</text>
                  </g>
                  <g className="hero-track">
                    <rect x="290" y="246" width="200" height="8" rx="4" />
                    <rect x="290" y="284" width="200" height="8" rx="4" />
                    <rect x="290" y="322" width="200" height="8" rx="4" />
                    <rect x="290" y="360" width="200" height="8" rx="4" />
                  </g>
                  <g fill="url(#hero-blue)">
                    <motion.rect
                      x="290" y="246" height="8" rx="4"
                      initial={{ width: 0 }}
                      animate={{ width: 176 }}
                      transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                    />
                    <motion.rect
                      x="290" y="284" height="8" rx="4"
                      initial={{ width: 0 }}
                      animate={{ width: 150 }}
                      transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
                    />
                    <motion.rect
                      x="290" y="322" height="8" rx="4"
                      initial={{ width: 0 }}
                      animate={{ width: 136 }}
                      transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
                    />
                    <motion.rect
                      x="290" y="360" height="8" rx="4"
                      initial={{ width: 0 }}
                      animate={{ width: 180 }}
                      transition={{ duration: 1.1, delay: 0.75, ease: "easeOut" }}
                    />
                  </g>
                </motion.g>

                {/* Top-right card: university match (parallax floating) */}
                <motion.g
                  initial={{ opacity: 0, x: 16, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: [0, -9, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.35 },
                    x: { duration: 0.5, delay: 0.35 },
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <g filter="url(#hero-shadow)">
                    <rect x="400" y="48" width="205" height="84" rx="18" className="hero-card-bg" />
                  </g>
                  <circle cx="434" cy="90" r="20" className="hero-badge-bg" />
                  <text x="434" y="95" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1F6BFF">
                    UT
                  </text>
                  <text x="466" y="78" fontSize="11" className="hero-subtitle">
                    Best match
                  </text>
                  <text x="466" y="98" fontSize="14" fontWeight="700" className="hero-title">
                    Univ. of Toronto
                  </text>
                  <text x="466" y="116" fontSize="11" fontWeight="600" fill="#1F6BFF">
                    92% match · Canada
                  </text>
                </motion.g>

                {/* Bottom-left card: documents (offset parallax floating) */}
                <motion.g
                  initial={{ opacity: 0, x: -16, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.5 },
                    x: { duration: 0.5, delay: 0.5 },
                    y: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
                  }}
                >
                  <g filter="url(#hero-shadow)">
                    <rect x="30" y="392" width="215" height="120" rx="18" className="hero-card-bg" />
                  </g>
                  <text x="52" y="420" fontSize="13" fontWeight="700" className="hero-title">
                    Documents
                  </text>
                  <circle cx="60" cy="446" r="8" fill="#1F6BFF" />
                  <path
                    d="M56 446 l3 3 l5 -6"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="78" y="450" fontSize="12" className="hero-label">
                    Statement of purpose
                  </text>
                  <circle cx="60" cy="474" r="8" fill="#1F6BFF" />
                  <path
                    d="M56 474 l3 3 l5 -6"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="78" y="478" fontSize="12" className="hero-label">
                    Transcripts
                  </text>
                  <circle cx="60" cy="500" r="7" fill="none" stroke="#C5D1E8" strokeWidth="2" />
                  <text x="78" y="504" fontSize="12" className="hero-muted">
                    IELTS score
                  </text>
                </motion.g>

                {/* Bottom-right: AI chat bubble (floating & subtle bounce) */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.9, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.65 },
                    scale: { duration: 0.5, delay: 0.65 },
                    y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                  }}
                >
                  <g filter="url(#hero-shadow)">
                    <rect x="360" y="428" width="250" height="78" rx="20" fill="url(#hero-blue)" />
                  </g>
                  <polygon points="392,504 384,520 412,504" fill="#1259E0" />
                  <path
                    d="M388 452 l2.4 6.4 l6.4 2.4 l-6.4 2.4 l-2.4 6.4 l-2.4 -6.4 l-6.4 -2.4 l6.4 -2.4 Z"
                    fill="#FFFFFF"
                  />
                  <text x="408" y="458" fontSize="13" fontWeight="700" fill="#FFFFFF">
                    Your SOP draft is ready
                  </text>
                  <text x="408" y="478" fontSize="12" fill="#FFFFFF" fillOpacity="0.85">
                    Want me to refine it?
                  </text>
                </motion.g>

                {/* Top-left badge: cap */}
                <motion.g
                  animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "66px 92px" }}
                >
                  <g filter="url(#hero-shadow)">
                    <circle cx="66" cy="92" r="32" className="hero-card-bg" />
                  </g>
                  <polygon points="42,88 66,76 90,88 66,100" fill="url(#hero-blue)" />
                  <path
                    d="M54 96 V108 C54 116 78 116 78 108 V96"
                    fill="none"
                    stroke="#1259E0"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path d="M90 88 V104" stroke="#FCB92B" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="90" cy="106" r="3.5" fill="#FCB92B" />
                </motion.g>

                {/* Twinkling Sparkles */}
                <motion.path
                  d="M570 190 l4 11 l11 4 l-11 4 l-4 11 l-4 -11 l-11 -4 l11 -4 Z"
                  fill="#FCB92B"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "570px 205px" }}
                />
                <circle cx="560" cy="330" r="5" fill="#1F6BFF" fillOpacity="0.4" />
                <circle cx="40" cy="260" r="6" fill="#1F6BFF" fillOpacity="0.25" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <Link to={isLoggedIn ? "/app/universities" : "/login?redirect=%2Fapp%2Funiversities"} className="block group">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sp-card-elevated p-8 h-full group-hover:border-[var(--color-brand-muted)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-[var(--color-brand)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-brand)] transition-colors">University Explorer</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">Discover top universities across the globe, filtered strictly by your desired intake, requirements, and budget constraints.</p>
            </motion.div>
          </Link>

          <Link to={isLoggedIn ? "/app/docstudio" : "/login?redirect=%2Fapp%2Fdocstudio"} className="block group">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="sp-card-elevated p-8 h-full group-hover:border-[var(--color-brand-muted)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-[var(--color-brand)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-[var(--color-brand)] transition-colors">
                Document Studio 
                <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">Let AI audit your Statement of Purpose and resume. Get instant feedback on grammar, impact, and readiness.</p>
            </motion.div>
          </Link>

          <Link to={isLoggedIn ? "/app/visa" : "/login?redirect=%2Fapp%2Fvisa"} className="block group">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="sp-card-elevated p-8 h-full group-hover:border-[var(--color-brand-muted)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-[var(--color-brand)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-[var(--color-brand)] transition-colors">
                Visa Mock Interviews
                <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">Practice with our interactive AI Visa Officer. Receive live transcripts, confidence scores, and instant feedback.</p>
            </motion.div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
