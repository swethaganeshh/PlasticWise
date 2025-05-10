import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ImpactCounter from '../common/ImpactCounter';

interface LayoutProps {
  children: React.ReactNode;
  showCounter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showCounter = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        {children}
        {showCounter && <ImpactCounter />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;