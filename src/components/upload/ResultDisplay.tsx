import React from 'react';
import { ChevronRight, Check, X, Recycle, ArrowLeft, MapPin } from 'lucide-react';
import { useUpload } from '../../context/UploadContext';
import { Link } from 'react-router-dom';

const ResultDisplay: React.FC = () => {
  const { result, resetUpload } = useUpload();

  if (!result) return null;

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
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
              Recycling Suggestions
            </h4>
            <ul className="space-y-3">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="flex">
                  <ChevronRight size={18} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/centers"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
            >
              <MapPin size={18} className="mr-2" />
              Find Recycling Centers
            </Link>
            <Link
              to="/education"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-md transition-colors duration-200"
            >
              <Recycle size={18} className="mr-2" />
              Learn About Plastics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;