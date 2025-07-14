import React, { useState, useMemo } from 'react';
import { UKProject, ProjectFilters } from '../../types';
import Header from './Header';
import UKMap from '../map/UKMap';
import ProjectCard from '../project/ProjectCard';
import ProjectFiltersComponent from '../project/ProjectFilters';

interface LayoutProps {
  projects: UKProject[];
}

const Layout: React.FC<LayoutProps> = ({ projects }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<UKProject | null>(null);
  const [filters, setFilters] = useState<ProjectFilters>({
    regions: [],
    industries: [],
    investmentRange: { min: 0, max: Infinity },
    timelineRange: { startDate: '', endDate: '' },
    status: [],
    searchTerm: ''
  });

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
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
  }, [projects, filters]);

  const totalInvestment = useMemo(() => {
    return filteredProjects.reduce((sum, project) => sum + project.investment.amount, 0);
  }, [filteredProjects]);

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleProjectSelect = (project: UKProject | null) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onFiltersToggle={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
        projectCount={filteredProjects.length}
        totalInvestment={totalInvestment}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 xl:w-96 ${showFilters ? 'block' : 'hidden lg:block'}`}>
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
            <div className="bg-white rounded-xl shadow-lg mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Project Locations
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} across the UK
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Interactive Map
                  </div>
                </div>
              </div>
              <div className="h-[500px] sm:h-[600px]">
                <UKMap
                  projects={filteredProjects}
                  selectedProject={selectedProject}
                  onProjectSelect={handleProjectSelect}
                  className="h-full"
                />
              </div>
            </div>

            {/* Projects List */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Manufacturing Projects
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Detailed view of all projects
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="investment-desc">Investment (High to Low)</option>
                    <option value="investment-asc">Investment (Low to High)</option>
                    <option value="date-desc">Most Recent</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="jobs-desc">Jobs (High to Low)</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                  <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    List View
                  </button>
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No projects found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
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
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => handleProjectSelect(project)}
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
    </div>
  );
};

export default Layout;