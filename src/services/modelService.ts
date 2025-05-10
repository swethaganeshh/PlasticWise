import * as tf from '@tensorflow/tfjs';
import { PlasticType } from '../types';

class ModelService {
  private model: tf.LayersModel | null = null;
  private readonly IMAGE_SIZE = 224;
  private readonly MODEL_URL = 'https://storage.googleapis.com/tfjs-models/plastics/model.json';
  private readonly CONFIDENCE_THRESHOLD = 0.7;

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
      return false;
    }
  }

  private async preprocessImage(imageElement: HTMLImageElement): Promise<tf.Tensor4D> {
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

  private async extractImageFeatures(imageElement: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Calculate image statistics
    let transparencySum = 0;
    let edgeCount = 0;
    let textureVariation = 0;
    let previousPixel = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;

      // Calculate transparency
      transparencySum += brightness;

      // Edge detection
      if (i > 0) {
        const diff = Math.abs(brightness - previousPixel);
        if (diff > 30) edgeCount++;
        textureVariation += diff;
      }
      previousPixel = brightness;
    }

    const totalPixels = data.length / 4;
    
    return {
      averageTransparency: transparencySum / (totalPixels * 255),
      edgeDensity: edgeCount / totalPixels,
      textureComplexity: textureVariation / totalPixels
    };
  }

  async classifyImage(imageElement: HTMLImageElement): Promise<{ type: PlasticType; confidence: number }> {
    if (!this.model) {
      console.error('Model not loaded');
      return { type: PlasticType.UNKNOWN, confidence: 0 };
    }

    try {
      // Extract image features
      const features = await this.extractImageFeatures(imageElement);
      if (!features) {
        throw new Error('Failed to extract image features');
      }

      // Preprocess the image
      const tensor = await this.preprocessImage(imageElement);

      // Get model predictions
      const predictions = await this.model.predict(tensor) as tf.Tensor;
      const probabilities = await predictions.data();

      // Clean up tensors
      tensor.dispose();
      predictions.dispose();

      // Find the highest probability prediction
      let maxProbability = 0;
      let predictedClassIndex = -1;

      probabilities.forEach((probability, index) => {
        if (probability > maxProbability) {
          maxProbability = probability;
          predictedClassIndex = index;
        }
      });

      // Apply confidence threshold and additional checks
      if (maxProbability >= this.CONFIDENCE_THRESHOLD && predictedClassIndex !== -1) {
        // Adjust confidence based on image features
        let adjustedConfidence = maxProbability;

        // Adjust for transparency (PET bottles are usually transparent)
        if (this.PLASTIC_CLASSES[predictedClassIndex] === PlasticType.PET) {
          adjustedConfidence *= features.averageTransparency > 0.7 ? 1.1 : 0.9;
        }

        // Adjust for texture complexity (HDPE usually has more texture)
        if (this.PLASTIC_CLASSES[predictedClassIndex] === PlasticType.HDPE) {
          adjustedConfidence *= features.textureComplexity > 0.3 ? 1.1 : 0.9;
        }

        // Ensure confidence stays within [0,1]
        adjustedConfidence = Math.min(Math.max(adjustedConfidence, 0), 1);

        return {
          type: this.PLASTIC_CLASSES[predictedClassIndex],
          confidence: adjustedConfidence
        };
      }

      return { type: PlasticType.UNKNOWN, confidence: maxProbability };
    } catch (error) {
      console.error('Error classifying image:', error);
      return { type: PlasticType.UNKNOWN, confidence: 0 };
    }
  }
}

export const modelService = new ModelService();