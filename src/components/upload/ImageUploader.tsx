import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, X } from 'lucide-react';
import { useUpload } from '../../context/UploadContext';

const ImageUploader: React.FC = () => {
  const { setFile, setPreview, preview, file, isAnalyzing, analyzeImage } = useUpload();
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [setFile, setPreview]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 5242880, // 5MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
    disabled: isAnalyzing
  });

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!preview ? (
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors duration-200 bg-gray-50 dark:bg-gray-900
            ${dragActive 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600'
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
            Drag & drop your image here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or <span className="text-green-600 dark:text-green-400">browse</span> to choose a file
          </p>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Supported formats: JPG, PNG, GIF, WEBP (Max: 5MB)
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
            <div className="aspect-w-16 aspect-h-9 w-full relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="object-contain w-full h-full"
              />
            </div>
            
            {!isAnalyzing && (
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            )}
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Image size={16} className="mr-2" />
                <span className="truncate">{file?.name}</span>
              </div>
              
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className={`
                  mt-4 w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-200
                  ${isAnalyzing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
                  }
                `}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Image...
                  </div>
                ) : 'Analyze Plastic Type'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;