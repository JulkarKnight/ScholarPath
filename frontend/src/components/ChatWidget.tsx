import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  initialPrompt?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'আসসালামু আলাইকুম! আমি "স্কলারপাথ এআই" (ScholarPath AI) — আপনার ব্যাক্তিগত উচ্চশিক্ষা মেন্টর। কানাডা, জার্মানি, ইউএসএ বা যুক্তরাজ্যের যেকোনো বিশ্ববিদ্যালয়, ভিসা রুলস, GIC, ব্লকড অ্যাকাউন্ট বা স্কলারশিপ নিয়ে প্রশ্ন করুন!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickChips = [
    'জার্মানিতে পাবলিক ইউনিতে কী খরচ?',
    'Canada SDS ভিসায় GIC কত লাগে?',
    '3.5 CGPA দিয়ে স্কলারশিপ?',
    'USA F1 ভিসায় I-20 ফান্ড কত?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          chatHistory: messages.slice(-6),
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'দুঃখিত, কোনো তথ্য পাওয়া যায়নি।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="sp-card-elevated overflow-hidden flex flex-col h-[680px]">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-black/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center shadow-sm">
            <Sparkles className="w-[18px] h-[18px] text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#111827] text-[14px] flex items-center gap-2">
              ScholarPath AI
              <span className="sp-badge bg-[#10B981]/[0.08] text-[#10B981] border border-[#10B981]/[0.15]">
                Online
              </span>
            </h3>
            <p className="text-[11px] text-[#9CA3AF]">Ask anything in Bangla or English</p>
          </div>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#0066FF] text-white'
                    : 'bg-[#F0F1F3] text-[#6B7280]'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[78%] px-4 py-3 text-[13px] leading-[1.6] space-y-1 ${
                  m.sender === 'user'
                    ? 'bg-[#0066FF] text-white rounded-2xl rounded-br-md'
                    : 'bg-[#F7F8FA] border border-black/[0.06] text-[#374151] rounded-2xl rounded-bl-md whitespace-pre-wrap'
                }`}
              >
                <p>{m.text}</p>
                <span className={`text-[10px] block text-right ${m.sender === 'user' ? 'text-white/60' : 'text-[#9CA3AF]'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#F0F1F3] text-[#6B7280] flex items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#F7F8FA] border border-black/[0.06] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2 text-[#0066FF] text-[12px]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Generating response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips */}
        <div className="px-5 py-2.5 border-t border-black/[0.04] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-[#9CA3AF] font-medium shrink-0 uppercase tracking-wider">Quick:</span>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="sp-btn sp-btn-ghost text-[11px] px-2.5 py-1 shrink-0 whitespace-nowrap rounded-full border border-black/[0.06] hover:border-black/[0.12] text-[#6B7280]"
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
          className="p-4 border-t border-black/[0.06] flex items-center gap-3 bg-white"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="কানাডা বা জার্মানির উচ্চশিক্ষা বিষয়ে প্রশ্ন করুন..."
            className="sp-input"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="sp-btn sp-btn-primary p-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
