import React, { useEffect } from 'react';

interface SelectionCriteriaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectionCriteriaModal: React.FC<SelectionCriteriaModalProps> = ({
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
            <div className="w-4 h-4 bg-mint-500 rounded-full" />
            <h2 className="text-xl font-bold text-white font-sans">
              Project Selection Criteria
            </h2>
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
          <div className="space-y-8">
            {/* Investment Scale */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-sans">Investment Scale</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Minimum threshold:</span>
                  <span className="font-medium text-white font-sans">£250 million or higher</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Range:</span>
                  <span className="font-medium text-white font-sans">From £250m up to £4bn+</span>
                </div>
                <p className="text-sm text-gray-300 font-sans">
                  Focus on major capital investments that reshape UK industrial capabilities
                </p>
              </div>
            </div>

            {/* Geographic Scope */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-sans">Geographic Scope</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">UK-focused:</span>
                  <span className="font-medium text-white font-sans">England, Wales, Scotland, Northern Ireland</span>
                </div>
                <p className="text-sm text-gray-300 font-sans">
                  Distributed across all UK regions and nations
                </p>
                <p className="text-sm text-gray-300 font-sans">
                  Emphasis on projects that strengthen regional economies
                </p>
              </div>
            </div>

            {/* Strategic Industries */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-sans">Strategic Industries</h3>
              <p className="text-gray-300 mb-4 font-sans">
                Projects concentrate on sectors critical to the UK's industrial future:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-dark-600 p-4 rounded-lg border border-dark-500">
                  <h4 className="font-semibold text-mint-400 mb-2 font-sans">Clean Energy & Net Zero</h4>
                  <p className="text-sm text-gray-300 font-sans">
                    EV batteries, offshore wind, hydrogen production, green steel
                  </p>
                </div>
                <div className="bg-dark-600 p-4 rounded-lg border border-dark-500">
                  <h4 className="font-semibold text-purple-400 mb-2 font-sans">Advanced Manufacturing</h4>
                  <p className="text-sm text-gray-300 font-sans">
                    Semiconductors, pharmaceuticals, biologics, precision engineering
                  </p>
                </div>
                <div className="bg-dark-600 p-4 rounded-lg border border-dark-500">
                  <h4 className="font-semibold text-blue-400 mb-2 font-sans">Automotive Transition</h4>
                  <p className="text-sm text-gray-300 font-sans">
                    Electric vehicle production and battery manufacturing
                  </p>
                </div>
                <div className="bg-dark-600 p-4 rounded-lg border border-dark-500">
                  <h4 className="font-semibold text-orange-400 mb-2 font-sans">Critical Materials</h4>
                  <p className="text-sm text-gray-300 font-sans">
                    Lithium processing, battery materials, specialty chemicals
                  </p>
                </div>
                <div className="bg-dark-600 p-4 rounded-lg border border-dark-500 md:col-span-2">
                  <h4 className="font-semibold text-red-400 mb-2 font-sans">Defence & Aerospace</h4>
                  <p className="text-sm text-gray-300 font-sans">
                    Next-generation manufacturing capabilities
                  </p>
                </div>
              </div>
            </div>

            {/* Employment Impact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-sans">Employment Impact</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Job Creation:</span>
                  <span className="font-medium text-white font-sans">Typically 150-6,000+ new high-skilled positions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Job Retention:</span>
                  <span className="font-medium text-white font-sans">Protecting existing employment through modernization</span>
                </div>
                <p className="text-sm text-gray-300 font-sans">
                  Focus on engineering, manufacturing, R&D, and technology roles
                </p>
              </div>
            </div>

            {/* Strategic Importance */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-sans">Strategic Importance</h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm text-gray-300 font-sans">
                  • Projects often supported by UK government funding, grants, or guarantees
                </p>
                <p className="text-sm text-gray-300 font-sans">
                  • Alignment with UK Industrial Strategy and Net Zero commitments
                </p>
                <p className="text-sm text-gray-300 font-sans">
                  • First-of-kind or game-changing investments in the UK
                </p>
                <p className="text-sm text-gray-300 font-sans">
                  • Contribute to supply chain resilience and economic security
                </p>
              </div>
            </div>

            {/* Timeline & Status */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-sans">Timeline & Status</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Recent announcements:</span>
                  <span className="font-medium text-white font-sans">Projects announced primarily 2021-2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Development stages:</span>
                  <span className="font-medium text-white font-sans">From planning through to operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Future-focused:</span>
                  <span className="font-medium text-white font-sans">Most completion dates extend to 2027-2032</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionCriteriaModal;