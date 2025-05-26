import React from 'react';
import Header from '../components/Header';
import CreateChallenge from '../components/CreateChallenge';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        <CreateChallenge />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;