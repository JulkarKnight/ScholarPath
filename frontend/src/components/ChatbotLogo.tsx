import React from 'react';

export interface ChatbotLogoProps {
  size?: number;
  className?: string;
}

export const ChatbotLogo: React.FC<ChatbotLogoProps> = ({ size = 40, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      role="img"
      aria-label="ScholarPathAI chatbot logo"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <style>
          {`
            @keyframes chatbot-eye-blink {
              0%, 92%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.08); }
            }
            @keyframes chatbot-sparkle-pulse {
              0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
              50% { transform: scale(1.18) rotate(12deg); opacity: 1; }
            }
            @keyframes chatbot-tassel-sway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(5deg); }
            }
            .chatbot-eye {
              transform-origin: 256px 286px;
              animation: chatbot-eye-blink 4.2s infinite ease-in-out;
            }
            .chatbot-sparkle {
              transform-origin: 402px 121px;
              animation: chatbot-sparkle-pulse 2.6s infinite ease-in-out;
            }
            .chatbot-tassel {
              transform-origin: 352px 178px;
              animation: chatbot-tassel-sway 3.5s infinite ease-in-out;
            }
          `}
        </style>
        <linearGradient id="chatbot-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B8BFF" />
          <stop offset="1" stopColor="#1259E0" />
        </linearGradient>
      </defs>

      {/* Circle avatar */}
      <circle cx="256" cy="256" r="240" fill="url(#chatbot-bg)" />

      {/* Chat bubble */}
      <rect x="116" y="170" width="280" height="200" rx="72" fill="#FFFFFF" />
      <path
        d="M168 346 L146 414 L232 366 Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinejoin="round"
      />

      {/* Blinking Eyes */}
      <g className="chatbot-eye">
        <rect x="192" y="262" width="28" height="48" rx="14" fill="#1F6BFF" />
        <rect x="292" y="262" width="28" height="48" rx="14" fill="#1F6BFF" />
      </g>

      {/* Graduation cap on top of bubble */}
      <polygon
        points="160,178 256,130 352,178 256,226"
        fill="#1259E0"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <polygon points="256,130 352,178 256,226" fill="#FFFFFF" fillOpacity="0.18" />

      {/* Swaying Tassel */}
      <g className="chatbot-tassel">
        <path d="M352 178 V228" stroke="#FCB92B" strokeWidth="8" strokeLinecap="round" />
        <circle cx="352" cy="238" r="11" fill="#FCB92B" />
      </g>

      {/* Twinkling AI sparkle */}
      <path
        d="M402 84 L411 112 L439 121 L411 130 L402 158 L393 130 L365 121 L393 112 Z"
        fill="#FCD34D"
        className="chatbot-sparkle"
      />
      <circle cx="132" cy="120" r="7" fill="#FFFFFF" fillOpacity="0.7" />
    </svg>
  );
};
