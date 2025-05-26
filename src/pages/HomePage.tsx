import React from 'react';
import Header from '../components/Header';
import CreateChallenge from '../components/CreateChallenge';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <CreateChallenge />
      </main>
    </div>
  );
};

export default HomePage;