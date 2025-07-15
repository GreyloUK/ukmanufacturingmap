import React, { useState, useMemo } from 'react';
import { UKProject, ProjectFilters } from '../../types';
import Header from './Header';
import UKMap from '../map/UKMap';
import ProjectCard from '../project/ProjectCard';
import ProjectFiltersComponent from '../project/ProjectFilters';
import ProjectDetailModal from '../project/ProjectDetailModal';
import LoadingState from '../common/LoadingState';
import ErrorBoundary from '../common/ErrorBoundary';

interface LayoutProps {
  projects: UKProject[];
  isLoading?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ projects, isLoading = false }) => {
  const [selectedProject, setSelectedProject] = useState<UKProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('investment-desc');
  const [filters, setFilters] = useState<ProjectFilters>({
    regions: [],
    industries: [],
    investmentRange: { min: 0, max: Infinity },
    timelineRange: { startDate: '', endDate: '' },
    status: [],
    searchTerm: ''
  });

  const filteredAndSortedProjects = useMemo(() => {
    // First apply filters
    const filtered = projects.filter(project => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          project.projectName.toLowerCase().includes(searchLower) ||
          project.companyName.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.location.city.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Region filter
      if (filters.regions.length > 0) {
        if (!filters.regions.includes(project.location.region)) return false;
      }

      // Industry filter
      if (filters.industries.length > 0) {
        if (!filters.industries.includes(project.industry.category)) return false;
      }

      // Investment range filter
      if (filters.investmentRange.min > 0 || filters.investmentRange.max < Infinity) {
        const amount = project.investment.amount;
        if (amount < filters.investmentRange.min || amount > filters.investmentRange.max) {
          return false;
        }
      }

      // Status filter
      if (filters.status.length > 0) {
        if (!filters.status.includes(project.status)) return false;
      }

      return true;
    });

    // Then apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'investment-desc':
          return b.investment.amount - a.investment.amount;
        case 'investment-asc':
          return a.investment.amount - b.investment.amount;
        case 'date-desc':
          return new Date(b.timeline.announcementDate).getTime() - new Date(a.timeline.announcementDate).getTime();
        case 'date-asc':
          return new Date(a.timeline.announcementDate).getTime() - new Date(b.timeline.announcementDate).getTime();
        case 'jobs-desc':
          return b.employment.jobsCreated - a.employment.jobsCreated;
        case 'alphabetical':
          return a.projectName.localeCompare(b.projectName);
        default:
          return 0;
      }
    });
  }, [projects, filters, sortBy]);

  const totalInvestment = useMemo(() => {
    return filteredAndSortedProjects.reduce((sum, project) => sum + project.investment.amount, 0);
  }, [filteredAndSortedProjects]);

  const totalJobs = useMemo(() => {
    return filteredAndSortedProjects.reduce((sum, project) => sum + project.employment.jobsCreated, 0);
  }, [filteredAndSortedProjects]);

  const handleProjectSelect = (project: UKProject | null) => {
    setSelectedProject(project);
  };

  const handleProjectClick = (project: UKProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header projectCount={0} totalInvestment={0} totalJobs={0} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingState message="Loading manufacturing projects..." />
        </main>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-900">
        <Header
          projectCount={filteredAndSortedProjects.length}
          totalInvestment={totalInvestment}
          totalJobs={totalJobs}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 xl:w-96">
              <div className="sticky top-8">
                <ProjectFiltersComponent
                  filters={filters}
                  onFiltersChange={setFilters}
                  className="shadow-lg"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Map Section */}
              <div className="bg-dark-700 rounded-xl shadow-lg mb-8">
                <div className="p-6 border-b border-dark-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white font-sans">
                        Project Locations
                      </h2>
                      <p className="text-sm text-gray-300 mt-1 font-sans">
                        {filteredAndSortedProjects.length} project{filteredAndSortedProjects.length !== 1 ? 's' : ''} across the UK
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-sans">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Interactive Map
                    </div>
                  </div>
                </div>
                <div className="h-[500px] sm:h-[600px]">
                  <ErrorBoundary fallback={
                    <div className="h-full flex items-center justify-center bg-dark-800 rounded-lg">
                      <div className="text-center">
                        <p className="text-gray-300 mb-4 font-sans">Unable to load map</p>
                        <p className="text-sm text-gray-400 font-sans">Please check your internet connection and try again</p>
                      </div>
                    </div>
                  }>
                    <UKMap
                      projects={filteredAndSortedProjects}
                      selectedProject={selectedProject}
                      onProjectSelect={handleProjectSelect}
                      className="h-full"
                    />
                  </ErrorBoundary>
                </div>
              </div>

              {/* Projects List */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-sans">
                      Manufacturing Projects
                    </h2>
                    <p className="text-sm text-gray-300 mt-1 font-sans">
                      Detailed view of all projects
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 text-sm border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-mint-500 bg-dark-600 text-white font-sans"
                    >
                      <option value="investment-desc">Investment (High to Low)</option>
                      <option value="investment-asc">Investment (Low to High)</option>
                      <option value="date-desc">Most Recent</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="jobs-desc">Jobs (High to Low)</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                    <button className="px-4 py-2 text-sm bg-dark-600 text-gray-300 rounded-lg hover:bg-dark-500 transition-colors font-sans">
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      List View
                    </button>
                  </div>
                </div>

                {filteredAndSortedProjects.length === 0 ? (
                  <div className="bg-dark-700 rounded-xl shadow-lg p-16 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-dark-600 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 font-sans">No projects found</h3>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto font-sans">
                      Try adjusting your filters or search terms to find projects that match your criteria.
                    </p>
                    <button 
                      onClick={() => setFilters({
                        regions: [],
                        industries: [],
                        investmentRange: { min: 0, max: Infinity },
                        timelineRange: { startDate: '', endDate: '' },
                        status: [],
                        searchTerm: ''
                      })}
                      className="px-6 py-2 bg-mint-500 text-dark-900 rounded-lg hover:bg-mint-600 transition-colors font-sans font-semibold"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredAndSortedProjects.map(project => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => handleProjectClick(project)}
                        isSelected={selectedProject?.id === project.id}
                        className="transform transition-all duration-200 hover:scale-[1.01]"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;