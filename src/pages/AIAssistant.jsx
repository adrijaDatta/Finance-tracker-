import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, TrendingUp, Target, BarChart2, Wallet, X, Lightbulb, RefreshCw } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const SUGGESTED_PROMPTS = [
  { icon: TrendingUp, label: 'Analyze my spending', prompt: 'Analyze my spending patterns this month and give me actionable advice to save more.' },
  { icon: Target, label: 'Goal planning', prompt: 'Help me create a realistic savings plan to reach my goals faster.' },
  { icon: BarChart2, label: 'Portfolio advice', prompt: 'Review my portfolio allocation and suggest improvements for better returns.' },
  { icon: Wallet, label: 'Budget optimization', prompt: 'How can I optimize my budget to increase my monthly savings rate?' },
  { icon: Lightbulb, label: 'Financial tips', prompt: 'Give me 5 personalized financial tips based on my current situation.' },
];

const SYSTEM_PROMPT = `You are Moneta AI, an expert personal finance assistant embedded in the Moneta finance dashboard. 
You help users understand their finances, optimize their budget, plan for goals, and make smart investment decisions.
Be concise, friendly, and actionable. Use specific numbers when giving advice.
Format your responses clearly with bullet points or numbered lists when appropriate.
Always be encouraging and positive while being honest about financial realities.
Keep responses focused and practical - users want actionable insights, not lengthy lectures.`;

export default function AIAssistant() {
  const { summaryStats, spendingCategories, savingsGoals, portfolioAllocation } = useFinance();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hi! I'm **Moneta AI**, your personal finance assistant.\n\nI can see your financial data and I'm ready to help you:\n- Analyze spending patterns\n- Plan savings goals\n- Optimize your budget\n- Review your portfolio\n\nWhat would you like to explore today?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getFinanceContext = () => `
Current Financial Snapshot:
- Total Balance: $${summaryStats.totalBalance.toLocaleString()}
- Monthly Income: $${summaryStats.income.toLocaleString()}
- Monthly Expenses: $${summaryStats.expenses.toLocaleString()}
- Monthly Savings: $${summaryStats.savings.toLocaleString()}
- Savings Rate: ${((summaryStats.savings / summaryStats.income) * 100).toFixed(1)}%

Spending Categories this month:
${spendingCategories.map(c => `- ${c.name}: $${c.value.toLocaleString()} (budget: $${c.budget.toLocaleString()})`).join('\n')}

Savings Goals:
${savingsGoals.map(g => `- ${g.name}: $${g.current.toLocaleString()} of $${g.target.toLocaleString()} (${((g.current/g.target)*100).toFixed(0)}%)`).join('\n')}

Portfolio Allocation:
${portfolioAllocation.map(p => `- ${p.name}: ${p.value}%`).join('\n')}
`;

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const contextualMessages = [
        {
          role: 'user',
          content: `Here is my current financial data for context:\n${getFinanceContext()}\n\nNow my question: ${text}`
        }
      ];

      // For messages after the first, use conversation history
      const apiMessages = newMessages.length === 1
        ? contextualMessages
        : [
            { role: 'user', content: `Financial context: ${getFinanceContext()}` },
            { role: 'assistant', content: 'I have your financial data. How can I help?' },
            ...newMessages.slice(1).map(m => ({ role: m.role, content: m.content }))
          ];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply = data.content?.find(b => b.type === 'text')?.text || 'Sorry, I could not generate a response.';
      setMessages(msgs => [...msgs, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: 'assistant', content: '⚠️ Connection error. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: `👋 Chat cleared! I'm ready to help with your finances. What would you like to know?`,
    }]);
  };

  const renderContent = (text) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\n- /g, '\n• ')
      .split('\n')
      .map((line, i) => <p key={i} className={line.startsWith('•') ? 'pl-2' : ''} dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Moneta AI</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <p className="text-xs text-slate-500 font-mono">AI assistant · Powered by Claude</p>
            </div>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-subtle text-sm text-slate-400 hover:text-white hover:border-white/20 transition-all"
        >
          <RefreshCw size={13} />
          <span className="hidden sm:inline">Clear chat</span>
        </button>
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Quick questions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map(({ icon: Icon, label, prompt }) => (
              <button
                key={label}
                onClick={() => sendMessage(prompt)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-subtle bg-bg-elevated text-xs text-slate-300 hover:text-white hover:border-accent-cyan/30 hover:bg-accent-cyan/5 transition-all"
              >
                <Icon size={12} className="text-accent-cyan" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 animate-fade-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            style={{ animationFillMode: 'both' }}>

            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold ${
              msg.role === 'assistant'
                ? 'bg-gradient-to-br from-accent-purple to-accent-cyan'
                : 'bg-gradient-to-br from-accent-cyan to-accent-green'
            }`}>
              {msg.role === 'assistant' ? <Sparkles size={14} className="text-white" /> : 'AK'}
            </div>

            {/* Bubble */}
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed space-y-1 ${
              msg.role === 'user'
                ? 'bg-accent-cyan/15 border border-accent-cyan/20 text-white rounded-tr-sm'
                : 'glass-card text-slate-300 rounded-tl-sm'
            }`}>
              {renderContent(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-fade-up" style={{ animationFillMode: 'both' }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-white" />
            </div>
            <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map(j => (
                  <div key={j} className="w-2 h-2 rounded-full bg-accent-cyan/60 animate-bounce" style={{ animationDelay: `${j * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        <div className="glass-card p-3 flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask me anything about your finances..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none resize-none max-h-32 py-1"
            style={{ lineHeight: '1.5' }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl bg-accent-cyan flex items-center justify-center flex-shrink-0 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send size={15} className="text-bg-primary" />
          </button>
        </div>
        <p className="text-[10px] text-slate-600 text-center mt-2 font-mono">
          Moneta AI has access to your financial data to provide personalised advice
        </p>
      </div>
    </div>
  );
}
