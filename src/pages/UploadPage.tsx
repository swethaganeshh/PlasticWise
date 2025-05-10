import React from 'react';
import Layout from '../components/layout/Layout';
import ImageUploader from '../components/upload/ImageUploader';
import ResultDisplay from '../components/upload/ResultDisplay';
import { useUpload } from '../context/UploadContext';

const UploadPage: React.FC = () => {
  const { result } = useUpload();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Upload Your Plastic
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Take a photo or upload an image of your plastic item and our AI will analyze it to tell you how to recycle it properly.
          </p>
        </div>
        
        {!result ? (
          <ImageUploader />
        ) : (
          <ResultDisplay />
        )}
        
        {!result && (
          <div className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Tips for Better Results
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                Ensure good lighting when taking photos
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                Center the plastic item in the frame
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                If possible, include any recycling symbols or numbers visible on the item
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                Clean the item before photographing for better identification
              </li>
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UploadPage;