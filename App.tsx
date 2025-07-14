import React from 'react';
import Layout from './components/layout/Layout';
import { UKProject } from './types';
import './styles/globals.css';

// Import sample data
import sampleProjects from './data/sample-projects.json';

const App: React.FC = () => {
  // Cast the imported JSON to our TypeScript interface
  const projects: UKProject[] = sampleProjects as UKProject[];

  return (
    <div className="App">
      <Layout projects={projects} />
    </div>
  );
};

export default App;