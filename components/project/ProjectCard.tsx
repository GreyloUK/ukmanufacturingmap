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
  const industryColour = getIndustryColour(project.industry.category);
  const statusColour = getStatusColour(project.status);

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 cursor-pointer group ${
        isSelected ? 'ring-2 ring-blue-400 shadow-lg' : ''
      } ${className}`}
      style={{ borderLeftColor: industryColour }}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colours">
              {project.projectName}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {project.companyName}
            </p>
          </div>
          <div className="ml-4 flex flex-col items-end">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: statusColour }}
            >
              {project.status}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {project.industry.category}
            </span>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Investment</p>
            <p className="text-xl font-bold text-gray-900">
              {project.investment.displayAmount}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jobs Created</p>
            <p className="text-xl font-bold text-gray-900">
              {formatNumber(project.employment.jobsCreated)}
            </p>
          </div>
        </div>

        {/* Location and timeline */}
        <div className="space-y-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-500">Location:</span>
            <span className="text-gray-900 font-medium">
              {project.location.city}, {project.location.region}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-500">Timeline:</span>
            <span className="text-gray-900 font-medium">
              {formatDateShort(project.timeline.startDate)} - {formatDateShort(project.timeline.expectedCompletionDate)}
            </span>
          </div>
          {project.employment.jobsRetained && project.employment.jobsRetained > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-500">Jobs Retained:</span>
              <span className="text-gray-900 font-medium">
                {formatNumber(project.employment.jobsRetained)}
              </span>
            </div>
          )}
        </div>

        {/* Government support */}
        {project.governmentSupport && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-blue-900">
                Government Support
              </span>
            </div>
            <p className="text-sm text-blue-800">
              {project.governmentSupport.amount && formatCurrency(project.governmentSupport.amount)} {project.governmentSupport.type}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {project.governmentSupport.description}
            </p>
          </div>
        )}

        {/* Description */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Footer with source info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
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