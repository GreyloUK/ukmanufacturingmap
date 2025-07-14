import React, { useState } from 'react';
import { UKProject } from '../../types';
import { formatNumber } from '../../utils/currency';
import { getIndustryColour, getStatusColour } from '../../utils/map-utils';

interface FallbackMapProps {
  projects: UKProject[];
  selectedProject?: UKProject | null;
  onProjectSelect: (project: UKProject | null) => void;
  className?: string;
}

const FallbackMap: React.FC<FallbackMapProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  className = ''
}) => {
  const [hoveredProject, setHoveredProject] = useState<UKProject | null>(null);

  // Simple UK map representation with regions
  const ukRegions = [
    { name: 'Scotland', x: 30, y: 15, width: 40, height: 35 },
    { name: 'Northern Ireland', x: 5, y: 35, width: 20, height: 20 },
    { name: 'England', x: 25, y: 45, width: 50, height: 45 },
    { name: 'Wales', x: 15, y: 55, width: 15, height: 25 }
  ];

  const getProjectPosition = (project: UKProject) => {
    // Simple positioning based on region
    const basePositions = {
      'Scotland': { x: 45, y: 30 },
      'Northern Ireland': { x: 15, y: 45 },
      'England': { x: 50, y: 65 },
      'Wales': { x: 22, y: 67 }
    };

    const base = basePositions[project.location.region] || basePositions['England'];
    // Add some randomness to avoid overlap
    const randomOffset = Math.random() * 10 - 5;
    return {
      x: base.x + randomOffset,
      y: base.y + randomOffset
    };
  };

  return (
    <div className={`relative bg-blue-50 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-md max-h-96 mx-auto">
          {/* UK Map Outline */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          >
            {/* UK Regions */}
            {ukRegions.map((region) => (
              <rect
                key={region.name}
                x={region.x}
                y={region.y}
                width={region.width}
                height={region.height}
                fill="#e5e7eb"
                stroke="#9ca3af"
                strokeWidth="0.5"
                rx="2"
              />
            ))}
            
            {/* Project Markers */}
            {projects.map((project) => {
              const position = getProjectPosition(project);
              const isSelected = selectedProject?.id === project.id;
              const industryColour = getIndustryColour(project.industry.category);
              const statusColour = getStatusColour(project.status);
              
              return (
                <g key={project.id}>
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={isSelected ? "3" : "2"}
                    fill={industryColour}
                    stroke="white"
                    strokeWidth="0.5"
                    className="cursor-pointer hover:r-3 transition-all"
                    onClick={() => onProjectSelect(project)}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                  />
                  <circle
                    cx={position.x + 1}
                    cy={position.y - 1}
                    r="0.8"
                    fill={statusColour}
                    stroke="white"
                    strokeWidth="0.2"
                  />
                </g>
              );
            })}
          </svg>
          
          {/* Hover Tooltip */}
          {hoveredProject && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-64 z-10">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                {hoveredProject.projectName}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {hoveredProject.companyName}
              </p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>
                  <span className="font-medium">Investment:</span> {hoveredProject.investment.displayAmount}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {hoveredProject.location.city}, {hoveredProject.location.region}
                </p>
                <p>
                  <span className="font-medium">Jobs:</span> {formatNumber(hoveredProject.employment.jobsCreated)}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {hoveredProject.status}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Map Title */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-sm p-2">
        <h3 className="text-sm font-semibold text-gray-900">UK Manufacturing Projects</h3>
        <p className="text-xs text-gray-600">{projects.length} projects</p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-48">
        <h4 className="font-semibold text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Semiconductor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Automotive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            <span>Battery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <span>Renewable Energy</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t">
          <p className="text-xs text-gray-500">
            Small dots show project status
          </p>
        </div>
      </div>
      
      {/* Fallback Notice */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1">
        <p className="text-xs text-yellow-800">
          Simplified map view (set VITE_MAPBOX_TOKEN for interactive map)
        </p>
      </div>
    </div>
  );
};

export default FallbackMap;