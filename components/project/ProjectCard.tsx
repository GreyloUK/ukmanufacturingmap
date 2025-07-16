import React from 'react';
import { UKProject } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/currency';
import { formatDateShort } from '../../utils/date';
import { getIndustryColour, getStatusColour } from '../../utils/map-utils';

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
  const statusColour = getStatusColour(project.status);

  return (
    <div
      className={`bg-dark-700 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 cursor-pointer group ${
        isSelected ? 'ring-2 ring-mint-400 shadow-lg' : ''
      } ${className} project-card`}
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
            <h3 className="text-lg font-semibold text-white group-hover:text-mint-400 transition-colors font-sans">
              {project.projectName}
            </h3>
            <p className="text-gray-300 text-sm mt-1 font-sans">
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
            <span className="text-xs text-gray-400 mt-1 font-sans">
              {project.industry.category}
            </span>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400 font-sans">Investment</p>
            <p className="text-xl font-bold text-white font-sans">
              {project.investment.displayAmount}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-sans">Jobs Created</p>
            <p className="text-xl font-bold text-white font-sans">
              {formatNumber(project.employment.jobsCreated)}
            </p>
          </div>
        </div>

        {/* Location and timeline */}
        <div className="space-y-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-400 font-sans">Location:</span>
            <span className="text-white font-medium font-sans">
              {project.location.city}, {project.location.region}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-400 font-sans">Timeline:</span>
            <span className="text-white font-medium font-sans">
              {formatDateShort(project.timeline.startDate)} - {formatDateShort(project.timeline.expectedCompletionDate)}
            </span>
          </div>
          {project.employment.jobsRetained && project.employment.jobsRetained > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 font-sans">Jobs Retained:</span>
              <span className="text-white font-medium font-sans">
                {formatNumber(project.employment.jobsRetained)}
              </span>
            </div>
          )}
        </div>

        {/* Government support */}
        {project.governmentSupport && (
          <div className="mt-4 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-purple-300 font-sans">
                Government Support
              </span>
            </div>
            <p className="text-sm text-purple-200 font-sans">
              {project.governmentSupport.amount && formatCurrency(project.governmentSupport.amount)} {project.governmentSupport.type}
            </p>
            <p className="text-xs text-purple-200 mt-1 font-sans">
              {project.governmentSupport.description}
            </p>
          </div>
        )}

        {/* Description */}
        <div className="mt-4">
          <p className="text-sm text-gray-300 line-clamp-3 font-sans">
            {project.description}
          </p>
        </div>

        {/* Footer with source info */}
        <div className="mt-4 pt-4 border-t border-dark-600">
          <div className="flex items-center justify-between text-xs text-gray-400 font-sans">
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