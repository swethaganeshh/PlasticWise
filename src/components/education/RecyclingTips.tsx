import React from 'react';
import { Trash2, Heater as Water, Tag, Droplets, Recycle, ShoppingBag, Clock, AlertCircle } from 'lucide-react';

const RecyclingTips: React.FC = () => {
  const tips = [
    {
      icon: <Water className="h-10 w-10 text-blue-500" />,
      title: 'Clean Before Recycling',
      description: 'Rinse containers to remove food residue and contaminants. Dirty items can contaminate an entire batch of recyclables.'
    },
    {
      icon: <Tag className="h-10 w-10 text-purple-500" />,
      title: 'Check the Label',
      description: 'Look for recycling symbols and numbers on plastic items to identify the type of plastic and its recyclability.'
    },
    {
      icon: <Trash2 className="h-10 w-10 text-red-500" />,
      title: 'Know What\'s Accepted',
      description: 'Learn what your local recycling program accepts. Items that aren\'t accepted can cause problems in the recycling process.'
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-green-500" />,
      title: 'Reduce & Reuse First',
      description: 'Remember that reducing consumption and reusing items are more environmentally friendly than recycling.'
    },
    {
      icon: <Droplets className="h-10 w-10 text-teal-500" />,
      title: 'Remove Caps & Lids',
      description: 'Different plastic types may need to be separated. Check local guidelines about removing caps from bottles.'
    },
    {
      icon: <AlertCircle className="h-10 w-10 text-yellow-500" />,
      title: 'Avoid Wish-Cycling',
      description: 'Don\'t put items in recycling just hoping they can be recycled. This can contaminate entire batches.'
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Recycling Tips
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Make your recycling efforts more effective with these practical tips
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {tip.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
            <Clock className="h-16 w-16" />
          </div>
          <div className="md:w-3/4">
            <h3 className="text-xl font-bold mb-2">
              Did You Know?
            </h3>
            <p className="mb-4">
              It takes up to 1,000 years for plastic to decompose in landfills. By recycling properly, you can help reduce the environmental impact of plastic waste.
            </p>
            <div className="flex justify-center md:justify-start">
              <a 
                href="https://www.epa.gov/recycle" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-white text-green-700 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                <Recycle size={18} className="mr-2" />
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingTips;