import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { PlasticType } from '../types';

class ModelService {
  private model: mobilenet.MobileNet | null = null;
  private readonly IMAGE_SIZE = 224;
  private readonly CONFIDENCE_THRESHOLD = 0.6;

  // Common plastic items and their visual characteristics
  private readonly PLASTIC_SIGNATURES = {
    [PlasticType.PET]: {
      keywords: ['bottle', 'water bottle', 'plastic bottle', 'beverage', 'container'],
      colorRange: { min: 200, max: 255 }, // Clear to light blue
      confidence: 0.8
    },
    [PlasticType.HDPE]: {
      keywords: ['milk jug', 'detergent', 'bottle', 'container', 'jug'],
      colorRange: { min: 180, max: 255 }, // Opaque white to colored
      confidence: 0.75
    },
    [PlasticType.PP]: {
      keywords: ['container', 'tupperware', 'bottle', 'cap', 'lid'],
      colorRange: { min: 160, max: 255 }, // Various colors
      confidence: 0.7
    }
  };

  async loadModel() {
    try {
      // Load MobileNet with a higher version for better accuracy
      this.model = await mobilenet.load({
        version: 2,
        alpha: 1.0
      });
      return true;
    } catch (error) {
      console.error('Error loading model:', error);
      return false;
    }
  }

  private async preprocessImage(imageElement: HTMLImageElement): Promise<tf.Tensor3D> {
    return tf.tidy(() => {
      // Convert the image to a tensor
      const tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([this.IMAGE_SIZE, this.IMAGE_SIZE])
        .toFloat();

      // Normalize the image
      const offset = tf.scalar(127.5);
      return tensor.sub(offset).div(offset);
    });
  }

  private async analyzeImageProperties(tensor: tf.Tensor3D) {
    const imageData = await tensor.array();
    let transparencyCount = 0;
    let colorCount = 0;

    // Analyze image properties
    for (let i = 0; i < imageData.length; i++) {
      for (let j = 0; j < imageData[i].length; j++) {
        const pixel = imageData[i][j];
        const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3;

        if (brightness > 200) transparencyCount++;
        if (brightness < 240) colorCount++;
      }
    }

    return {
      isTransparent: transparencyCount > (this.IMAGE_SIZE * this.IMAGE_SIZE * 0.6),
      hasColor: colorCount > (this.IMAGE_SIZE * this.IMAGE_SIZE * 0.2)
    };
  }

  private matchPlasticType(predictions: mobilenet.MobileNetPrediction[], imageProperties: { isTransparent: boolean; hasColor: boolean }): { type: PlasticType; confidence: number } {
    // Check each prediction against our plastic signatures
    for (const prediction of predictions) {
      for (const [plasticType, signature] of Object.entries(this.PLASTIC_SIGNATURES)) {
        // Check if prediction matches any keywords
        const matchesKeyword = signature.keywords.some(keyword => 
          prediction.className.toLowerCase().includes(keyword.toLowerCase())
        );

        if (matchesKeyword) {
          // Adjust confidence based on image properties
          let adjustedConfidence = signature.confidence;

          if (plasticType === PlasticType.PET && imageProperties.isTransparent) {
            adjustedConfidence += 0.2;
          } else if (plasticType === PlasticType.HDPE && !imageProperties.isTransparent) {
            adjustedConfidence += 0.15;
          }

          if (adjustedConfidence >= this.CONFIDENCE_THRESHOLD) {
            return {
              type: plasticType as PlasticType,
              confidence: adjustedConfidence
            };
          }
        }
      }
    }

    return {
      type: PlasticType.UNKNOWN,
      confidence: 0
    };
  }

  async classifyImage(imageElement: HTMLImageElement): Promise<{ type: PlasticType; confidence: number }> {
    if (!this.model) {
      console.error('Model not loaded');
      return { type: PlasticType.UNKNOWN, confidence: 0 };
    }

    try {
      // Preprocess the image
      const tensor = await this.preprocessImage(imageElement);
      
      // Get image properties
      const imageProperties = await this.analyzeImageProperties(tensor);

      // Get predictions from MobileNet
      const predictions = await this.model.classify(tensor, 5);

      // Clean up tensor
      tensor.dispose();

      // Match predictions to plastic types
      const result = this.matchPlasticType(predictions, imageProperties);

      return result;
    } catch (error) {
      console.error('Error classifying image:', error);
      return { type: PlasticType.UNKNOWN, confidence: 0 };
    }
  }
}

export const modelService = new ModelService();