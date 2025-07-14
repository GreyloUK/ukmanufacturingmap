import { UKProject, ProjectMarker, ClusterMarker } from '../types';

/**
 * UK map bounds and default viewport
 */
export const UK_BOUNDS = {
  north: 60.8566,
  south: 49.8597,
  east: 1.7681,
  west: -8.6500
};

export const UK_DEFAULT_VIEWPORT = {
  latitude: 54.7023,
  longitude: -3.2765,
  zoom: 5.5,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 }
};

/**
 * Convert projects to map markers
 */
export function projectsToMarkers(projects: UKProject[]): ProjectMarker[] {
  return projects.map(project => ({
    id: project.id,
    coordinates: [project.location.coordinates.longitude, project.location.coordinates.latitude],
    project
  }));
}

/**
 * Cluster markers by distance
 */
export function clusterMarkers(markers: ProjectMarker[], zoomLevel: number): (ProjectMarker | ClusterMarker)[] {
  if (zoomLevel > 8) return markers; // No clustering at high zoom
  
  const clustered: (ProjectMarker | ClusterMarker)[] = [];
  const processed = new Set<string>();
  const threshold = zoomLevel < 6 ? 1 : 0.5; // Cluster distance threshold
  
  markers.forEach(marker => {
    if (processed.has(marker.id)) return;
    
    const nearby = markers.filter(other => {
      if (processed.has(other.id) || other.id === marker.id) return false;
      
      const distance = Math.sqrt(
        Math.pow(marker.coordinates[0] - other.coordinates[0], 2) +
        Math.pow(marker.coordinates[1] - other.coordinates[1], 2)
      );
      
      return distance < threshold;
    });
    
    if (nearby.length > 0) {
      const allProjects = [marker.project, ...nearby.map(n => n.project)];
      const centerLat = allProjects.reduce((sum, p) => sum + p.location.coordinates.latitude, 0) / allProjects.length;
      const centerLng = allProjects.reduce((sum, p) => sum + p.location.coordinates.longitude, 0) / allProjects.length;
      
      clustered.push({
        id: `cluster-${marker.id}`,
        coordinates: [centerLng, centerLat],
        projects: allProjects,
        count: allProjects.length
      });
      
      processed.add(marker.id);
      nearby.forEach(n => processed.add(n.id));
    } else {
      clustered.push(marker);
      processed.add(marker.id);
    }
  });
  
  return clustered;
}

/**
 * Get industry colour coding
 */
export function getIndustryColour(category: string): string {
  const colours: Record<string, string> = {
    'Semiconductor': '#3B82F6', // Blue
    'Automotive': '#10B981', // Green
    'Battery': '#F59E0B', // Amber
    'Renewable Energy': '#059669', // Emerald
    'Metals': '#6B7280', // Gray
    'Aerospace': '#8B5CF6', // Purple
    'Pharmaceuticals': '#EF4444', // Red
    'Food & Beverage': '#F97316', // Orange
    'Textiles': '#EC4899', // Pink
    'Other': '#6B7280' // Gray
  };
  
  return colours[category] || colours['Other'];
}

/**
 * Get status colour coding
 */
export function getStatusColour(status: string): string {
  const colours: Record<string, string> = {
    'Announced': '#3B82F6', // Blue
    'Planning': '#F59E0B', // Amber
    'Construction': '#10B981', // Green
    'Operational': '#059669', // Emerald
    'Cancelled': '#EF4444', // Red
    'Delayed': '#F97316' // Orange
  };
  
  return colours[status] || colours['Announced'];
}