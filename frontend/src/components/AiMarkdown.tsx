import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AiMarkdownProps {
  children: string;
  className?: string;
}

/**
 * Renders AI-generated text (Bangla or English) with proper markdown formatting.
 * Handles **bold**, ### headings, - bullet lists, numbered lists, --- dividers, etc.
 * that the OpenRouter AI models return in their responses.
 */
export const AiMarkdown: React.FC<AiMarkdownProps> = ({ children, className = '' }) => {
  if (!children) return null;

  return (
    <div className={`ai-markdown ${className}`}>
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ children }) => (
            <h3 className="text-[16px] font-bold text-[var(--color-text-primary)] mt-3 mb-1.5">{children}</h3>
          ),
          h2: ({ children }) => (
            <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mt-3 mb-1.5">{children}</h4>
          ),
          h3: ({ children }) => (
            <h5 className="text-[14px] font-semibold text-[var(--color-text-primary)] mt-2.5 mb-1">{children}</h5>
          ),
          h4: ({ children }) => (
            <h6 className="text-[13px] font-semibold text-[var(--color-text-primary)] mt-2 mb-1">{children}</h6>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
          ),
          // Bold
          strong: ({ children }) => (
            <strong className="font-semibold text-[var(--color-text-primary)]">{children}</strong>
          ),
          // Italic
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          // Unordered lists
          ul: ({ children }) => (
            <ul className="my-1.5 space-y-1 pl-1">{children}</ul>
          ),
          // Ordered lists
          ol: ({ children }) => (
            <ol className="my-1.5 space-y-1 pl-1 list-decimal list-inside">{children}</ol>
          ),
          // List items
          li: ({ children }) => (
            <li className="flex items-start gap-1.5 text-inherit">
              <span className="text-[var(--color-brand)] font-bold shrink-0 mt-0.5">•</span>
              <span>{children}</span>
            </li>
          ),
          // Horizontal rules
          hr: () => (
            <hr className="my-3 border-[var(--color-border)]" />
          ),
          // Code inline
          code: ({ children }) => (
            <code className="bg-[var(--color-surface-secondary)] text-[var(--color-brand)] px-1.5 py-0.5 rounded text-[0.9em] font-mono">{children}</code>
          ),
          // Code blocks
          pre: ({ children }) => (
            <pre className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg p-3 my-2 overflow-x-auto text-[12px] font-mono">{children}</pre>
          ),
          // Links
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer" className="text-[var(--color-brand)] underline hover:text-[var(--color-brand-hover)]">{children}</a>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-[var(--color-brand)] pl-3 my-2 text-[var(--color-text-secondary)] italic">{children}</blockquote>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
