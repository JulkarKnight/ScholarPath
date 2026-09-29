import React from 'react';
import { motion } from 'motion/react';

export interface ScholarPathLogoProps {
  variant?: 'full' | 'icon' | 'monochrome';
  className?: string;
}

export const ScholarPathLogo: React.FC<ScholarPathLogoProps> = ({ variant = 'full', className = '' }) => {
  const isIcon = variant === 'icon';
  const isMono = variant === 'monochrome';

  return (
    <motion.div
      className={`relative inline-flex items-center gap-3 ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <svg 
        width={isIcon ? "32" : "40"} 
        height={isIcon ? "32" : "40"} 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
      >
        {!isMono && (
          <style>
            {`
              .theme-bg-start { stop-color: #4F46E5; }
              .theme-bg-mid { stop-color: #2563EB; }
              .theme-bg-end { stop-color: #06B6D4; }
              .theme-orbit { stroke: #FFFFFF; }
              .theme-path-shadow { stroke: #3B5BE0; }
              .theme-cap-bg { fill: #FFFFFF; stroke: #FFFFFF; }
              .theme-cap-shadow { fill: #DCE6FF; }
              .theme-cap-line { stroke: #3B5BE0; }
              .theme-globe-fill { fill: #FFFFFF; }
              .theme-globe-lines { stroke: #2563EB; }
              .theme-spark-fill { fill: #FCD34D; }
              .theme-spark-stroke { stroke: #FCD34D; }

              .dark .theme-bg-start { stop-color: #312E81; }
              .dark .theme-bg-mid { stop-color: #1E3A8A; }
              .dark .theme-bg-end { stop-color: #164E63; }
              .dark .theme-orbit { stroke: #9CA3AF; }
              .dark .theme-path-shadow { stroke: #1E3A8A; }
              .dark .theme-cap-bg { fill: #F3F4F6; stroke: #F3F4F6; }
              .dark .theme-cap-shadow { fill: #9CA3AF; }
              .dark .theme-cap-line { stroke: #1E3A8A; }
              .dark .theme-globe-fill { fill: #F3F4F6; }
              .dark .theme-globe-lines { stroke: #1E3A8A; }
              .dark .theme-spark-fill { fill: #FBBF24; }
              .dark .theme-spark-stroke { stroke: #FBBF24; }
            `}
          </style>
        )}
        {!isMono && (
          <defs>
            <linearGradient id="tile-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" className="theme-bg-start" />
              <stop offset="0.6" className="theme-bg-mid" />
              <stop offset="1" className="theme-bg-end" />
            </linearGradient>
            <linearGradient id="shine-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22"/>
              <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        )}

        {isMono ? (
          <rect x="16" y="16" width="480" height="480" rx="120" fill="currentColor" fillOpacity="0.1"/>
        ) : (
          <>
            <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#tile-grad)"/>
            <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#shine-grad)"/>
          </>
        )}

        <ellipse cx="256" cy="290" rx="185" ry="64" transform="rotate(-18 256 290)"
                 fill="none" stroke={isMono ? "currentColor" : ""} className={isMono ? "opacity-30" : "theme-orbit"} strokeOpacity={isMono ? 1 : 0.3} strokeWidth="6" strokeDasharray="2 14" strokeLinecap="round"/>

        <path d="M256 262 C256 312 180 322 200 364 C218 402 310 368 338 404"
              fill="none" stroke={isMono ? "currentColor" : ""} className={isMono ? "opacity-20" : "theme-orbit"} strokeWidth="30" strokeLinecap="round"/>
        
        <path d="M256 262 C256 312 180 322 200 364 C218 402 310 368 338 404"
              fill="none" stroke={isMono ? "currentColor" : ""} className={isMono ? "" : "theme-path-shadow"} strokeWidth="4" strokeDasharray="3 12" strokeLinecap="round"/>

        <circle cx="352" cy="414" r="38" fill={isMono ? "currentColor" : ""} className={isMono ? "" : "theme-globe-fill"}/>
        <g fill="none" stroke={isMono ? "var(--color-bg)" : ""} className={isMono ? "" : "theme-globe-lines"} strokeWidth="5" strokeLinecap="round">
          <ellipse cx="352" cy="414" rx="16" ry="38"/>
          <path d="M314 414 H390"/>
          <path d="M322 393 H382 M322 435 H382" strokeOpacity="0.6"/>
        </g>

        <polygon points="96,190 256,116 416,190 256,264" fill={isMono ? "currentColor" : ""} stroke={isMono ? "currentColor" : ""} className={isMono ? "" : "theme-cap-bg"} strokeWidth="14" strokeLinejoin="round"/>
        <polygon points="256,116 416,190 256,264" fill={isMono ? "currentColor" : ""} className={isMono ? "opacity-30" : "theme-cap-shadow"}/>
        <path d="M256 150 L350 190 L256 230 L162 190 Z" fill="none" stroke={isMono ? "currentColor" : ""} className={isMono ? "" : "theme-cap-line"} strokeOpacity="0.35" strokeWidth="4" strokeLinejoin="round"/>

        <path d="M416 190 V246" stroke={isMono ? "currentColor" : ""} className={isMono ? "" : "theme-spark-stroke"} strokeWidth="8" strokeLinecap="round"/>
        <circle cx="416" cy="256" r="13" fill={isMono ? "currentColor" : ""} className={isMono ? "" : "theme-spark-fill"}/>

        <motion.path 
          d="M120 96 L128 122 L154 130 L128 138 L120 164 L112 138 L86 130 L112 122 Z" 
          fill={isMono ? "currentColor" : ""} 
          className={isMono ? "" : "theme-spark-fill"}
          variants={{ hover: { scale: 1.2, rotate: 45 } }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: '120px 130px' }}
        />
        <circle cx="176" cy="84" r="6" fill={isMono ? "currentColor" : "#FFFFFF"} fillOpacity={isMono ? "0.3" : "0.8"}/>
        <circle cx="440" cy="110" r="5" fill={isMono ? "currentColor" : "#FFFFFF"} fillOpacity={isMono ? "0.3" : "0.6"}/>
      </svg>
      
      {!isIcon && (
        <span className="font-bold text-[19px] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          ScholarPath<span style={{ color: 'var(--color-brand)' }}>AI</span>
        </span>
      )}
    </motion.div>
  );
};
