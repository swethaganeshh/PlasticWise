import React from 'react';
import { impactStatistics } from '../../data/mockData';
import { Leaf, Droplets, Zap } from 'lucide-react';

const ImpactCounter: React.FC = () => {
  const [count, setCount] = React.useState(impactStatistics.plasticsRecycled);
  
  // Simulate counter increasing occasionally
  React.useEffect(() => {
    const interval = setInterval(() => {
      const shouldIncrease = Math.random() > 0.7; // 30% chance of increasing
      if (shouldIncrease) {
        setCount(prevCount => prevCount + 1);
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Our Impact So Far</h2>
          <p className="text-green-100 mt-2">Together, we're making a difference</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">{count.toLocaleString()}</div>
            <div className="text-sm uppercase tracking-wider">Plastics Recycled</div>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Leaf className="mr-2" size={20} />
              <span className="text-3xl font-bold">{impactStatistics.co2Saved.toLocaleString()}</span>
            </div>
            <div className="text-sm uppercase tracking-wider">kg CO₂ Saved</div>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Droplets className="mr-2" size={20} />
              <span className="text-3xl font-bold">{impactStatistics.waterSaved.toLocaleString()}</span>
            </div>
            <div className="text-sm uppercase tracking-wider">Liters of Water Saved</div>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Zap className="mr-2" size={20} />
              <span className="text-3xl font-bold">{impactStatistics.energySaved.toLocaleString()}</span>
            </div>
            <div className="text-sm uppercase tracking-wider">kWh Energy Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCounter;