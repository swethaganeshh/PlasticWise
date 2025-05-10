import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import CentersList from '../components/centers/CentersList';
import CentersMap from '../components/centers/CentersMap';
import { List, MapPin } from 'lucide-react';

const CentersPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Recycling Centers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find local recycling facilities that accept various types of plastic waste. Filter by plastic type to find the best location for your recycling needs.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              <List size={18} className="mr-2" />
              List View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <MapPin size={18} className="mr-2" />
              Map View
            </button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {viewMode === 'list' ? <CentersList /> : <CentersMap />}
        </div>
      </div>
    </Layout>
  );
};

export default CentersPage;