import React from 'react';
import './styles/globals.css';

const SimpleTestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Test */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🧪 Simplified UK Manufacturing Projects
          </h1>
          <p className="text-gray-600 mt-1">Testing basic layout and styles</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search projects..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>All Industries</option>
                    <option>Automotive</option>
                    <option>Battery</option>
                    <option>Renewable Energy</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {/* Map Section */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Project Locations</h2>
              </div>
              <div className="h-64 bg-blue-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-gray-600">Interactive Map Would Be Here</p>
                  <p className="text-sm text-gray-500">
                    Mapbox Token: {import.meta.env.VITE_MAPBOX_TOKEN ? '✅ Set' : '❌ Missing'}
                  </p>
                </div>
              </div>
            </div>

            {/* Project Cards */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Sample Projects</h2>
              
              {[
                { name: 'Britishvolt Gigafactory', company: 'Britishvolt', investment: '£2.6bn', location: 'Blyth' },
                { name: 'Halewood EV Production', company: 'Jaguar Land Rover', investment: '£500m', location: 'Halewood' },
                { name: 'SMR Programme', company: 'Rolls-Royce', investment: '£400m', location: 'Derby' }
              ].map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-gray-600">{project.company}</p>
                      <p className="text-sm text-gray-500">{project.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{project.investment}</p>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleTestApp; 