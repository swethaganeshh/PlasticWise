import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-slideInLeft">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Recycle Smarter with AI-Powered Plastic Identification
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Upload a photo of any plastic item and instantly learn if it's recyclable and how to dispose of it properly.
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Upload size={20} className="mr-2" />
                Upload Your Plastic
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12 animate-slideInRight">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl animate-pulse-slow"></div>
                <div className="glass-effect rounded-xl p-6 transform hover:scale-102 transition-transform duration-300 animate-float">
                  <img
                    src="https://images.pexels.com/photos/3735215/pexels-photo-3735215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Plastic recycling concept"
                    className="rounded-lg shadow-2xl w-full object-cover"
                    style={{ height: '400px' }}
                  />
                </div>
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
            {[
              {
                icon: <Upload className="h-8 w-8 text-green-600 dark:text-green-400" />,
                title: "Upload & Identify",
                description: "Take a photo of any plastic item and our AI will identify its type and recyclability within seconds.",
                link: "/upload",
                color: "green"
              },
              {
                icon: <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Find Recycling Centers",
                description: "Discover nearby recycling facilities that accept your specific type of plastic waste.",
                link: "/centers",
                color: "blue"
              },
              {
                icon: <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
                title: "Learn About Plastics",
                description: "Educate yourself about different plastic types, their environmental impact, and best recycling practices.",
                link: "/education",
                color: "purple"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-full w-16 h-16 flex items-center justify-center mb-4 animate-float`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <Link 
                  to={feature.link}
                  className={`inline-flex items-center text-${feature.color}-600 dark:text-${feature.color}-400 hover:text-${feature.color}-700 dark:hover:text-${feature.color}-300`}
                >
                  Try it now <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are making smarter recycling decisions with PlasticWise. 
            Every plastic item correctly recycled helps reduce environmental impact.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
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