import React from 'react';
import { UKProject } from './types';
import Layout from './components/layout/Layout';

// Import sample data
import sampleProjects from './data/sample-projects.json';

const App: React.FC = () => {
  // Cast the imported JSON to our TypeScript interface
  const projects: UKProject[] = sampleProjects as UKProject[];

  return <Layout projects={projects} />;
};

export default App;