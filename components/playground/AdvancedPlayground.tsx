import React, { useState, useEffect, useCallback } from 'react';
import { Sandpack, SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackConsole, SandpackFileExplorer } from '@codesandbox/sandpack-react';
import { useLearning } from '../learning/LearningContext';
import styles from './AdvancedPlayground.module.css';

interface PlaygroundFile {
  name: string;
  content: string;
  readOnly?: boolean;
  hidden?: boolean;
}

interface PlaygroundTemplate {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  files: Record<string, PlaygroundFile>;
  dependencies?: Record<string, string>;
  category: 'basic' | 'components' | 'hooks' | 'advanced' | 'projects';
}

interface AdvancedPlaygroundProps {
  initialTemplate?: PlaygroundTemplate;
  lessonId?: string;
  enableSharing?: boolean;
  enableCollaboration?: boolean;
  showConsole?: boolean;
  showFileExplorer?: boolean;
  customChallenges?: Challenge[];
}

interface Challenge {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  testCases: TestCase[];
  points: number;
}

interface TestCase {
  name: string;
  test: (code: string) => boolean;
  hint?: string;
  hintBn?: string;
}

export default function AdvancedPlayground({
  initialTemplate,
  lessonId,
  enableSharing = true,
  enableCollaboration = false,
  showConsole = true,
  showFileExplorer = true,
  customChallenges = []
}: AdvancedPlaygroundProps) {
  const { trackTime } = useLearning();
  const [currentTemplate, setCurrentTemplate] = useState<PlaygroundTemplate | null>(initialTemplate || null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [sessionTime, setSessionTime] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  // Track coding time
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
      if (sessionTime % 60 === 0) { // Track every minute
        trackTime(1);
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [sessionTime, trackTime]);

  // Default templates
  const defaultTemplates: PlaygroundTemplate[] = [
    {
      id: 'react-basics',
      name: 'React Basics',
      nameBn: 'React এর বেসিক',
      description: 'Start with basic React components',
      descriptionBn: 'মৌলিক React কম্পোনেন্ট দিয়ে শুরু করুন',
      category: 'basic',
      files: {
        '/App.js': {
          name: 'App.js',
          content: `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🇧🇩 React Bangla Tutorial</h1>
      <p>আপনার প্রথম React অ্যাপ!</p>
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          -
        </button>
        <span style={{ fontSize: '24px', margin: '0 20px' }}>
          {count}
        </span>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ marginLeft: '10px', padding: '10px 20px' }}
        >
          +
        </button>
      </div>
      <p>কাউন্টার: {count}</p>
    </div>
  );
}

export default App;`
        }
      }
    },
    {
      id: 'todo-app',
      name: 'Todo App',
      nameBn: 'টুডু অ্যাপ',
      description: 'Build a complete todo application',
      descriptionBn: 'একটি সম্পূর্ণ টুডু অ্যাপ্লিকেশন তৈরি করুন',
      category: 'projects',
      files: {
        '/App.js': {
          name: 'App.js',
          content: `import React, { useState } from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React শেখা', completed: false },
    { id: 2, text: 'প্রজেক্ট তৈরি করা', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 আমার টুডু লিস্ট</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="নতুন কাজ যোগ করুন..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>যোগ করুন</button>
      </div>
      <TodoList 
        todos={todos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
      />
    </div>
  );
}

export default App;`
        },
        '/TodoList.js': {
          name: 'TodoList.js',
          content: `import React from 'react';

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-message">কোনো কাজ নেই! 🎉</p>
      ) : (
        todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
            <button 
              onClick={() => onDelete(todo.id)}
              className="delete-btn"
            >
              🗑️
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;`
        },
        '/App.css': {
          name: 'App.css',
          content: `.app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-section input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.input-section button {
  padding: 12px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.input-section button:hover {
  background: #0056b3;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.todo-item input[type="checkbox"] {
  transform: scale(1.2);
}

.todo-item span {
  flex: 1;
  font-size: 16px;
}

.todo-item span.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
}

.delete-btn:hover {
  background: #f5f5f5;
}

.empty-message {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 40px 20px;
}`
        }
      }
    }
  ];

  const handleTemplateChange = (template: PlaygroundTemplate) => {
    setCurrentTemplate(template);
  };

  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      // Here you would typically save to a backend
      // For now, we'll simulate saving to localStorage
      const projectData = {
        template: currentTemplate,
        timestamp: new Date().toISOString(),
        sessionTime
      };
      
      const savedProjects = JSON.parse(localStorage.getItem('saved-projects') || '[]');
      savedProjects.push(projectData);
      localStorage.setItem('saved-projects', JSON.stringify(savedProjects));
      
      // Generate shareable URL (mock)
      const shareId = Math.random().toString(36).substr(2, 9);
      setShareUrl(`https://react-bangla.vercel.app/playground/${shareId}`);
      
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunChallenge = (challenge: Challenge) => {
    if (!currentTemplate) return;
    
    const mainFile = currentTemplate.files['/App.js']?.content || '';
    const passedTests = challenge.testCases.filter(test => test.test(mainFile));
    
    if (passedTests.length === challenge.testCases.length) {
      setCompletedChallenges(prev => [...prev, challenge.id]);
      // Award points for completing challenge
      if (lessonId) {
        // This would typically integrate with the learning system
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!currentTemplate) {
    return (
      <div className={styles.templateSelector}>
        <h2 className={styles.selectorTitle}>
          🚀 কোড প্লেগ্রাউন্ড <span className={styles.titleEn}>(Code Playground)</span>
        </h2>
        <p className={styles.selectorDescription}>
          একটি টেমপ্লেট বেছে নিন এবং কোডিং শুরু করুন
        </p>
        <div className={styles.templateGrid}>
          {defaultTemplates.map(template => (
            <div
              key={template.id}
              className={styles.templateCard}
              onClick={() => handleTemplateChange(template)}
            >
              <h3 className={styles.templateName}>{template.nameBn}</h3>
              <p className={styles.templateDesc}>{template.descriptionBn}</p>
              <div className={styles.templateCategory}>
                {template.category === 'basic' && '🔰 শুরুর স্তর'}
                {template.category === 'components' && '🧩 কম্পোনেন্ট'}
                {template.category === 'hooks' && '🎣 হুকস'}
                {template.category === 'advanced' && '⚡ উন্নত'}
                {template.category === 'projects' && '🏗️ প্রজেক্ট'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.playground} ${isFullscreen ? styles.fullscreen : ''}`}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button 
            onClick={() => setCurrentTemplate(null)}
            className={styles.toolbarButton}
          >
            ← টেমপ্লেট
          </button>
          <span className={styles.templateInfo}>
            {currentTemplate.nameBn}
          </span>
        </div>
        
        <div className={styles.toolbarRight}>
          <div className={styles.timeTracker}>
            ⏱️ {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
          </div>
          
          {customChallenges.length > 0 && (
            <button 
              onClick={() => setShowChallenges(!showChallenges)}
              className={styles.toolbarButton}
            >
              🎯 চ্যালেঞ্জ ({completedChallenges.length}/{customChallenges.length})
            </button>
          )}
          
          {enableSharing && (
            <button 
              onClick={handleSaveProject}
              disabled={isSaving}
              className={styles.toolbarButton}
            >
              {isSaving ? '💾 সেভ হচ্ছে...' : '💾 সেভ'}
            </button>
          )}
          
          <button 
            onClick={toggleFullscreen}
            className={styles.toolbarButton}
          >
            {isFullscreen ? '🔲 ছোট' : '⛶ ফুলস্ক্রিন'}
          </button>
        </div>
      </div>

      {/* Share URL Modal */}
      {shareUrl && (
        <div className={styles.shareModal}>
          <div className={styles.shareContent}>
            <h3>🎉 প্রজেক্ট সেভ হয়েছে!</h3>
            <p>আপনার প্রজেক্ট শেয়ার করুন:</p>
            <div className={styles.shareUrl}>
              <input type="text" value={shareUrl} readOnly />
              <button 
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className={styles.copyButton}
              >
                কপি
              </button>
            </div>
            <button 
              onClick={() => setShareUrl(null)}
              className={styles.closeButton}
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      {/* Challenges Panel */}
      {showChallenges && customChallenges.length > 0 && (
        <div className={styles.challengesPanel}>
          <h3>🎯 চ্যালেঞ্জসমূহ</h3>
          {customChallenges.map(challenge => (
            <div 
              key={challenge.id} 
              className={`${styles.challenge} ${
                completedChallenges.includes(challenge.id) ? styles.completed : ''
              }`}
            >
              <div className={styles.challengeHeader}>
                <h4>{challenge.titleBn}</h4>
                <span className={styles.challengePoints}>🏆 {challenge.points}</span>
              </div>
              <p>{challenge.descriptionBn}</p>
              <button 
                onClick={() => handleRunChallenge(challenge)}
                className={styles.runButton}
                disabled={completedChallenges.includes(challenge.id)}
              >
                {completedChallenges.includes(challenge.id) ? '✅ সম্পন্ন' : '▶️ চালান'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Playground */}
      <div className={styles.sandpackContainer}>
        <SandpackProvider
          template="react"
          files={Object.fromEntries(
            Object.entries(currentTemplate.files).map(([path, file]) => [
              path,
              file.content
            ])
          )}
          customSetup={{
            dependencies: currentTemplate.dependencies || {}
          }}
          theme="light"
        >
          <SandpackLayout>
            {showFileExplorer && <SandpackFileExplorer />}
            <SandpackCodeEditor 
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              style={{ height: isFullscreen ? 'calc(100vh - 60px)' : '500px' }}
            />
            <SandpackPreview 
              showOpenInCodeSandbox={false}
              showRefreshButton
              style={{ height: isFullscreen ? 'calc(100vh - 60px)' : '500px' }}
            />
          </SandpackLayout>
          {showConsole && (
            <SandpackConsole 
              style={{ height: isFullscreen ? '200px' : '150px' }}
            />
          )}
        </SandpackProvider>
      </div>
    </div>
  );
}