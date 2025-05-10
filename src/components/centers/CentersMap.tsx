import React from 'react';
import { mockRecyclingCenters } from '../../data/mockData';
import { Map as MapIcon } from 'lucide-react';

// This is a placeholder component since we can't actually implement Google Maps in this environment
// In a real application, this would use the Google Maps JavaScript API
const CentersMap: React.FC = () => {
  return (
    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-600 dark:text-gray-400">
        <MapIcon size={48} className="mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Map View</h3>
        <p className="text-sm text-center px-4">
          In a real application, this would display a Google Maps view of the recycling centers.
          <br />
          {mockRecyclingCenters.length} centers would be shown on this map.
        </p>
      </div>
    </div>
  );
};

export default CentersMap;