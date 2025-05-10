import React from 'react';
import { Recycle, Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-green-600 dark:text-green-400 transition-colors duration-200"
        >
          <Recycle size={32} />
          <span className="text-xl font-bold">PlasticWise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/upload" 
            className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
          >
            Upload
          </Link>
          <Link 
            to="/centers" 
            className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
          >
            Recycling Centers
          </Link>
          <Link 
            to="/education" 
            className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
          >
            Learn
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg transition-colors duration-200">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload
            </Link>
            <Link 
              to="/centers" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Recycling Centers
            </Link>
            <Link 
              to="/education" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <div className="flex items-center py-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <span className="ml-3 text-gray-700 dark:text-gray-200">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;