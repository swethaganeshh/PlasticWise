import React, { useState } from 'react';
import { plasticEducation } from '../../data/mockData';
import { ChevronRight, ChevronDown } from 'lucide-react';

const PlasticGuide: React.FC = () => {
  const [expandedType, setExpandedType] = useState<string | null>(null);

  const toggleExpanded = (type: string) => {
    setExpandedType(expandedType === type ? null : type);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Guide to Plastic Types
      </h2>
      
      <div className="space-y-4">
        {plasticEducation.map((plastic) => (
          <div 
            key={plastic.type} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200"
          >
            <div 
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleExpanded(plastic.type)}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {plastic.type}
              </h3>
              {expandedType === plastic.type ? 
                <ChevronDown className="text-gray-500 dark:text-gray-400" size={20} /> : 
                <ChevronRight className="text-gray-500 dark:text-gray-400" size={20} />
              }
            </div>
            
            {expandedType === plastic.type && (
              <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {plastic.description}
                    </p>
                    
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                      Common Items
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400">
                      {plastic.commonItems.map((item, index) => (
                        <li key={index} className="flex items-start mb-1">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recyclability
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {plastic.recyclability}
                    </p>
                    
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                      Environmental Impact
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {plastic.environmentalImpact}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlasticGuide;