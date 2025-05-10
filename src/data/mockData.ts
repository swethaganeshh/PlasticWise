import { PlasticItem, PlasticType, RecyclingCenter } from '../types';

export const mockPlasticTypes: Record<PlasticType, PlasticItem> = {
  [PlasticType.PET]: {
    id: '1',
    type: PlasticType.PET,
    recyclable: true,
    image: '',
    suggestions: [
      'Rinse container before recycling',
      'Remove caps and labels when possible',
      'Can be recycled into new bottles, clothing, and carpeting'
    ]
  },
  [PlasticType.HDPE]: {
    id: '2',
    type: PlasticType.HDPE,
    recyclable: true,
    image: '',
    suggestions: [
      'Highly recyclable - accepted by most curbside programs',
      'Rinse thoroughly before recycling',
      'Can be recycled into new bottles, pipes, and lumber'
    ]
  },
  [PlasticType.PVC]: {
    id: '3',
    type: PlasticType.PVC,
    recyclable: false,
    image: '',
    suggestions: [
      'Not commonly accepted in curbside recycling',
      'Look for specialized PVC recycling programs',
      'Consider alternatives to PVC products when possible'
    ]
  },
  [PlasticType.LDPE]: {
    id: '4',
    type: PlasticType.LDPE,
    recyclable: false,
    image: '',
    suggestions: [
      'Not typically accepted in curbside programs',
      'Some grocery stores collect plastic bags for recycling',
      'Reuse when possible or look for specialized recycling centers'
    ]
  },
  [PlasticType.PP]: {
    id: '5',
    type: PlasticType.PP,
    recyclable: true,
    image: '',
    suggestions: [
      'Increasingly accepted in curbside recycling programs',
      'Check with your local recycling center',
      'Can be recycled into automotive parts, industrial fibers, and food containers'
    ]
  },
  [PlasticType.PS]: {
    id: '6',
    type: PlasticType.PS,
    recyclable: false,
    image: '',
    suggestions: [
      'Rarely accepted in curbside recycling programs',
      'Look for specialized polystyrene recycling centers',
      'Consider alternatives to styrofoam and polystyrene products'
    ]
  },
  [PlasticType.OTHER]: {
    id: '7',
    type: PlasticType.OTHER,
    recyclable: false,
    image: '',
    suggestions: [
      'Difficult to recycle - rarely accepted in curbside programs',
      'Look for reuse opportunities or specialized recycling facilities',
      'Consider alternatives when possible'
    ]
  },
  [PlasticType.UNKNOWN]: {
    id: '8',
    type: PlasticType.UNKNOWN,
    recyclable: false,
    image: '',
    suggestions: [
      'Unable to identify plastic type',
      'Try uploading a clearer image',
      'Consult with your local recycling center'
    ]
  }
};

export const mockRecyclingCenters: RecyclingCenter[] = [
  {
    id: '1',
    name: 'EcoRecycle Center',
    address: '123 Green St, Eco City, EC 12345',
    latitude: 37.7749,
    longitude: -122.4194,
    acceptedTypes: [PlasticType.PET, PlasticType.HDPE, PlasticType.PP],
    phone: '(555) 123-4567',
    website: 'https://ecorecycle.example.com'
  },
  {
    id: '2',
    name: 'GreenPlanet Recyclers',
    address: '456 Earth Ave, Green Valley, GV 67890',
    latitude: 37.7850,
    longitude: -122.4000,
    acceptedTypes: [
      PlasticType.PET, 
      PlasticType.HDPE, 
      PlasticType.PVC, 
      PlasticType.LDPE, 
      PlasticType.PP
    ],
    phone: '(555) 987-6543',
    website: 'https://greenplanet.example.com'
  },
  {
    id: '3',
    name: 'Sustainable Solutions',
    address: '789 Recycling Rd, Cleanville, CV 54321',
    latitude: 37.7900,
    longitude: -122.4300,
    acceptedTypes: [
      PlasticType.PET, 
      PlasticType.HDPE, 
      PlasticType.PP, 
      PlasticType.PS, 
      PlasticType.OTHER
    ],
    phone: '(555) 456-7890',
    website: 'https://sustainable.example.com'
  }
];

// Plastic education information
export const plasticEducation = [
  {
    type: PlasticType.PET,
    description: 'Clear, tough plastic often used for water and soda bottles.',
    commonItems: ['Water bottles', 'Soda bottles', 'Food containers', 'Peanut butter jars'],
    recyclability: 'Highly recyclable and in high demand by recyclers.',
    environmentalImpact: 'Can take up to 450 years to decompose in nature.'
  },
  {
    type: PlasticType.HDPE,
    description: 'Stiff plastic that can be translucent or colored.',
    commonItems: ['Milk jugs', 'Detergent bottles', 'Shampoo bottles', 'Toys'],
    recyclability: 'Widely recycled and easy to reprocess into new products.',
    environmentalImpact: 'Takes approximately 100 years to decompose naturally.'
  },
  {
    type: PlasticType.PVC,
    description: 'Versatile plastic used for piping and construction materials.',
    commonItems: ['Pipes', 'Window frames', 'Wire insulation', 'Medical equipment'],
    recyclability: 'Difficult to recycle due to additives and chlorine content.',
    environmentalImpact: 'Can release harmful chemicals when burned or degrading.'
  },
  {
    type: PlasticType.LDPE,
    description: 'Flexible, clear plastic often used for bags and wraps.',
    commonItems: ['Grocery bags', 'Bread bags', 'Plastic wraps', 'Squeeze bottles'],
    recyclability: 'Not commonly accepted in curbside programs but recyclable at specialized facilities.',
    environmentalImpact: 'Can persist in the environment for decades and harm wildlife.'
  },
  {
    type: PlasticType.PP,
    description: 'Tough, lightweight plastic resistant to heat and chemicals.',
    commonItems: ['Yogurt containers', 'Medicine bottles', 'Bottle caps', 'Straws'],
    recyclability: 'Increasingly accepted in recycling programs.',
    environmentalImpact: 'Takes 20-30 years to decompose but is more environmentally friendly than many other plastics.'
  },
  {
    type: PlasticType.PS,
    description: 'Can be rigid or foamed (Styrofoam).',
    commonItems: ['Disposable plates/cups', 'Foam packaging', 'CD cases', 'Insulation'],
    recyclability: 'Rarely recycled due to cost inefficiency.',
    environmentalImpact: 'Can break into small pieces that animals mistake for food.'
  },
  {
    type: PlasticType.OTHER,
    description: 'A mix of plastics or newer plastics like bioplastics.',
    commonItems: ['5-gallon water bottles', 'Sunglasses', 'Computer cases', 'Nylon products'],
    recyclability: 'Typically not recyclable through conventional methods.',
    environmentalImpact: 'Varies widely depending on specific composition.'
  }
];

// Statistics for the impact counter
export const impactStatistics = {
  plasticsRecycled: 1203,
  co2Saved: 5812, // in kg
  waterSaved: 15620, // in liters
  energySaved: 42150 // in kWh
};