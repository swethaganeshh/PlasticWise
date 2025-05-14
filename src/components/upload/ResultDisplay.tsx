import React from 'react';
import { ChevronRight, Check, X, Recycle, ArrowLeft, MapPin, Leaf, Award, Zap } from 'lucide-react';
import { useUpload } from '../../context/UploadContext';
import { Link } from 'react-router-dom';

const ResultDisplay: React.FC = () => {
  const { result, resetUpload } = useUpload();

  if (!result) return null;

  // Calculate environmental impact
  const environmentalImpact = {
    co2: Math.round(Math.random() * (2.5 - 0.5) + 0.5), // Random CO2 savings between 0.5-2.5kg
    water: Math.round(Math.random() * (50 - 10) + 10), // Random water savings between 10-50L
    energy: Math.round(Math.random() * (5 - 1) + 1), // Random energy savings between 1-5kWh
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 animate-fadeIn">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Analysis Result</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Based on your uploaded image
            </p>
          </div>
          
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-6">
            <img
              src={result.image}
              alt="Uploaded plastic item"
              className="object-contain w-full h-full"
            />
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Environmental Impact
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Leaf className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-green-700 dark:text-green-300">{environmentalImpact.co2}kg</div>
                <div className="text-xs text-green-600 dark:text-green-400">CO₂ Saved</div>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-green-700 dark:text-green-300">{environmentalImpact.energy}kWh</div>
                <div className="text-xs text-green-600 dark:text-green-400">Energy Saved</div>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-green-700 dark:text-green-300">{environmentalImpact.water}L</div>
                <div className="text-xs text-green-600 dark:text-green-400">Water Saved</div>
              </div>
            </div>
          </div>

          <button
            onClick={resetUpload}
            className="flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
          >
            <ArrowLeft size={16} className="mr-1" />
            Upload another image
          </button>
        </div>
        
        <div className="md:w-1/2 bg-gray-50 dark:bg-gray-900 p-6">
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Identified as</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">
              {result.type}
            </h3>
            
            <div className="flex items-center mt-3">
              <div className={`
                flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${result.recyclable 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }
              `}>
                {result.recyclable 
                  ? <><Check size={16} className="mr-1" /> Recyclable</> 
                  : <><X size={16} className="mr-1" /> Not Commonly Recyclable</>
                }
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">
              Recycling Guide
            </h4>
            <div className="space-y-4">
              {result.suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <ChevronRight size={18} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/centers"
              className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 group"
            >
              <MapPin size={18} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
              Find Nearby Recycling Centers
            </Link>
            <Link
              to="/education"
              className="flex items-center justify-center w-full px-4 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg transition-colors duration-200 group"
            >
              <Recycle size={18} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Learn More About Plastic Types
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;