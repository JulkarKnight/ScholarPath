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
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
      >
        {/* Subtle glow behind the compass */}
        <motion.circle
          cx="75" cy="25" r="20"
          fill="var(--color-accent)"
          className="opacity-0 blur-md"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            hover: { opacity: 0.15, scale: 1.2 }
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* The flowing "S" path */}
        <motion.path
          d="M 20 60 C 10 30, 40 20, 50 40 C 60 60, 90 50, 80 80 C 65 95, 20 85, 20 60 Z"
          fill={isMono ? "currentColor" : "var(--color-brand)"}
          style={isMono ? {} : { fill: 'url(#s-gradient)' }}
          variants={{
            hover: { filter: 'brightness(1.1)' }
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Secondary wave of the path */}
        <path
          d="M 15 50 C 15 35, 45 35, 50 50 C 55 65, 85 65, 85 80 C 70 80, 20 80, 15 50 Z"
          fill={isMono ? "currentColor" : "var(--color-accent)"}
          className={isMono ? 'opacity-50' : 'opacity-90'}
          style={isMono ? {} : { mixBlendMode: 'overlay' }}
        />

        {/* The Compass / Star */}
        <motion.path
          d="M 75 10 L 80 20 L 90 25 L 80 30 L 75 40 L 70 30 L 60 25 L 70 20 Z"
          fill={isMono ? "currentColor" : "var(--color-accent)"}
          variants={{
            initial: { y: 0 },
            hover: { y: -2, scale: 1.05 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        {!isMono && (
          <defs>
            <linearGradient id="s-gradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-brand-hover)" />
              <stop offset="1" stopColor="var(--color-brand)" />
            </linearGradient>
          </defs>
        )}
      </svg>
      
      {!isIcon && (
        <span className="font-bold text-[19px] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          ScholarPath<span style={{ color: 'var(--color-brand)' }}>AI</span>
        </span>
      )}
    </motion.div>
  );
};
