import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      id="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
    </button>
  );
};

export default ThemeToggle;
