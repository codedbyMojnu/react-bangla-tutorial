import React from 'react';

const CustomFooter = () => {
  return (
    <footer style={{
      padding: '2rem',
      borderTop: '1px solid #eaeaea',
      textAlign: 'center',
      background: '#fff',
    }}>
      <p>© {new Date().getFullYear()} React JS Bangla Tutorial.</p>
    </footer>
  );
};

export default CustomFooter;
