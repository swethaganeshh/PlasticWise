import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Recycle Smarter with AI-Powered Plastic Identification
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Upload a photo of any plastic item and instantly learn if it's recyclable and how to dispose of it properly.
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 shadow-md"
              >
                <Upload size={20} className="mr-2" />
                Upload Your Plastic
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Plastic bottles ready for recycling"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            How PlasticWise Helps You Recycle
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                Upload & Identify
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Take a photo of any plastic item and our AI will identify its type and recyclability within seconds.
              </p>
              <Link 
                to="/upload"
                className="mt-4 inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                Find Recycling Centers
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover nearby recycling facilities that accept your specific type of plastic waste.
              </p>
              <Link 
                to="/centers"
                className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Find centers <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                Learn About Plastics
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Educate yourself about different plastic types, their environmental impact, and best recycling practices.
              </p>
              <Link 
                to="/education"
                className="mt-4 inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                Get educated <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are making smarter recycling decisions with PlasticWise. 
            Every plastic item correctly recycled helps reduce environmental impact.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-md"
          >
            Start Recycling Smarter
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;