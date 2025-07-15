import React, { useState, useEffect } from 'react';
import { UKProject } from './types';
import Layout from './components/layout/Layout';

// Import sample data
import sampleProjects from './data/sample-projects.json';

const App: React.FC = () => {
  const [projects, setProjects] = useState<UKProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setProjects(sampleProjects as UKProject[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <Layout projects={projects} isLoading={isLoading} />;
};

export default App;