import React, { useEffect } from 'react';
import { UKProject } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/currency';
import { formatDateShort } from '../../utils/date';
import { getIndustryColour, getStatusColour } from '../../utils/map-utils';
import { useThemeStore } from '../../store/themeStore';

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
  const { isDarkMode } = useThemeStore();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      <div className={`relative ${isDarkMode ? 'bg-dark-700' : 'bg-white'} rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className={`sticky top-0 ${isDarkMode ? 'bg-dark-700 border-b border-dark-600' : 'bg-white border-b border-gray-200'} px-6 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: industryColour }}
            />
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>
                {project.projectName}
              </h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-sans`}>{project.companyName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 ${isDarkMode ? 'hover:bg-dark-600 text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'} rounded-lg transition-colors`}
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
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-mint-500/20 border-mint-500/30' : 'bg-mint-50 border-mint-200'}`}>
              <div className={`text-sm font-medium font-sans ${isDarkMode ? 'text-mint-400' : 'text-mint-700'}`}>Total Investment</div>
              <div className={`text-2xl font-bold font-sans ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.investment.displayAmount}
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-purple-500/20 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
              <div className={`text-sm font-medium font-sans ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>Jobs Created</div>
              <div className={`text-2xl font-bold font-sans ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatNumber(project.employment.jobsCreated)}
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-dark-600 border-dark-500' : 'bg-gray-50 border-gray-200'}`}>
              <div className={`text-sm font-medium font-sans ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</div>
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
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 font-sans`}>Project Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Industry:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{project.industry.category}</span>
                  </div>
                  {project.industry.subcategory && (
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Subcategory:</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{project.industry.subcategory}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Location:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{project.location.city}, {project.location.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Postcode:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{project.location.postcode}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 font-sans`}>Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Announced:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{formatDateShort(project.timeline.announcementDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Start Date:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{formatDateShort(project.timeline.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Expected Completion:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{formatDateShort(project.timeline.expectedCompletionDate)}</span>
                  </div>
                  {project.timeline.actualCompletionDate && (
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Actual Completion:</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{formatDateShort(project.timeline.actualCompletionDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Employment */}
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 font-sans`}>Employment Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Jobs Created:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{formatNumber(project.employment.jobsCreated)}</span>
                  </div>
                  {project.employment.jobsRetained && (
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Jobs Retained:</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} font-sans`}>{formatNumber(project.employment.jobsRetained)}</span>
                    </div>
                  )}
                  {project.employment.jobTypes.length > 0 && (
                    <div>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-sans`}>Job Types:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.employment.jobTypes.map((jobType, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${isDarkMode ? 'bg-dark-600 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
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
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 font-sans`}>Description</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed font-sans`}>{project.description}</p>
              </div>

              {/* Government Support */}
              {project.governmentSupport && (
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 font-sans`}>Government Support</h3>
                  <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-purple-500/20 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className={`font-medium font-sans ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>{project.governmentSupport.type}</span>
                    </div>
                    {project.governmentSupport.amount && (
                      <p className={`font-medium mb-2 font-sans ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                        {formatCurrency(project.governmentSupport.amount)}
                      </p>
                    )}
                    <p className={`text-sm font-sans ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>{project.governmentSupport.description}</p>
                  </div>
                </div>
              )}

              {/* Sources */}
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 font-sans`}>Sources</h3>
                <div className="space-y-3">
                  {project.sources.map((source, index) => (
                    <div key={index} className={`border rounded-lg p-3 ${isDarkMode ? 'border-dark-600 bg-dark-600' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-medium text-sm font-sans ${isDarkMode ? 'text-mint-400 hover:text-mint-300' : 'text-mint-600 hover:text-mint-700'}`}
                          >
                            {source.title}
                          </a>
                          <div className={`flex items-center gap-4 mt-1 text-xs font-sans ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span>{source.type}</span>
                            <span>{formatDateShort(source.date)}</span>
                          </div>
                        </div>
                        <svg className={`w-4 h-4 flex-shrink-0 ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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