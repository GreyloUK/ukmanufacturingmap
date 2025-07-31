import React from 'react';
import { useThemeStore } from '../../store/themeStore';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  className = ''
}) => {
  const { isDarkMode } = useThemeStore();
  
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className={`animate-spin rounded-full border-2 w-full h-full ${isDarkMode ? 'border-gray-600 border-t-mint-500' : 'border-gray-300 border-t-mint-600'}`}></div>
    </div>
  );
};

export default LoadingSpinner;