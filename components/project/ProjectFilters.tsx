import React, { useState } from 'react';
import { ProjectFilters as FilterType } from '../../types';

interface ProjectFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  className?: string;
}

const INDUSTRY_OPTIONS = [
  'Semiconductor',
  'Automotive',
  'Battery',
  'Renewable Energy',
  'Metals',
  'Aerospace',
  'Pharmaceuticals',
  'Food & Beverage',
  'Textiles',
  'Other'
];

const REGION_OPTIONS = [
  'England',
  'Scotland',
  'Wales',
  'Northern Ireland'
];

const STATUS_OPTIONS = [
  'Announced',
  'Planning',
  'Construction',
  'Operational',
  'Cancelled',
  'Delayed'
];

const INVESTMENT_RANGES = [
  { label: 'All investments', min: 0, max: Infinity },
  { label: '£250m - £500m', min: 250000000, max: 500000000 },
  { label: '£500m - £1bn', min: 500000000, max: 1000000000 },
  { label: '£1bn - £2bn', min: 1000000000, max: 2000000000 },
  { label: '£2bn+', min: 2000000000, max: Infinity }
];

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFiltersChange,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIndustryChange = (industry: string) => {
    const newIndustries = filters.industries.includes(industry)
      ? filters.industries.filter(i => i !== industry)
      : [...filters.industries, industry];
    
    onFiltersChange({
      ...filters,
      industries: newIndustries
    });
  };

  const handleRegionChange = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    
    onFiltersChange({
      ...filters,
      regions: newRegions
    });
  };

  const handleStatusChange = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    onFiltersChange({
      ...filters,
      status: newStatuses
    });
  };

  const handleInvestmentRangeChange = (range: { min: number; max: number }) => {
    onFiltersChange({
      ...filters,
      investmentRange: range
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({
      ...filters,
      searchTerm
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      regions: [],
      industries: [],
      investmentRange: { min: 0, max: Infinity },
      timelineRange: { startDate: '', endDate: '' },
      status: [],
      searchTerm: ''
    });
  };

  const activeFiltersCount = 
    filters.regions.length + 
    filters.industries.length + 
    filters.status.length + 
    (filters.investmentRange.min > 0 || filters.investmentRange.max < Infinity ? 1 : 0) +
    (filters.searchTerm ? 1 : 0);

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {activeFiltersCount} active
              </span>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects, companies, locations..."
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="mt-3 w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="p-6 space-y-8">
          {/* Industry Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h4 className="font-semibold text-gray-900">Industry</h4>
              {filters.industries.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {filters.industries.length}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {INDUSTRY_OPTIONS.map(industry => (
                <label key={industry} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.industries.includes(industry)}
                    onChange={() => handleIndustryChange(industry)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{industry}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h4 className="font-semibold text-gray-900">Region</h4>
              {filters.regions.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {filters.regions.length}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {REGION_OPTIONS.map(region => (
                <label key={region} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.regions.includes(region)}
                    onChange={() => handleRegionChange(region)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Investment Range Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <h4 className="font-semibold text-gray-900">Investment Size</h4>
            </div>
            <select
              value={`${filters.investmentRange.min}-${filters.investmentRange.max}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                handleInvestmentRangeChange({ min, max });
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {INVESTMENT_RANGES.map(range => (
                <option key={range.label} value={`${range.min}-${range.max}`}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-semibold text-gray-900">Status</h4>
              {filters.status.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {filters.status.length}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {STATUS_OPTIONS.map(status => (
                <label key={status} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => handleStatusChange(status)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;