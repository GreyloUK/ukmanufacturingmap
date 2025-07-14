import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  onFiltersToggle: () => void;
  showFilters: boolean;
  projectCount: number;
  totalInvestment: number;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  onFiltersToggle,
  showFilters,
  projectCount,
  totalInvestment,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const formatInvestment = (amount: number) => {
    if (amount >= 1_000_000_000) {
      return `£${(amount / 1_000_000_000).toFixed(1)}bn`;
    } else if (amount >= 1_000_000) {
      return `£${(amount / 1_000_000).toFixed(0)}m`;
    } else {
      return `£${amount.toLocaleString('en-GB')}`;
    }
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center min-w-0">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UK</span>
              </div>
            </div>
            <div className="ml-3 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                UK Manufacturing Megaprojects
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Investments over £250 million
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {projectCount}
              </div>
              <div className="text-sm text-gray-500">
                Project{projectCount !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatInvestment(totalInvestment)}
              </div>
              <div className="text-sm text-gray-500">
                Total Investment
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 lg:w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Mobile Search Button */}
            <button className="sm:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Filter Toggle */}
            <button
              onClick={onFiltersToggle}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                showFilters
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span className="hidden sm:inline">Filters</span>
            </button>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
              <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md">
                Map
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="md:hidden px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-around text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {projectCount}
            </div>
            <div className="text-xs text-gray-500">
              Project{projectCount !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="h-8 w-px bg-gray-300"></div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatInvestment(totalInvestment)}
            </div>
            <div className="text-xs text-gray-500">
              Total Investment
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;