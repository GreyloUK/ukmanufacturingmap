import React, { useState, useCallback, useRef } from 'react';
import Map, { Marker, Popup, ViewState } from 'react-map-gl';
import { UKProject, ProjectMarker, ClusterMarker } from '../../types';
import { 
  UK_DEFAULT_VIEWPORT, 
  projectsToMarkers, 
  clusterMarkers, 
  getIndustryColour, 
  getStatusColour 
} from '../../utils/map-utils';
import { formatNumber } from '../../utils/currency';

interface UKMapProps {
  projects: UKProject[];
  selectedProject?: UKProject | null;
  onProjectSelect: (project: UKProject | null) => void;
  className?: string;
}

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
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full border-2 border-white shadow-lg hover:bg-blue-700 transition-colours">
              <span className="text-sm font-bold">{item.count}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border border-white"></div>
          </div>
        </Marker>
      );
    }

    const project = item.project;
    const isSelected = selectedProject?.id === project.id;
    const industryColour = getIndustryColour(project.industry.category);
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
            className={`w-8 h-8 rounded-full border-2 border-white shadow-lg ${
              isSelected ? 'ring-4 ring-blue-400' : ''
            }`}
            style={{ backgroundColor: industryColour }}
          >
            <div
              className="absolute top-0 right-0 w-3 h-3 rounded-full border border-white"
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
      <div className={`relative ${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <div className="text-center p-8">
          <p className="text-gray-600">Map unavailable - Missing MapBox token</p>
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
        mapStyle="mapbox://styles/mapbox/light-v11"
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
              <h3 className="font-semibold text-gray-900 mb-1">
                {hoveredProject.projectName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
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
          </Popup>
        )}
      </Map>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-48">
        <h4 className="font-semibold text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span>Multiple projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <span>Single project</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t">
          <p className="text-xs text-gray-500">
            Status indicators on markers show project progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default UKMap;