import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, RefreshCw, X, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { ScholarPathLogo } from './ScholarPathLogo';
import { motion, AnimatePresence } from 'motion/react';

interface ChatWidgetProps {
  initialPrompt?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ initialPrompt, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'হ্যালো! আমি "স্কলারপাথ এআই" (ScholarPath AI) — আপনার পার্সোনাল স্টাডি অ্যাব্রড অ্যাসিস্ট্যান্ট। এডমিশন, ফান্ডিং, ভিসা প্রসেস বা এসওপি (SOP) রাইটিং নিয়ে যে কোনো প্রশ্ন থাকলে নির্দ্বিধায় আমাকে জিজ্ঞেস করতে পারেন!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'দুঃখিত, সার্ভারে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickChips = [
    'Write me an SOP for Masters in CS in Canada',
    'What are the requirements for DAAD scholarship?',
    'How to show bank solvency?',
  ];

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[600px] max-h-[calc(100vh-120px)] shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)]"
    >
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)] flex items-center justify-center shadow-md">
            <ScholarPathLogo variant="icon" className="scale-[0.6]" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--color-text-primary)] text-[15px] flex items-center gap-2">
              AI Mentor
              <span className="sp-badge bg-[var(--color-success)]/[0.1] text-[var(--color-success)] border border-[var(--color-success)]/[0.2]">
                Online
              </span>
            </h3>
            <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium">Powered by ScholarPath AI</p>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                m.sender === 'user'
                  ? 'bg-[var(--color-brand)] text-white'
                  : 'bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-brand)]'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <ScholarPathLogo variant="icon" className="scale-[0.5]" />}
            </div>

            <div
              className={`max-w-[75%] px-4 py-3 text-[14px] leading-[1.6] space-y-1 shadow-sm ${
                m.sender === 'user'
                  ? 'bg-[var(--color-brand)] text-white rounded-2xl rounded-br-sm'
                  : 'bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-2xl rounded-bl-sm'
              }`}
            >
              <p>{m.text}</p>
              <span className={`text-[10px] block font-medium ${m.sender === 'user' ? 'text-white/70 text-right' : 'text-[var(--color-text-tertiary)]'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-brand)] flex items-center justify-center">
              <ScholarPathLogo variant="icon" className="scale-[0.5]" />
            </div>
            <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)] px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2 text-[var(--color-brand)] text-[13px] font-medium shadow-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Chips */}
      <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center gap-2 overflow-x-auto scrollbar-none bg-[var(--color-surface-secondary)]/50">
        <span className="text-[11px] text-[var(--color-text-tertiary)] font-bold shrink-0 uppercase tracking-wider">Suggest:</span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="sp-btn sp-btn-ghost text-[12px] px-3 py-1.5 shrink-0 whitespace-nowrap rounded-full border border-[var(--color-border)] hover:border-[var(--color-brand-muted)] text-[var(--color-text-secondary)] bg-[var(--color-surface)] shadow-sm"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 border-t border-[var(--color-border)] flex items-center gap-3 bg-[var(--color-surface)]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your mentor..."
          className="sp-input !py-2.5 !rounded-full text-[14px]"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="sp-btn sp-btn-primary p-3 rounded-full disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[var(--color-brand-subtle)]"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
};
