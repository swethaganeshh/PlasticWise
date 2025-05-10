import React from 'react';
import { Recycle, Heart, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Recycle size={24} className="text-green-600 dark:text-green-400" />
              <span className="ml-2 text-lg font-bold">PlasticWise</span>
            </div>
            <p className="text-sm mb-4">
              Helping you make smarter decisions about plastic recycling through AI-powered identification and education.
            </p>
            <div className="flex items-center">
              <span className="text-sm">Made with</span>
              <Heart size={16} className="mx-1 text-red-500" />
              <span className="text-sm">for a cleaner planet</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/" 
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/upload" 
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  Upload & Identify
                </a>
              </li>
              <li>
                <a 
                  href="/centers" 
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  Recycling Centers
                </a>
              </li>
              <li>
                <a 
                  href="/education" 
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  Learn About Plastics
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Resources</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-green-600 dark:text-green-400" />
                <a 
                  href="mailto:contact@plasticwise.example.com" 
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  contact@plasticwise.example.com
                </a>
              </li>
              <li className="flex items-center">
                <ExternalLink size={16} className="mr-2 text-green-600 dark:text-green-400" />
                <a 
                  href="https://example.com/recycling-resources" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  Recycling Resources
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} PlasticWise. All rights reserved.</p>
          <p className="mt-2 text-xs">
            This is a demo project. In a real application, AI image classification would be connected to a proper backend.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;