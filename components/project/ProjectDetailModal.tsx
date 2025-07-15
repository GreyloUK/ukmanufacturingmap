import React, { useEffect } from 'react';
import { UKProject } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/currency';
import { formatDateShort } from '../../utils/date';
import { getIndustryColour, getStatusColour } from '../../utils/map-utils';

interface ProjectDetailModalProps {
  project: UKProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const industryColour = getIndustryColour(project.industry.category);
  const statusColour = getStatusColour(project.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-dark-700 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-dark-700 border-b border-dark-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: industryColour }}
            />
            <div>
              <h2 className="text-xl font-bold text-white font-sans">
                {project.projectName}
              </h2>
              <p className="text-gray-300 font-sans">{project.companyName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-600 rounded-lg transition-colors text-gray-300 hover:text-white"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-mint-500/20 p-4 rounded-lg border border-mint-500/30">
              <div className="text-sm text-mint-400 font-medium font-sans">Total Investment</div>
              <div className="text-2xl font-bold text-white font-sans">
                {project.investment.displayAmount}
              </div>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/30">
              <div className="text-sm text-purple-400 font-medium font-sans">Jobs Created</div>
              <div className="text-2xl font-bold text-white font-sans">
                {formatNumber(project.employment.jobsCreated)}
              </div>
            </div>
            <div className="bg-dark-600 p-4 rounded-lg border border-dark-500">
              <div className="text-sm text-gray-400 font-medium font-sans">Status</div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white font-sans"
                  style={{ backgroundColor: statusColour }}
                >
                  {project.status}
                </span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 font-sans">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-sans">Industry:</span>
                    <span className="font-medium text-white font-sans">{project.industry.category}</span>
                  </div>
                  {project.industry.subcategory && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-sans">Subcategory:</span>
                      <span className="font-medium text-white font-sans">{project.industry.subcategory}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-sans">Location:</span>
                    <span className="font-medium text-white font-sans">{project.location.city}, {project.location.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-sans">Postcode:</span>
                    <span className="font-medium text-white font-sans">{project.location.postcode}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 font-sans">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-sans">Announced:</span>
                    <span className="font-medium text-white font-sans">{formatDateShort(project.timeline.announcementDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-sans">Start Date:</span>
                    <span className="font-medium text-white font-sans">{formatDateShort(project.timeline.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-sans">Expected Completion:</span>
                    <span className="font-medium text-white font-sans">{formatDateShort(project.timeline.expectedCompletionDate)}</span>
                  </div>
                  {project.timeline.actualCompletionDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-sans">Actual Completion:</span>
                      <span className="font-medium text-white font-sans">{formatDateShort(project.timeline.actualCompletionDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Employment */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 font-sans">Employment Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-sans">Jobs Created:</span>
                    <span className="font-medium text-white font-sans">{formatNumber(project.employment.jobsCreated)}</span>
                  </div>
                  {project.employment.jobsRetained && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-sans">Jobs Retained:</span>
                      <span className="font-medium text-white font-sans">{formatNumber(project.employment.jobsRetained)}</span>
                    </div>
                  )}
                  {project.employment.jobTypes.length > 0 && (
                    <div>
                      <span className="text-gray-400 font-sans">Job Types:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.employment.jobTypes.map((jobType, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-600 text-gray-300 font-sans"
                          >
                            {jobType}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 font-sans">Description</h3>
                <p className="text-gray-300 leading-relaxed font-sans">{project.description}</p>
              </div>

              {/* Government Support */}
              {project.governmentSupport && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 font-sans">Government Support</h3>
                  <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-purple-300 font-sans">{project.governmentSupport.type}</span>
                    </div>
                    {project.governmentSupport.amount && (
                      <p className="text-purple-200 font-medium mb-2 font-sans">
                        {formatCurrency(project.governmentSupport.amount)}
                      </p>
                    )}
                    <p className="text-sm text-purple-200 font-sans">{project.governmentSupport.description}</p>
                  </div>
                </div>
              )}

              {/* Sources */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 font-sans">Sources</h3>
                <div className="space-y-3">
                  {project.sources.map((source, index) => (
                    <div key={index} className="border border-dark-600 rounded-lg p-3 bg-dark-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-mint-400 hover:text-mint-300 font-medium text-sm font-sans"
                          >
                            {source.title}
                          </a>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 font-sans">
                            <span>{source.type}</span>
                            <span>{formatDateShort(source.date)}</span>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;