import Link from 'next/link';
import React from 'react';

export default function Custom404Page() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '8rem',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem'
      }}>
        404
      </div>
      
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        পেজ খুঁজে পাওয়া যায়নি
      </h1>
      
      <p style={{
        fontSize: '1.2rem',
        color: '#6b7280',
        marginBottom: '3rem',
        maxWidth: '600px',
        lineHeight: '1.7'
      }}>
        দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি আর বিদ্যমান নেই অথবা সরানো হয়েছে। 🙁<br/>
        নিচের লিংক থেকে আপনি আমাদের টিউটোরিয়াল পেজগুলোতে যেতে পারেন।
      </p>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '3rem'
      }}>
        <Link 
          href="/"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          🏠 হোমপেজে যান
        </Link>
        
        <Link 
          href="/learn-react-quick-start-guide"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          📚 React শিখা শুরু করুন
        </Link>
      </div>
      
      <div style={{
        padding: '2rem',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#374151',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          🤔 কি খুঁজছিলেন?
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          fontSize: '1rem'
        }}>
          <Link 
            href="/learn-react-quick-start-guide" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            🚀 Quick Start Guide
          </Link>
          <Link 
            href="/learn-react-describing-the-ui" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            🎨 Describing The UI
          </Link>
          <Link 
            href="/learn-react-adding-interactivity" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            ⚡ Adding Interactivity
          </Link>
          <Link 
            href="/learn-react-managing-state" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            🔄 Managing State
          </Link>
          <Link 
            href="/thinking-in-react" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            🧠 Thinking in React
          </Link>
          <Link 
            href="/jogakhicuri-projects" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            💻 জোগাখিচুরি প্রজেক্টসমূহ
          </Link>
        </div>
      </div>
      
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '0.9rem'
      }}>
        সমস্যা অব্যাহত থাকলে{' '}
        <Link 
          href="https://github.com/codedbyMojnu/react-bangla-tutorial/issues" 
          target="_blank"
          style={{ color: '#667eea', textDecoration: 'none' }}
        >
          GitHub এ রিপোর্ট করুন
        </Link>
      </div>
    </div>
  );
}