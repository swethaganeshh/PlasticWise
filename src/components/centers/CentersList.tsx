import React, { useState } from 'react';
import { mockRecyclingCenters } from '../../data/mockData';
import { PlasticType } from '../../types';
import { MapPin, Phone, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const CentersList: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<PlasticType | 'ALL'>('ALL');
  
  const filteredCenters = filterType === 'ALL' 
    ? mockRecyclingCenters 
    : mockRecyclingCenters.filter(center => 
        center.acceptedTypes.includes(filterType as PlasticType)
      );

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Plastic Type
        </label>
        <select
          id="filter-type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as PlasticType | 'ALL')}
          className="w-full md:w-64 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="ALL">All Centers</option>
          {Object.values(PlasticType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-4">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <div 
              key={center.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-all duration-200"
            >
              <div 
                className="p-4 cursor-pointer flex justify-between items-start"
                onClick={() => toggleExpanded(center.id)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {center.name}
                  </h3>
                  <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="mr-1 flex-shrink-0" />
                    <span className="text-sm">{center.address}</span>
                  </div>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {expandedId === center.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === center.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Accepted Plastic Types
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {center.acceptedTypes.map((type) => (
                        <span 
                          key={type} 
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                        >
                          {type.split(' ')[0]} {/* Just display the short code */}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    {center.phone && (
                      <a 
                        href={`tel:${center.phone}`}
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        <Phone size={16} className="mr-1" />
                        {center.phone}
                      </a>
                    )}
                    
                    {center.website && (
                      <a 
                        href={center.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        <Globe size={16} className="mr-1" />
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            <p>No recycling centers found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CentersList;