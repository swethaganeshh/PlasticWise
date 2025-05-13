import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { mockRecyclingCenters } from '../../data/mockData';
import { PlasticType, RecyclingCenter } from '../../types';
import { MapPin, Phone, Globe } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

interface MapProps {
  filterType?: PlasticType | 'ALL';
}

const CentersMap: React.FC<MapProps> = ({ filterType = 'ALL' }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with actual API key
    libraries: ['places'],
  });

  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [filteredCenters, setFilteredCenters] = useState(mockRecyclingCenters);

  useEffect(() => {
    // Filter centers based on plastic type
    if (filterType === 'ALL') {
      setFilteredCenters(mockRecyclingCenters);
    } else {
      setFilteredCenters(
        mockRecyclingCenters.filter(center => 
          center.acceptedTypes.includes(filterType as PlasticType)
        )
      );
    }
  }, [filterType]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log('Error getting location');
        }
      );
    }
  }, []);

  const onMapClick = useCallback(() => {
    setSelectedCenter(null);
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-red-500">Error loading map</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={userLocation || center}
        options={options}
        onClick={onMapClick}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiLz48L3N2Zz4=',
              scaledSize: new google.maps.Size(30, 30),
            }}
          />
        )}

        {/* Recycling center markers */}
        {filteredCenters.map((center) => (
          <Marker
            key={center.id}
            position={{ lat: center.latitude, lng: center.longitude }}
            onClick={() => setSelectedCenter(center)}
            icon={{
              url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMmM1NWUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTBjMCA3LTkgMTMtOSAxM3MtOS02LTktMTNhOSA5IDAgMCAxIDE4IDB6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==',
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        ))}

        {selectedCenter && (
          <InfoWindow
            position={{ lat: selectedCenter.latitude, lng: selectedCenter.longitude }}
            onCloseClick={() => setSelectedCenter(null)}
          >
            <div className="p-2 max-w-sm">
              <h3 className="font-semibold text-lg mb-2">{selectedCenter.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedCenter.address}</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-sm mb-1">Accepted Types:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCenter.acceptedTypes.map((type) => (
                    <span 
                      key={type}
                      className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {type.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                {selectedCenter.phone && (
                  <a 
                    href={`tel:${selectedCenter.phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Phone size={14} className="mr-1" />
                    {selectedCenter.phone}
                  </a>
                )}
                
                {selectedCenter.website && (
                  <a 
                    href={selectedCenter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Globe size={14} className="mr-1" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default CentersMap;