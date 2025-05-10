import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { PlasticType } from '../types';

class ModelService {
  private model: mobilenet.MobileNet | null = null;
  private readonly IMAGE_SIZE = 224;
  private readonly CONFIDENCE_THRESHOLD = 0.5;

  // Enhanced plastic signatures with more detailed characteristics
  private readonly PLASTIC_SIGNATURES = {
    [PlasticType.PET]: {
      keywords: ['bottle', 'water bottle', 'plastic bottle', 'beverage', 'container', 'transparent', 'clear'],
      visualCharacteristics: {
        transparency: 'high',
        texture: 'smooth',
        common_shapes: ['cylindrical', 'bottle'],
        typical_uses: ['beverages', 'food containers']
      },
      confidence: 0.7
    },
    [PlasticType.HDPE]: {
      keywords: ['milk jug', 'detergent', 'bottle', 'container', 'jug', 'opaque', 'white'],
      visualCharacteristics: {
        transparency: 'low',
        texture: 'matte',
        common_shapes: ['jug', 'bottle', 'container'],
        typical_uses: ['milk', 'detergent', 'shampoo']
      },
      confidence: 0.7
    },
    [PlasticType.PVC]: {
      keywords: ['pipe', 'tubing', 'window', 'frame', 'rigid', 'construction'],
      visualCharacteristics: {
        transparency: 'low',
        texture: 'rigid',
        common_shapes: ['pipe', 'frame', 'sheet'],
        typical_uses: ['construction', 'plumbing']
      },
      confidence: 0.7
    },
    [PlasticType.LDPE]: {
      keywords: ['bag', 'film', 'wrap', 'flexible', 'soft', 'squeeze'],
      visualCharacteristics: {
        transparency: 'medium',
        texture: 'flexible',
        common_shapes: ['film', 'bag', 'flexible container'],
        typical_uses: ['bags', 'wraps', 'squeeze bottles']
      },
      confidence: 0.7
    },
    [PlasticType.PP]: {
      keywords: ['container', 'tupperware', 'cap', 'lid', 'food container'],
      visualCharacteristics: {
        transparency: 'medium',
        texture: 'smooth',
        common_shapes: ['container', 'cap', 'tub'],
        typical_uses: ['food storage', 'bottle caps']
      },
      confidence: 0.7
    }
  };

  async loadModel() {
    try {
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

  private async analyzeImageProperties(imageElement: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let transparencyCount = 0;
    let brightnessSum = 0;
    let textureVariation = 0;
    let previousBrightness = 0;

    // Analyze image properties
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;

      if (brightness > 240) transparencyCount++;
      brightnessSum += brightness;

      // Calculate texture variation
      if (i > 0) {
        textureVariation += Math.abs(brightness - previousBrightness);
      }
      previousBrightness = brightness;
    }

    const totalPixels = (data.length / 4);
    const averageBrightness = brightnessSum / totalPixels;
    const normalizedTextureVariation = textureVariation / totalPixels;

    return {
      transparency: transparencyCount / totalPixels,
      brightness: averageBrightness / 255,
      texture: normalizedTextureVariation,
      isTransparent: transparencyCount > (totalPixels * 0.7),
      isOpaque: averageBrightness < 200,
      hasTexture: normalizedTextureVariation > 0.1
    };
  }

  private calculatePlasticTypeScore(
    predictions: mobilenet.MobileNetPrediction[],
    imageProperties: any,
    plasticType: PlasticType,
    signature: any
  ): number {
    let score = 0;

    // Check keywords in predictions
    for (const prediction of predictions) {
      const matchingKeywords = signature.keywords.filter((keyword: string) =>
        prediction.className.toLowerCase().includes(keyword.toLowerCase())
      );
      score += (matchingKeywords.length * prediction.probability * 0.3);
    }

    // Check visual characteristics
    if (signature.visualCharacteristics.transparency === 'high' && imageProperties.isTransparent) {
      score += 0.3;
    }
    if (signature.visualCharacteristics.transparency === 'low' && imageProperties.isOpaque) {
      score += 0.3;
    }
    if (signature.visualCharacteristics.texture === 'smooth' && !imageProperties.hasTexture) {
      score += 0.2;
    }
    if (signature.visualCharacteristics.texture === 'rigid' && imageProperties.hasTexture) {
      score += 0.2;
    }

    return score * signature.confidence;
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
      const imageProperties = await this.analyzeImageProperties(imageElement);
      if (!imageProperties) {
        throw new Error('Failed to analyze image properties');
      }

      // Get predictions from MobileNet
      const predictions = await this.model.classify(tensor, 5);

      // Clean up tensor
      tensor.dispose();

      // Calculate scores for each plastic type
      const scores = new Map<PlasticType, number>();
      
      for (const [plasticType, signature] of Object.entries(this.PLASTIC_SIGNATURES)) {
        const score = this.calculatePlasticTypeScore(
          predictions,
          imageProperties,
          plasticType as PlasticType,
          signature
        );
        scores.set(plasticType as PlasticType, score);
      }

      // Find the plastic type with the highest score
      let highestScore = 0;
      let bestMatch = PlasticType.UNKNOWN;

      scores.forEach((score, plasticType) => {
        if (score > highestScore && score >= this.CONFIDENCE_THRESHOLD) {
          highestScore = score;
          bestMatch = plasticType;
        }
      });

      return {
        type: bestMatch,
        confidence: highestScore
      };
    } catch (error) {
      console.error('Error classifying image:', error);
      return { type: PlasticType.UNKNOWN, confidence: 0 };
    }
  }
}

export const modelService = new ModelService();