import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, MapPin, BookOpen, ArrowRight, Recycle } from 'lucide-react';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/30 to-blue-500/30 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-slideInLeft">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Recycle Smarter with AI-Powered Plastic Identification
                </h1>
                <p className="text-xl mb-8 text-green-50 leading-relaxed">
                  Upload a photo of any plastic item and instantly learn if it's recyclable and how to dispose of it properly.
                </p>
                <Link
                  to="/upload"
                  className="group inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-full font-medium hover:bg-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <Upload size={22} className="mr-2 transition-transform group-hover:rotate-12" />
                  Upload Your Plastic
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 animate-slideInRight">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl animate-pulse-slow"></div>
                <div className="glass-effect rounded-2xl p-1 transform hover:scale-[1.02] transition-all duration-500 group">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="https://images.pexels.com/photos/6963622/pexels-photo-6963622.jpeg"
                      alt="Sustainable recycling concept"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ height: '500px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white/90 dark:bg-gray-900/90 p-4 rounded-full shadow-lg transform rotate-12 animate-float">
                    <Recycle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-16">
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
                className="group bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Link 
                  to={feature.link}
                  className={`inline-flex items-center text-${feature.color}-600 dark:text-${feature.color}-400 hover:text-${feature.color}-700 dark:hover:text-${feature.color}-300 group-hover:gap-2 transition-all duration-300`}
                >
                  Try it now <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 animate-pulse-slow"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who are making smarter recycling decisions with PlasticWise. 
            Every plastic item correctly recycled helps reduce environmental impact.
          </p>
          <Link
            to="/upload"
            className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Start Recycling Smarter
            <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;