import React, { useState, useCallback, useRef } from 'react';
import Map, { Marker, Popup, ViewState } from 'react-map-gl';
import { UKProject, ProjectMarker, ClusterMarker } from '../../types';
import { 
  UK_DEFAULT_VIEWPORT, 
  projectsToMarkers, 
  clusterMarkers, 
  getStatusColour 
} from '../../utils/map-utils';
import { formatNumber } from '../../utils/currency';

interface UKMapProps {
  projects: UKProject[];
  selectedProject?: UKProject | null;
  onProjectSelect: (project: UKProject | null) => void;
  className?: string;
}

// Industry icons
const getIndustryIcon = (industry: string) => {
  const iconProps = { className: "w-4 h-4 text-white", fill: "currentColor" };
  
  switch (industry) {
    case 'Semiconductor':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M17 16v6H3v-6H1V8h2V2h14v6h2v8h-2zM5 4v12h10V4H5zm2 2h6v2H7V6zm0 4h6v2H7v-2zm0 4h6v2H7v-2z"/>
        </svg>
      );
    case 'Automotive':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      );
    case 'Battery':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V5.33C17 4.6 16.4 4 15.67 4z"/>
        </svg>
      );
    case 'Renewable Energy':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
        </svg>
      );
    case 'Metals':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M22 16v-11.5c0-.83-.67-1.5-1.5-1.5S19 3.67 19 4.5V16c0 .55-.45 1-1 1s-1-.45-1-1V4.5C17 3.67 16.33 3 15.5 3S14 3.67 14 4.5V16c0 .55-.45 1-1 1s-1-.45-1-1V4.5C12 3.67 11.33 3 10.5 3S9 3.67 9 4.5V16c0 .55-.45 1-1 1s-1-.45-1-1V4.5C7 3.67 6.33 3 5.5 3S4 3.67 4 4.5V16c0 .55-.45 1-1 1s-1-.45-1-1V4.5C2 3.67 1.33 3 .5 3v18h23V16z"/>
        </svg>
      );
    case 'Aerospace':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/>
        </svg>
      );
    case 'Pharmaceuticals':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M21,8c0-2.21-1.79-4-4-4H13V2h-2v2H7c-2.21,0-4,1.79-4,4v8c0,2.21,1.79,4,4,4h4v2h2v-2h4c2.21,0,4-1.79,4-4V8z M14,15h-4v-2h4V15z M14,11h-4V9h4V11z"/>
        </svg>
      );
    case 'Food & Beverage':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-.78-.78-2.05-.78-2.83 0-.78.78-.78 2.05 0 2.83l7.02 7.01zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
        </svg>
      );
    case 'Textiles':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
        </svg>
      );
    default: // 'Other'
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
  }
};

const UKMap: React.FC<UKMapProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  className = ''
}) => {
  const [viewport, setViewport] = useState<ViewState>(UK_DEFAULT_VIEWPORT);
  const [hoveredProject, setHoveredProject] = useState<UKProject | null>(null);
  const mapRef = useRef<any>(null);

  // Get Mapbox token (Vite uses VITE_ prefix)
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const markers = projectsToMarkers(projects);
  const clusteredMarkers = clusterMarkers(markers, viewport.zoom);

  const handleMarkerClick = useCallback((project: UKProject) => {
    onProjectSelect(project);
    setViewport(prev => ({
      ...prev,
      latitude: project.location.coordinates.latitude,
      longitude: project.location.coordinates.longitude,
      zoom: Math.max(prev.zoom, 8)
    }));
  }, [onProjectSelect]);

  const handleClusterClick = useCallback((cluster: ClusterMarker) => {
    const bounds = cluster.projects.reduce(
      (bounds, project) => {
        const { latitude, longitude } = project.location.coordinates;
        return {
          north: Math.max(bounds.north, latitude),
          south: Math.min(bounds.south, latitude),
          east: Math.max(bounds.east, longitude),
          west: Math.min(bounds.west, longitude)
        };
      },
      { north: -90, south: 90, east: -180, west: 180 }
    );

    if (mapRef.current) {
      mapRef.current.fitBounds(
        [[bounds.west, bounds.south], [bounds.east, bounds.north]],
        { padding: 100, duration: 1000 }
      );
    }
  }, []);

  const renderMarker = (item: ProjectMarker | ClusterMarker) => {
    const isCluster = 'count' in item;
    
    if (isCluster) {
      return (
        <Marker
          key={item.id}
          latitude={item.coordinates[1]}
          longitude={item.coordinates[0]}
          onClick={() => handleClusterClick(item)}
        >
          <div className="relative cursor-pointer group">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full border-2 border-dark-900 shadow-lg hover:bg-purple-600 transition-colors">
              <span className="text-sm font-bold">{item.count}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-mint-500 rounded-full border border-dark-900"></div>
          </div>
        </Marker>
      );
    }

    const project = item.project;
    const isSelected = selectedProject?.id === project.id;
    const statusColour = getStatusColour(project.status);

    return (
      <Marker
        key={project.id}
        latitude={project.location.coordinates.latitude}
        longitude={project.location.coordinates.longitude}
        onClick={() => handleMarkerClick(project)}
      >
        <div
          className={`relative cursor-pointer group transition-transform hover:scale-110 ${
            isSelected ? 'scale-125' : ''
          }`}
          onMouseEnter={() => setHoveredProject(project)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div
            className={`w-8 h-8 bg-mint-600 rounded-full border-2 border-dark-900 shadow-lg flex items-center justify-center ${
              isSelected ? 'ring-4 ring-mint-400' : ''
            }`}
          >
            {getIndustryIcon(project.industry.category)}
            <div
              className="absolute top-0 right-0 w-3 h-3 rounded-full border border-dark-900"
              style={{ backgroundColor: statusColour }}
            />
          </div>
        </div>
      </Marker>
    );
  };

  // Error handling for MapBox
  if (!mapboxToken) {
    return (
      <div className={`relative ${className} flex items-center justify-center bg-dark-800 rounded-lg`}>
        <div className="text-center p-8">
          <p className="text-gray-300 font-sans">Map unavailable - Missing MapBox token</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Map
        ref={mapRef}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={mapboxToken}
        style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
        onError={(error) => {
          console.warn('MapBox error:', error);
        }}
      >
        {clusteredMarkers.map(renderMarker)}
        
        {hoveredProject && (
          <Popup
            latitude={hoveredProject.location.coordinates.latitude}
            longitude={hoveredProject.location.coordinates.longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            className="map-popup"
          >
            <div className="p-3 min-w-64">
              <h3 className="font-semibold text-white mb-1 font-sans">
                {hoveredProject.projectName}
              </h3>
              <p className="text-sm text-gray-300 mb-2 font-sans">
                {hoveredProject.companyName}
              </p>
              <div className="space-y-1 text-xs text-gray-400 font-sans">
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
          </Popup>
        )}
      </Map>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-dark-700 rounded-lg shadow-lg p-3 max-w-48 border border-dark-600">
        <h4 className="font-semibold text-sm mb-2 text-white font-sans">Legend</h4>
        <div className="space-y-1 text-xs text-gray-300 font-sans">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span>Multiple projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-mint-600 rounded-full"></div>
            <span>Single project</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-dark-600">
          <p className="text-xs text-gray-400 font-sans">
            Status indicators on markers show project progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default UKMap;