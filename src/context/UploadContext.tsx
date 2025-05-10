import React, { createContext, useState, useContext, useEffect } from 'react';
import { PlasticItem, PlasticType, UploadContextType } from '../types';
import { mockPlasticTypes } from '../data/mockData';
import { modelService } from '../services/modelService';

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PlasticItem | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    // Load the model when the component mounts
    modelService.loadModel().then(success => {
      setModelLoaded(success);
      console.log('Model loaded successfully');
    });
  }, []);

  const analyzeImage = async () => {
    if (!file || !preview || !modelLoaded) return;
    
    setIsAnalyzing(true);
    
    try {
      // Create an image element from the preview URL
      const img = new Image();
      img.src = preview;
      await new Promise(resolve => {
        img.onload = resolve;
      });

      // Classify the image
      const classification = await modelService.classifyImage(img);
      
      // Create result object
      const mockResult = {
        ...mockPlasticTypes[classification.type],
        image: preview,
        id: Math.random().toString(36).substring(2, 11)
      };
      
      setResult(mockResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult({
        ...mockPlasticTypes[PlasticType.UNKNOWN],
        image: preview,
        id: Math.random().toString(36).substring(2, 11)
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setIsAnalyzing(false);
    setResult(null);
  };

  return (
    <UploadContext.Provider
      value={{
        file,
        preview,
        isAnalyzing,
        result,
        setFile,
        setPreview,
        setIsAnalyzing,
        setResult,
        resetUpload,
        analyzeImage
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = (): UploadContextType => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};