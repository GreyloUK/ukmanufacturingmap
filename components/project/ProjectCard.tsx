import React from 'react';
import { UKProject } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/currency';
import { formatDateShort } from '../../utils/date';
import { getStatusColour } from '../../utils/map-utils';
import { useThemeStore } from '../../store/themeStore';

interface ProjectCardProps {
  project: UKProject;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  isSelected = false,
  className = ''
}) => {
  const { isDarkMode } = useThemeStore();
  const statusColour = getStatusColour(project.status);

  return (
    <div
      className={`${isDarkMode ? 'bg-dark-700 border-dark-600' : 'bg-white border-gray-200'} rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-l-4 cursor-pointer group ${
        isSelected ? 'ring-2 ring-mint-400 shadow-lg' : ''
      } ${className} project-card border`}
      style={{ borderLeftColor: statusColour }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.projectName} by ${project.companyName}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white group-hover:text-mint-400' : 'text-gray-900 group-hover:text-mint-600'} transition-colors font-sans`}>
              {project.projectName}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mt-1 font-sans`}>
              {project.companyName}
            </p>
          </div>
          <div className="ml-4 flex flex-col items-end">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: statusColour }}
              aria-label={`Project status: ${project.status}`}
            >
              {project.status}
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 font-sans`}>
              {project.industry.category}
            </span>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-sans`}>Investment</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>
              {project.investment.displayAmount}
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-sans`}>Jobs Created</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>
              {formatNumber(project.employment.jobsCreated)}
            </p>
          </div>
        </div>

        {/* Location and timeline */}
        <div className="space-y-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-sans`}>Location:</span>
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium font-sans`}>
              {project.location.city}, {project.location.region}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-sans`}>Timeline:</span>
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium font-sans`}>
              {formatDateShort(project.timeline.startDate)} - {formatDateShort(project.timeline.expectedCompletionDate)}
            </span>
          </div>
          {project.employment.jobsRetained && project.employment.jobsRetained > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-sans`}>Jobs Retained:</span>
              <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium font-sans`}>
                {formatNumber(project.employment.jobsRetained)}
              </span>
            </div>
          )}
        </div>

        {/* Government support */}
        {project.governmentSupport && (
          <div className={`mt-4 p-3 rounded-lg border ${isDarkMode ? 'bg-purple-500/20 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className={`text-sm font-medium font-sans ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                Government Support
              </span>
            </div>
            <p className={`text-sm font-sans ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>
              {project.governmentSupport.amount && formatCurrency(project.governmentSupport.amount)} {project.governmentSupport.type}
            </p>
            <p className={`text-xs mt-1 font-sans ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>
              {project.governmentSupport.description}
            </p>
          </div>
        )}

        {/* Description */}
        <div className="mt-4">
          <p className={`text-sm line-clamp-3 font-sans ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {project.description}
          </p>
        </div>

        {/* Footer with source info */}
        <div className={`mt-4 pt-4 ${isDarkMode ? 'border-t border-dark-600' : 'border-t border-gray-200'}`}>
          <div className={`flex items-center justify-between text-xs font-sans ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>
              Announced {formatDateShort(project.timeline.announcementDate)}
            </span>
            <span>
              {project.sources.length} source{project.sources.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;