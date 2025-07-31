import React from 'react';
import { useThemeStore } from '../../store/themeStore';

interface HeaderProps {
  projectCount: number;
  totalInvestment: number;
  totalJobs: number;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  projectCount,
  totalInvestment,
  totalJobs,
  className = ''
}) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const formatInvestment = (amount: number) => {
    if (amount >= 1_000_000_000) {
      return `£${(amount / 1_000_000_000).toFixed(1)}bn`;
    } else if (amount >= 1_000_000) {
      return `£${(amount / 1_000_000).toFixed(0)}m`;
    } else {
      return `£${amount.toLocaleString('en-GB')}`;
    }
  };

  const formatJobs = (jobs: number) => {
    if (jobs >= 1000) {
      return `${(jobs / 1000).toFixed(0)}k+`;
    }
    return jobs.toLocaleString('en-GB');
  };

  return (
    <header className={`${isDarkMode ? 'header-gradient shadow-xl border-b border-dark-700' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl border-b border-blue-200'} transition-all duration-500 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-6 lg:py-8 gap-6 lg:gap-8">
          {/* Logo, Title, and Theme Toggle */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-sans">
                  UK MANUFACTURING
                </h1>
                <div className="text-xl lg:text-2xl font-bold text-gradient-mint font-sans">
                  MEGAPROJECTS
                </div>
              </div>
            </div>
              <p className="text-sm lg:text-base text-gray-300 font-medium mt-1">
                Manufacturing Project Investments &gt; £250m
              </p>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`group relative ${isDarkMode ? 'bg-dark-600/80 hover:bg-dark-500/80 border-2 border-mint-400/30 hover:border-mint-400/60' : 'bg-white/20 hover:bg-white/30 border-2 border-white/50 hover:border-white/80'} rounded-full p-4 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg ${isDarkMode ? 'hover:shadow-mint-400/25' : 'hover:shadow-white/25'}`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Sun Icon (Light Mode) */}
                <svg 
                  className={`absolute w-8 h-8 text-yellow-400 transition-all duration-500 transform ${isDarkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
                
                {/* Moon Icon (Dark Mode) */}
                <svg 
                  className={`absolute w-8 h-8 text-blue-300 transition-all duration-500 transform ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'}`}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
                </svg>
              </div>
              
              {/* Status Text */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`${isDarkMode ? 'bg-dark-800 text-white' : 'bg-white text-gray-800 shadow-lg'} text-xs px-2 py-1 rounded whitespace-nowrap font-medium`}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </div>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            <div className="bg-dark-700/70 backdrop-blur-sm rounded-xl px-6 py-4 border border-blue-500/30 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {projectCount}
                  </div>
                  <div className="text-sm font-semibold text-blue-400">
                    Projects
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-700/70 backdrop-blur-sm rounded-xl px-6 py-4 border border-mint-500/30 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-mint-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-mint-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {formatInvestment(totalInvestment)}
                  </div>
                  <div className="text-sm font-semibold text-mint-400">
                    Investment
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-700/70 backdrop-blur-sm rounded-xl px-6 py-4 border border-purple-500/30 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {formatJobs(totalJobs)}
                  </div>
                  <div className="text-sm font-semibold text-purple-400">
                    New Jobs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;