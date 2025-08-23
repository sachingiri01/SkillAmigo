
















'use client'
import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  MessageSquare, 
  Send, 
  Plus,
  Target,
  DollarSign,
  HelpCircle,
  Users,
  TrendingUp,
  Briefcase,
  Coins,
  FileText,
  ExternalLink,
  Bot
} from 'lucide-react';

// CSS Variables Definition
const CSS_VARIABLES = {
  '--color-jet-stream-50': '#f3f8f8',
  '--color-jet-stream-100': '#e1ecea',
  '--color-jet-stream-200': '#bbd3d0',
  '--color-jet-stream-300': '#9fc1bd',
  '--color-jet-stream-400': '#719f9a',
  '--color-jet-stream-500': '#558581',
  '--color-jet-stream-600': '#4a706e',
  '--color-jet-stream-700': '#405e5e',
  '--color-jet-stream-800': '#3a5050',
  '--color-jet-stream-900': '#344545',
  '--color-jet-stream-950': '#1f2c2d',
  '--color-jet-stream-975': '#141919',
  '--color-jet-stream-1000': '#111111'
};

// Agent Configuration
const AI_AGENTS = [
  {
    id: 'skill-matcher',
    name: 'Skill Matcher',
    description: 'Find perfect gigs and opportunities',
    icon: Target,
    color: 'text-blue-500'
  },
  {
    id: 'deal-negotiator',
    name: 'Deal Negotiator',
    description: 'Optimize pricing and contracts',
    icon: DollarSign,
    color: 'text-green-500'
  },
  {
    id: 'knowledge-mentor',
    name: 'Knowledge Mentor',
    description: 'Get help and guidance',
    icon: HelpCircle,
    color: 'text-purple-500'
  },
  {
    id: 'collaboration-assistant',
    name: 'Collaboration Assistant',
    description: 'Find team collaboration opportunities',
    icon: Users,
    color: 'text-orange-500'
  }
];

// Sidebar Component
const Sidebar = ({ agents, activeAgent, onSelectAgent, isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          fixed left-0 top-0 h-full w-64 transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: 'linear-gradient(180deg, var(--color-jet-stream-975) 0%, var(--color-jet-stream-900) 100%)',
          ...CSS_VARIABLES
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        
        {/* Header */}
        <div 
          className="relative p-6 border-b" 
          style={{ 
            borderColor: 'var(--color-jet-stream-800)',
            ...CSS_VARIABLES
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center" 
                style={{ 
                  backgroundColor: 'var(--color-jet-stream-500)',
                  ...CSS_VARIABLES
                }}
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">SkillsAmigo</h1>
                <p 
                  className="text-xs" 
                  style={{ 
                    color: 'var(--color-jet-stream-300)',
                    ...CSS_VARIABLES
                  }}
                >
                  AI Dashboard
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden hover:text-white transition-colors"
              style={{ 
                color: 'var(--color-jet-stream-300)',
                ...CSS_VARIABLES
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="relative p-4 space-y-2">
          {agents.map((agent) => {
            const IconComponent = agent.icon;
            const isActive = activeAgent?.id === agent.id;
            
            return (
              <button
                key={agent.id}
                onClick={() => onSelectAgent(agent)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group"
                style={{
                  backgroundColor: isActive ? 'var(--color-jet-stream-700)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-jet-stream-200)',
                  ...CSS_VARIABLES
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-700)';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-jet-stream-200)';
                  }
                }}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-orange-500' : agent.color}`} />
                <div className="flex-1">
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-xs opacity-75">{agent.description}</div>
                </div>
                {isActive && (
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{ 
                      backgroundColor: 'var(--color-jet-stream-500)',
                      ...CSS_VARIABLES
                    }} 
                  />
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t" 
          style={{ 
            borderColor: 'var(--color-jet-stream-800)',
            ...CSS_VARIABLES
          }}
        >
          <div 
            className="text-xs text-center space-y-1" 
            style={{ 
              color: 'var(--color-jet-stream-400)',
              ...CSS_VARIABLES
            }}
          >
            <div>© 2025 SkillsAmigo v2.1</div>
            <div className="space-x-4">
              <a href="#" className="hover:text-orange-500 transition-colors">Docs</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Help</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Header Component
const Header = ({ activeAgent, onNewChat, onToggleSidebar }) => {
  const IconComponent = activeAgent?.icon || Bot;
  
  return (
    <header 
      className="border-b px-6 py-4 relative"
      style={{ 
        background: `linear-gradient(135deg, var(--color-jet-stream-50) 0%, var(--color-jet-stream-100) 100%)`,
        borderColor: 'var(--color-jet-stream-200)',
        ...CSS_VARIABLES
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="headerDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#headerDots)" />
        </svg>
      </div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--color-jet-stream-100)',
              ...CSS_VARIABLES
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-200)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-100)';
            }}
          >
            <Menu 
              className="w-5 h-5" 
              style={{ 
                color: 'var(--color-jet-stream-700)',
                ...CSS_VARIABLES
              }} 
            />
          </button>
          
          {/* Agent Info */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center" 
                style={{ 
                  backgroundColor: 'var(--color-jet-stream-100)',
                  ...CSS_VARIABLES
                }}
              >
                <IconComponent 
                  className="w-6 h-6" 
                  style={{ 
                    color: activeAgent ? 'var(--color-jet-stream-600)' : 'var(--color-jet-stream-400)',
                    ...CSS_VARIABLES
                  }} 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h2 
                className="font-semibold" 
                style={{ 
                  color: 'var(--color-jet-stream-900)',
                  ...CSS_VARIABLES
                }}
              >
                {activeAgent?.name || 'Select an Agent'}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
                {activeAgent && (
                  <span 
                    className="text-xs" 
                    style={{ 
                      color: 'var(--color-jet-stream-600)',
                      ...CSS_VARIABLES
                    }}
                  >
                    {activeAgent.description}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <button
          onClick={onNewChat}
          className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors"
          style={{ 
            backgroundColor: 'var(--color-jet-stream-500)',
            ...CSS_VARIABLES
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-600)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-500)';
          }}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:block">New Chat</span>
        </button>
      </div>
    </header>
  );
};

// Typing Indicator Component
const TypingIndicator = ({ activeAgent }) => (
  <div 
    className="flex space-x-3" 
    style={{ 
      color: 'var(--color-jet-stream-500)',
      ...CSS_VARIABLES
    }}
  >
    <div 
      className="w-8 h-8 rounded-full flex items-center justify-center" 
      style={{ 
        backgroundColor: 'var(--color-jet-stream-100)',
        ...CSS_VARIABLES
      }}
    >
      <Bot className="w-4 h-4" />
    </div>
    <div 
      className="flex items-center space-x-1 px-4 py-2 rounded-lg" 
      style={{ 
        backgroundColor: 'var(--color-jet-stream-100)',
        ...CSS_VARIABLES
      }}
    >
      <span className="text-sm">Agent typing</span>
      <div className="flex space-x-1">
        <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
      </div>
    </div>
  </div>
);

// Chat Window Component
const ChatWindow = ({ activeAgent, messages, onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = () => {
    if (inputText.trim() && activeAgent && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className="flex flex-col h-full" 
      style={{ 
        background: `linear-gradient(135deg, var(--color-jet-stream-50) 0%, var(--color-jet-stream-100) 100%)`,
        ...CSS_VARIABLES
      }}
    >
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" role="log" aria-label="Chat messages">
        {!activeAgent ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Bot 
                className="w-16 h-16 mx-auto" 
                style={{ 
                  color: 'var(--color-jet-stream-300)',
                  ...CSS_VARIABLES
                }} 
              />
              <div>
                <h3 
                  className="text-lg font-medium" 
                  style={{ 
                    color: 'var(--color-jet-stream-700)',
                    ...CSS_VARIABLES
                  }}
                >
                  Welcome to SkillsAmigo AI
                </h3>
                <p 
                  style={{ 
                    color: 'var(--color-jet-stream-500)',
                    ...CSS_VARIABLES
                  }}
                >
                  Select an AI agent from the sidebar to start chatting
                </p>
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center space-y-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" 
              style={{ 
                backgroundColor: 'var(--color-jet-stream-100)',
                ...CSS_VARIABLES
              }}
            >
              <activeAgent.icon className={`w-8 h-8 ${activeAgent.color}`} />
            </div>
            <div>
              <h3 
                className="text-lg font-medium" 
                style={{ 
                  color: 'var(--color-jet-stream-800)',
                  ...CSS_VARIABLES
                }}
              >
                Chat with {activeAgent.name}
              </h3>
              <p 
                style={{ 
                  color: 'var(--color-jet-stream-600)',
                  ...CSS_VARIABLES
                }}
              >
                {activeAgent.description}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animation: 'fadeIn 0.5s ease-in-out' }}
              >
                {message.type === 'agent' && (
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                    style={{ 
                      backgroundColor: 'var(--color-jet-stream-100)',
                      ...CSS_VARIABLES
                    }}
                  >
                    <activeAgent.icon className={`w-4 h-4 ${activeAgent.color}`} />
                  </div>
                )}
                <div
                  className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg border-l-4 shadow-sm"
                  style={message.type === 'user' ? {
                    backgroundColor: 'var(--color-jet-stream-200)',
                    borderColor: 'var(--color-jet-stream-500)',
                    color: 'var(--color-jet-stream-900)',
                    ...CSS_VARIABLES
                  } : {
                    backgroundColor: 'white',
                    borderColor: 'var(--color-jet-stream-300)',
                    color: 'var(--color-jet-stream-800)',
                    ...CSS_VARIABLES
                  }}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="text-xs mt-1 opacity-75">{message.timestamp}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                <TypingIndicator activeAgent={activeAgent} />
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {activeAgent && (
        <div 
          className="border-t bg-white p-4" 
          style={{ 
            borderColor: 'var(--color-jet-stream-200)',
            ...CSS_VARIABLES
          }}
        >
          <div className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask ${activeAgent.name} anything...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50"
              style={{
                borderColor: 'var(--color-jet-stream-300)',
                ...CSS_VARIABLES
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-jet-stream-500)';
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-jet-stream-200)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-jet-stream-300)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              aria-label="Type your message"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ 
                backgroundColor: 'var(--color-jet-stream-500)',
                ...CSS_VARIABLES
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-600)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-500)';
                }
              }}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div 
            className="text-xs mt-2" 
            style={{ 
              color: 'var(--color-jet-stream-400)',
              ...CSS_VARIABLES
            }}
          >
            Press Enter to send • Try commands: /help, /clear, /new
          </div>
        </div>
      )}
    </div>
  );
};

// Card Component
const Card = ({ title, description, type, action, data }) => {
  const getCardIcon = () => {
    switch (type) {
      case 'gig': return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'insight': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'action': return <ExternalLink className="w-5 h-5 text-orange-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div 
      className="rounded-xl p-6 shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer" 
      style={{
        backgroundColor: 'white',
        borderColor: 'var(--color-jet-stream-200)',
        ...CSS_VARIABLES
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-jet-stream-300)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-jet-stream-200)';
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getCardIcon()}
          <h3 
            className="font-semibold" 
            style={{ 
              color: 'var(--color-jet-stream-800)',
              ...CSS_VARIABLES
            }}
          >
            {title}
          </h3>
        </div>
        {type === 'insight' && data?.trend && (
          <div className={`text-xs px-2 py-1 rounded-full ${
            data.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {data.trend === 'up' ? '+' : '-'}{data.change}
          </div>
        )}
      </div>
      
      <p 
        className="text-sm mb-4" 
        style={{ 
          color: 'var(--color-jet-stream-600)',
          ...CSS_VARIABLES
        }}
      >
        {description}
      </p>
      
      {data && (
        <div className="mb-4 space-y-2">
          {data.coins && (
            <div className="flex items-center space-x-2 text-sm">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span 
                style={{ 
                  color: 'var(--color-jet-stream-700)',
                  ...CSS_VARIABLES
                }}
              >
                {data.coins} coins
              </span>
            </div>
          )}
          {data.rating && (
            <div className="flex items-center space-x-1 text-sm">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={i < data.rating ? { 
                    backgroundColor: '#fbbf24'
                  } : { 
                    backgroundColor: 'var(--color-jet-stream-200)',
                    ...CSS_VARIABLES
                  }}
                />
              ))}
              <span 
                className="ml-1" 
                style={{ 
                  color: 'var(--color-jet-stream-600)',
                  ...CSS_VARIABLES
                }}
              >
                ({data.rating}/5)
              </span>
            </div>
          )}
        </div>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className="w-full px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium"
          style={{ 
            backgroundColor: 'var(--color-jet-stream-500)',
            ...CSS_VARIABLES
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-600)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-jet-stream-500)';
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

// Main Dashboard Component
const AgentDashboard = () => {
  const [activeAgent, setActiveAgent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  // Handle agent selection
  const handleSelectAgent = (agent) => {
    setActiveAgent(agent);
    setSidebarOpen(false);
    
    // Load cards based on agent
    loadAgentCards(agent);
    
    // Initialize chat if empty
    if (!messages[agent.id]) {
      setMessages(prev => ({
        ...prev,
        [agent.id]: [{
          type: 'agent',
          content: `Hi! I'm ${agent.name}. ${agent.description}. How can I help you today?`,
          timestamp: new Date().toLocaleTimeString()
        }]
      }));
    }
  };

  // Load cards based on agent type
  const loadAgentCards = (agent) => {
    const cardData = {
      'skill-matcher': [
        {
          title: 'Web Development Gig',
          description: 'Perfect match for your React skills - $2,500 project',
          type: 'gig',
          data: { coins: 2500, rating: 5 },
          action: { label: 'View Gig', onClick: () => alert('Viewing gig details...') }
        },
        {
          title: 'Profile Performance',
          description: 'Your profile views increased by 25% this week',
          type: 'insight',
          data: { trend: 'up', change: '25%' }
        }
      ],
      'deal-negotiator': [
        {
          title: 'Optimal Price Range',
          description: 'Based on market analysis, price between $45-65/hour',
          type: 'insight',
          data: { coins: 55 }
        },
        {
          title: 'Contract Template',
          description: 'Use our AI-optimized contract template',
          type: 'action',
          action: { label: 'Get Template', onClick: () => alert('Opening contract template...') }
        }
      ],
      'knowledge-mentor': [
        {
          title: 'Getting Started Guide',
          description: 'Learn how to maximize your SkillsAmigo experience',
          type: 'action',
          action: { label: 'Read Guide', onClick: () => alert('Opening getting started guide...') }
        }
      ],
      'collaboration-assistant': [
        {
          title: 'Team Opportunity',
          description: 'Join a team project - UI/UX + Development collaboration',
          type: 'gig',
          data: { coins: 3200, rating: 4 },
          action: { label: 'Join Team', onClick: () => alert('Joining team project...') }
        }
      ]
    };
    
    setCards(cardData[agent.id] || []);
  };

  // Handle sending messages
  const handleSendMessage = async (text) => {
    if (!activeAgent || isLoading) return;

    // Handle commands
    if (text.startsWith('/')) {
      handleCommand(text);
      return;
    }

    const userMessage = {
      type: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => ({
      ...prev,
      [activeAgent.id]: [...(prev[activeAgent.id] || []), userMessage]
    }));

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const agentMessage = {
        type: 'agent',
        content: generateAgentResponse(activeAgent, text),
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => ({
        ...prev,
        [activeAgent.id]: [...(prev[activeAgent.id] || []), agentMessage]
      }));
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  // Handle commands
  const handleCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    
    if (cmd === '/help') {
      const helpMessage = {
        type: 'agent',
        content: 'Available commands:\n/help - Show this help\n/clear - Clear chat history\n/new - Start new conversation',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => ({
        ...prev,
        [activeAgent.id]: [...(prev[activeAgent.id] || []), helpMessage]
      }));
    } else if (cmd === '/clear') {
      setMessages(prev => ({ ...prev, [activeAgent.id]: [] }));
    } else if (cmd === '/new') {
      handleNewChat();
    }
  };

  // Generate AI responses based on agent
  const generateAgentResponse = (agent, userInput) => {
    const responses = {
      'skill-matcher': [
        "I found 3 perfect gigs matching your skills! The top one is a React project paying 2,500 coins.",
        "Your profile shows strong expertise in web development. I recommend applying to frontend positions.",
        "Based on your experience, you'd be great for this mobile app development project.",
        "I see you're interested in " + userInput + ". Let me find relevant opportunities for you.",
        "Here are some skill-matched recommendations based on your query about " + userInput + "."
      ],
      'deal-negotiator': [
        "For this project scope, I'd recommend pricing between $50-70 per hour based on market rates.",
        "Here's a contract template that protects both parties and ensures fair payment terms.",
        "You could negotiate for milestone-based payments to reduce risk and improve cash flow.",
        "Regarding " + userInput + ", I suggest considering the market value and your experience level.",
        "Based on your question about " + userInput + ", here's my negotiation strategy recommendation."
      ],
      'knowledge-mentor': [
        "Here's a step-by-step guide to help you with that. First, make sure your profile is complete...",
        "Great question! The coin system works as an escrow - coins are held securely until project completion.",
        "For best results, I recommend updating your portfolio with recent work and client testimonials.",
        "I understand you're asking about " + userInput + ". Let me break this down for you step by step.",
        "That's a common question about " + userInput + ". Here's what you need to know..."
      ],
      'collaboration-assistant': [
        "I found a team that needs exactly your skills! They're working on an e-commerce platform.",
        "Consider partnering with a designer for this project - it could increase your rate by 40%.",
        "This client often has follow-up projects. Building a good relationship here could lead to more work.",
        "For " + userInput + ", I recommend finding complementary team members to strengthen your proposal.",
        "Based on your interest in " + userInput + ", here are some collaboration opportunities I found."
      ]
    };

    const agentResponses = responses[agent.id] || ["I'm here to help! Let me analyze your request..."];
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  // Handle new chat
  const handleNewChat = () => {
    if (activeAgent) {
      setMessages(prev => ({ ...prev, [activeAgent.id]: [] }));
    }
  };

  return (
    <div 
      className="h-screen flex" 
      style={{ 
        background: `linear-gradient(135deg, var(--color-jet-stream-50) 0%, var(--color-jet-stream-100) 100%)`,
        ...CSS_VARIABLES
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* Sidebar */}
      <Sidebar
        agents={AI_AGENTS}
        activeAgent={activeAgent}
        onSelectAgent={handleSelectAgent}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          activeAgent={activeAgent}
          onNewChat={handleNewChat}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            <ChatWindow
              activeAgent={activeAgent}
              messages={messages[activeAgent?.id] || []}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>

          {/* Cards Panel - Desktop Only */}
          {activeAgent && cards.length > 0 && (
            <div 
              className="hidden xl:block w-80 border-l p-4 overflow-y-auto" 
              style={{
                background: `linear-gradient(135deg, var(--color-jet-stream-50) 0%, var(--color-jet-stream-100) 100%)`,
                borderColor: 'var(--color-jet-stream-200)',
                ...CSS_VARIABLES
              }}
            >
              <h3 
                className="font-semibold mb-4" 
                style={{ 
                  color: 'var(--color-jet-stream-800)',
                  ...CSS_VARIABLES
                }}
              >
                Recommendations
              </h3>
              <div className="space-y-4">
                {cards.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        {activeAgent && cards.length > 0 && (
          <div 
            className="xl:hidden bg-white border-t p-4" 
            style={{ 
              borderColor: 'var(--color-jet-stream-200)',
              ...CSS_VARIABLES
            }}
          >
            <h3 
              className="font-semibold mb-4" 
              style={{ 
                color: 'var(--color-jet-stream-800)',
                ...CSS_VARIABLES
              }}
            >
              Recommendations
            </h3>
            <div className="grid gap-4">
              {cards.slice(0, 2).map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;