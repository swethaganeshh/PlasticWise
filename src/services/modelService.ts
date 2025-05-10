import * as tf from '@tensorflow/tfjs';
import { PlasticType } from '../types';

class ModelService {
  private model: tf.LayersModel | null = null;
  private readonly IMAGE_SIZE = 224;
  private readonly MODEL_URL = '/models/plastics/model.json';
  private readonly CONFIDENCE_THRESHOLD = 0.6;

  private readonly PLASTIC_CLASSES = [
    PlasticType.PET,
    PlasticType.HDPE,
    PlasticType.PVC,
    PlasticType.LDPE,
    PlasticType.PP,
    PlasticType.PS,
    PlasticType.OTHER
  ];

  async loadModel() {
    try {
      // Initialize TensorFlow.js
      await tf.ready();
      
      // Load custom model
      this.model = await tf.loadLayersModel(this.MODEL_URL);
      
      // Warm up the model
      const dummyInput = tf.zeros([1, this.IMAGE_SIZE, this.IMAGE_SIZE, 3]);
      await this.model.predict(dummyInput).dispose();
      dummyInput.dispose();
      
      return true;
    } catch (error) {
      console.error('Error loading model:', error);
      // Fallback to simple image analysis if model fails to load
      return true;
    }
  }

  private preprocessImage(imageElement: HTMLImageElement): tf.Tensor4D {
    return tf.tidy(() => {
      // Convert the image to a tensor
      let tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([this.IMAGE_SIZE, this.IMAGE_SIZE])
        .toFloat();

      // Normalize the image
      tensor = tensor.div(255.0);
      
      // Add batch dimension
      return tensor.expandDims(0);
    });
  }

  private analyzeImageFeatures(imageElement: HTMLImageElement): { 
    transparency: number;
    colorVariance: number;
    texture: number;
  } {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    
    if (!ctx) {
      return { transparency: 0, colorVariance: 0, texture: 0 };
    }

    ctx.drawImage(imageElement, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    let transparency = 0;
    let colorSum = { r: 0, g: 0, b: 0 };
    let colorVariance = 0;
    let textureScore = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      
      // Calculate transparency
      transparency += (r + g + b) / 3;
      
      // Sum colors
      colorSum.r += r;
      colorSum.g += g;
      colorSum.b += b;
      
      // Calculate texture based on local variations
      if (i > 0 && i < imageData.length - 4) {
        const prevPixel = (imageData[i - 4] + imageData[i - 3] + imageData[i - 2]) / 3;
        const currentPixel = (r + g + b) / 3;
        textureScore += Math.abs(currentPixel - prevPixel);
      }
    }

    const pixelCount = imageData.length / 4;
    
    // Normalize values
    transparency = transparency / (pixelCount * 255);
    colorVariance = Math.sqrt(
      Math.pow(colorSum.r / pixelCount - 127.5, 2) +
      Math.pow(colorSum.g / pixelCount - 127.5, 2) +
      Math.pow(colorSum.b / pixelCount - 127.5, 2)
    ) / 127.5;
    
    textureScore = textureScore / (pixelCount * 255);

    return {
      transparency,
      colorVariance,
      texture: textureScore
    };
  }

  private determineTypeFromFeatures(features: { 
    transparency: number;
    colorVariance: number;
    texture: number;
  }): { type: PlasticType; confidence: number } {
    const { transparency, colorVariance, texture } = features;

    // Decision tree based on physical characteristics
    if (transparency > 0.8 && colorVariance < 0.3) {
      return { type: PlasticType.PET, confidence: 0.85 }; // Clear bottles
    }
    
    if (transparency < 0.4 && texture > 0.4) {
      return { type: PlasticType.HDPE, confidence: 0.8 }; // Opaque, textured
    }
    
    if (transparency > 0.6 && texture < 0.3) {
      return { type: PlasticType.LDPE, confidence: 0.75 }; // Semi-transparent, smooth
    }
    
    if (colorVariance > 0.6) {
      return { type: PlasticType.PP, confidence: 0.7 }; // Colored, varied
    }
    
    if (transparency < 0.3 && texture < 0.2) {
      return { type: PlasticType.PS, confidence: 0.65 }; // Opaque, smooth
    }

    return { type: PlasticType.OTHER, confidence: 0.6 };
  }

  async classifyImage(imageElement: HTMLImageElement): Promise<{ type: PlasticType; confidence: number }> {
    try {
      // Extract basic image features
      const features = this.analyzeImageFeatures(imageElement);
      
      // Try model-based classification first
      if (this.model) {
        try {
          const tensor = this.preprocessImage(imageElement);
          const predictions = await this.model.predict(tensor) as tf.Tensor;
          const probabilities = await predictions.data();
          
          // Cleanup
          tensor.dispose();
          predictions.dispose();
          
          // Find highest probability
          const maxProb = Math.max(...probabilities);
          const classIndex = probabilities.indexOf(maxProb);
          
          if (maxProb >= this.CONFIDENCE_THRESHOLD) {
            return {
              type: this.PLASTIC_CLASSES[classIndex],
              confidence: maxProb
            };
          }
        } catch (modelError) {
          console.warn('Model prediction failed, falling back to feature analysis:', modelError);
        }
      }
      
      // Fallback to feature-based classification
      return this.determineTypeFromFeatures(features);
      
    } catch (error) {
      console.error('Error during classification:', error);
      return { type: PlasticType.UNKNOWN, confidence: 0 };
    }
  }
}

export const modelService = new ModelService();