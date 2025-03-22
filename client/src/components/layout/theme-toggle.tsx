import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDarkMode(savedTheme === 'dark' || (savedTheme === 'system' && prefersDark));
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.setAttribute('data-theme', 'light');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      
      if (newMode) {
        document.documentElement.classList.add('dark');
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      
      return newMode;
    });
  };
  
  return (
    <Switch
      checked={isDarkMode}
      onCheckedChange={toggleTheme}
      aria-label="Toggle dark mode"
    />
  );
}
