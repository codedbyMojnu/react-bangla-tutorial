import { useState } from 'react';

export default function Reveal({ children, label = 'Click to see the solution' }: { children: React.ReactNode, label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: '1em 0' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: '#eee',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0.5em 1em',
          cursor: 'pointer',
          fontWeight: 500,
        }}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="reveal-content"
      >
        {open ? 'Hide Solution' : label}
      </button>
      {open && (
        <div
          id="reveal-content"
          style={{
            marginTop: '0.5em',
            background: '#f9f9f9',
            border: '1px solid #eee',
            borderRadius: '4px',
            padding: '1em',
            transition: 'all 0.2s',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
} 