import React from 'react';

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
    <header className={`header-gradient shadow-xl border-b border-dark-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-6 lg:py-8 gap-6 lg:gap-8">
          {/* Logo and Title */}
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
                  MEGA PROJECTS
                </div>
              </div>
            </div>
            <p className="text-sm lg:text-base text-gray-300 font-medium mt-1">
              Manufacturing Project Investments &gt; £250m
            </p>
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