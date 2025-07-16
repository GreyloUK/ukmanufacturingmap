export interface UKProject {
  id: string;
  companyName: string;
  projectName: string;
  location: {
    city: string;
    region: 'England' | 'Scotland' | 'Wales' | 'Northern Ireland';
    postcode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  investment: {
    amount: number; // in GBP
    currency: 'GBP';
    displayAmount: string; // e.g., "£2.5bn"
  };
  industry: {
    category: 'Semiconductor' | 'Automotive' | 'Battery' | 'Renewable Energy' | 'Metals' | 'Aerospace' | 'Pharmaceuticals' | 'Food & Beverage' | 'Textiles' | 'Other';
    subcategory?: string;
  };
  timeline: {
    announcementDate: string; // ISO date
    startDate: string;
    expectedCompletionDate: string;
    actualCompletionDate?: string;
  };
  employment: {
    jobsCreated: number;
    jobsRetained?: number;
    jobTypes: string[];
  };
  status: 'Announced' | 'Planning' | 'Construction' | 'Operational' | 'Cancelled' | 'Delayed';
  sources: {
    url: string;
    title: string;
    date: string;
    type: 'Government' | 'Company' | 'Industry Report' | 'News';
  }[];
  governmentSupport?: {
    amount?: number;
    type: 'Grant' | 'Loan' | 'Tax Relief' | 'Other';
    description: string;
  };
  description: string;
  images?: string[];
}

export interface UKRegion {
  id: string;
  name: 'England' | 'Scotland' | 'Wales' | 'Northern Ireland';
  boundaries: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][];
  };
  centre: {
    latitude: number;
    longitude: number;
  };
  population: number;
  area: number; // in km²
}

export interface ProjectFilters {
  industries: string[];
  investmentRange: {
    min: number;
    max: number;
  };
  timelineRange: {
    startDate: string;
    endDate: string;
  };
  status: string[];
  searchTerm: string;
}

export interface ProjectStats {
  totalProjects: number;
  totalInvestment: number;
  totalJobs: number;
  byRegion: Record<string, {
    projects: number;
    investment: number;
    jobs: number;
  }>;
  byIndustry: Record<string, {
    projects: number;
    investment: number;
    jobs: number;
  }>;
  byStatus: Record<string, number>;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
}

export interface ProjectMarker {
  id: string;
  coordinates: [number, number];
  project: UKProject;
}

export interface ClusterMarker {
  id: string;
  coordinates: [number, number];
  projects: UKProject[];
  count: number;
}