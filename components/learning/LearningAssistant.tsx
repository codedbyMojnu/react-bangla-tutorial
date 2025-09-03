import React, { useState, useRef, useEffect } from 'react';
import { useLearning } from '../learning/LearningContext';
import styles from './LearningAssistant.module.css';

interface Message {
  id: string;
  text: string;
  textBn: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  code?: string;
  suggestions?: Suggestion[];
  isTyping?: boolean;
}

interface Suggestion {
  id: string;
  text: string;
  textBn: string;
  action: 'explain' | 'example' | 'debug' | 'practice';
  payload?: any;
}

interface LearningAssistantProps {
  lessonContext?: string;
  currentCode?: string;
  visible?: boolean;
  onToggle?: (visible: boolean) => void;
}

export default function LearningAssistant({
  lessonContext,
  currentCode,
  visible = false,
  onToggle
}: LearningAssistantProps) {
  const { state } = useLearning();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible && messages.length === 0) {
      // Initialize with welcome message
      addWelcomeMessage();
    }
  }, [visible]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Hello! I'm your React learning assistant. I'm here to help you understand concepts, debug code, and practice React skills.`,
      textBn: `নমস্কার! আমি আপনার React শেখার সহায়ক। আমি এখানে আছি আপনাকে কনসেপ্ট বুঝতে, কোড ডিবাগ করতে, এবং React দক্ষতা অনুশীলন করতে সাহায্য করার জন্য।`,
      sender: 'assistant',
      timestamp: new Date(),
      suggestions: [
        {
          id: '1',
          text: 'Explain React concepts',
          textBn: 'React কনসেপ্ট ব্যাখ্যা করুন',
          action: 'explain'
        },
        {
          id: '2',
          text: 'Show me examples',
          textBn: 'আমাকে উদাহরণ দেখান',
          action: 'example'
        },
        {
          id: '3',
          text: 'Help debug my code',
          textBn: 'আমার কোড ডিবাগ করতে সাহায্য করুন',
          action: 'debug'
        },
        {
          id: '4',
          text: 'Give me practice exercises',
          textBn: 'আমাকে অনুশীলনী দিন',
          action: 'practice'
        }
      ]
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      textBn: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (in real implementation, this would call an AI API)
    const response = await simulateAIResponse(inputValue, lessonContext, currentCode);
    
    setTimeout(() => {
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    let prompt = '';
    
    switch (suggestion.action) {
      case 'explain':
        prompt = lessonContext 
          ? `Explain the React concept related to: ${lessonContext}`
          : 'Explain basic React concepts like components, props, and state';
        break;
      case 'example':
        prompt = 'Show me a practical React example';
        break;
      case 'debug':
        prompt = currentCode 
          ? `Help me debug this React code: ${currentCode}`
          : 'How can I debug React applications?';
        break;
      case 'practice':
        prompt = 'Give me a React practice exercise';
        break;
    }

    setInputValue(prompt);
    setTimeout(() => handleSendMessage(), 100);
  };

  const simulateAIResponse = async (userInput: string, context?: string, code?: string): Promise<Message> => {
    // This is a simplified simulation. In a real app, you'd call an AI API like OpenAI
    
    let responseText = '';
    let responseTextBn = '';
    let suggestions: Suggestion[] = [];
    let responseCode = '';

    // Analyze user input and generate appropriate response
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('component') || lowerInput.includes('কম্পোনেন্ট')) {
      responseText = `React components are reusable pieces of UI. They're like JavaScript functions that return JSX. Here's a simple example:`;
      responseTextBn = `React কম্পোনেন্ট হল UI এর পুনরায় ব্যবহারযোগ্য অংশ। এগুলো JavaScript ফাংশনের মতো যা JSX রিটার্ন করে। এখানে একটি সাধারণ উদাহরণ:`;
      responseCode = `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="বাংলাদেশ" />`;
      
      suggestions = [
        { id: '1', text: 'Tell me about props', textBn: 'Props সম্পর্কে বলুন', action: 'explain' },
        { id: '2', text: 'Show state example', textBn: 'State এর উদাহরণ দেখান', action: 'example' }
      ];
    }
    else if (lowerInput.includes('state') || lowerInput.includes('স্টেট')) {
      responseText = `State is how React components remember information. Use useState hook to add state to functional components:`;
      responseTextBn = `State হল React কম্পোনেন্ট কিভাবে তথ্য মনে রাখে। ফাংশনাল কম্পোনেন্টে state যোগ করতে useState হুক ব্যবহার করুন:`;
      responseCode = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`;
      
      suggestions = [
        { id: '1', text: 'Explain useEffect', textBn: 'useEffect ব্যাখ্যা করুন', action: 'explain' },
        { id: '2', text: 'State vs Props', textBn: 'State বনাম Props', action: 'explain' }
      ];
    }
    else if (lowerInput.includes('debug') || lowerInput.includes('ডিবাগ')) {
      responseText = `Here are some common React debugging techniques:
1. Use React DevTools browser extension
2. Add console.log() statements
3. Use debugger; statement
4. Check for common issues like missing keys in lists`;
      responseTextBn = `এখানে কিছু সাধারণ React ডিবাগিং কৌশল:
১. React DevTools ব্রাউজার এক্সটেনশন ব্যবহার করুন
২. console.log() স্টেটমেন্ট যোগ করুন
৩. debugger; স্টেটমেন্ট ব্যবহার করুন
৪. লিস্টে অনুপস্থিত keys এর মতো সাধারণ সমস্যা চেক করুন`;
    }
    else if (lowerInput.includes('practice') || lowerInput.includes('অনুশীলন')) {
      responseText = `Here's a practice exercise: Create a Todo List component that can add, remove, and mark items as complete.`;
      responseTextBn = `এখানে একটি অনুশীলনী: একটি Todo List কম্পোনেন্ট তৈরি করুন যা আইটেম যোগ, মুছে ফেলা এবং সম্পূর্ণ হিসেবে চিহ্নিত করতে পারে।`;
      responseCode = `// Your challenge: Complete this TodoList component
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    // Add your code here
  };
  
  const removeTodo = (id) => {
    // Add your code here
  };
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="নতুন কাজ যোগ করুন"
      />
      <button onClick={addTodo}>Add</button>
      {/* Render todos here */}
    </div>
  );
}`;
      
      suggestions = [
        { id: '1', text: 'Show solution', textBn: 'সমাধান দেখান', action: 'example' },
        { id: '2', text: 'More exercises', textBn: 'আরো অনুশীলনী', action: 'practice' }
      ];
    }
    else {
      responseText = `I'm here to help with React questions! You can ask me about components, state, props, hooks, or any React concept.`;
      responseTextBn = `আমি React প্রশ্নের সাহায্যের জন্য এখানে আছি! আপনি আমাকে কম্পোনেন্ট, state, props, hooks, বা যেকোনো React কনসেপ্ট সম্পর্কে জিজ্ঞাসা করতে পারেন।`;
      
      suggestions = [
        { id: '1', text: 'What is JSX?', textBn: 'JSX কী?', action: 'explain' },
        { id: '2', text: 'How do hooks work?', textBn: 'Hooks কিভাবে কাজ করে?', action: 'explain' },
        { id: '3', text: 'Show me an example', textBn: 'আমাকে একটি উদাহরণ দেখান', action: 'example' }
      ];
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      textBn: responseTextBn,
      sender: 'assistant',
      timestamp: new Date(),
      code: responseCode || undefined,
      suggestions
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!visible) {
    return (
      <button
        onClick={() => onToggle?.(true)}
        className={styles.floatingButton}
        title="AI Learning Assistant"
      >
        🤖
      </button>
    );
  }

  return (
    <div className={`${styles.assistant} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>🤖</div>
            <div className={styles.titleSection}>
              <h3 className={styles.title}>
                AI শিক্ষক <span className={styles.titleEn}>(AI Tutor)</span>
              </h3>
              <div className={styles.status}>
                <span className={styles.statusDot}></span>
                অনলাইন
              </div>
            </div>
          </div>
          <div className={styles.headerButtons}>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.expandButton}
              title={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? '🔽' : '🔼'}
            </button>
            <button 
              onClick={() => onToggle?.(false)}
              className={styles.closeButton}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`${styles.message} ${styles[message.sender]}`}
          >
            <div className={styles.messageContent}>
              <p className={styles.messageText}>
                {message.textBn || message.text}
              </p>
              
              {message.code && (
                <div className={styles.codeBlock}>
                  <pre><code>{message.code}</code></pre>
                </div>
              )}
              
              {message.suggestions && message.suggestions.length > 0 && (
                <div className={styles.suggestions}>
                  {message.suggestions.map(suggestion => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={styles.suggestionButton}
                    >
                      {suggestion.textBn || suggestion.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.messageTime}>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageContent}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
                <span className={styles.typingText}>টাইপ করছে...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="আপনার প্রশ্ন লিখুন... (Type your question...)"
            className={styles.messageInput}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className={styles.sendButton}
          >
            📤
          </button>
        </div>
        
        <div className={styles.quickActions}>
          <button 
            onClick={() => handleSuggestionClick({ 
              id: 'quick-help', 
              text: 'Help', 
              textBn: 'সাহায্য', 
              action: 'explain' 
            })}
            className={styles.quickButton}
          >
            ❓ সাহায্য
          </button>
          <button 
            onClick={() => handleSuggestionClick({ 
              id: 'quick-example', 
              text: 'Example', 
              textBn: 'উদাহরণ', 
              action: 'example' 
            })}
            className={styles.quickButton}
          >
            💡 উদাহরণ
          </button>
          <button 
            onClick={() => setMessages([])}
            className={styles.quickButton}
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}