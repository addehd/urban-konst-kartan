import { useState } from 'react';
import Map, {NavigationControl, Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Model from '../../components/Model.js';

// tell next.js to ignore layout for this page
Test.getLayout = function getLayout(page) {
  return page;
}

export default function Test() {
  const [mapRef, setMapRef] = useState(null);

  return (
    <>
      <style jsx global>{`
        html, 
        body {
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          margin-top: 0 !important;
        }
      `}</style>
      
      <div style={{ 
        position: 'absolute',
        top: '1rem',
        overflow: 'hidden',
        marginTop: '-5rem',
        background: 'transparent',
        backgroundColor: 'transparent'
      }}>
      <Model
        modelUrl="/pin.gltf" 
        modelScale={0.42}
        mapCoordinates={{ 
          lng: "12.9", 
          lat: "55.580",
          elevation: 0 
        }}
        mapInstance={mapRef}
        link="https://3d.cfuk.nu/rum/32"
        tiltX={270}
        tiltY={120}
        tiltZ={110} />
        
      </div>
    </>
  );
} 