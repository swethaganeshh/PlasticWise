import React from 'react';
import Layout from '../components/layout/Layout';
import PlasticGuide from '../components/education/PlasticGuide';
import RecyclingTips from '../components/education/RecyclingTips';

const EducationPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Learn About Plastic Recycling
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Understand different types of plastics, their environmental impact, and how to recycle them properly.
          </p>
        </div>
        
        <div className="mb-16">
          <PlasticGuide />
        </div>
        
        <div className="mb-16">
          <RecyclingTips />
        </div>
      </div>
    </Layout>
  );
};

export default EducationPage;