import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useThemeStore } from '../../store/themeStore';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  className = ''
}) => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <LoadingSpinner size="large" className="mb-4" />
      <p className={`text-lg font-sans ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message}</p>
    </div>
  );
};

export default LoadingState;