import Navbar from '../components/navbar.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sequelize from "sequelize";
import dbConfig from "../db/db.config.js";
import { sqlQuery } from "../db/db.js";
import Image from 'next/image';
import Map, {NavigationControl, Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Model from '../components/Model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

export async function getServerSideProps() {
  const db = {};
  db.sequelize = sequelize;
  const { QueryTypes } = require('sequelize');
  const artGeo = await sequelize.query( sqlQuery, { type: QueryTypes.SELECT });
  return { props: {art:artGeo}}
}

export default function Home(props) {
  
  const specialItem = {
    position: '55.5879983, 13.0243076',
    name: '3D Gallery',
    img: '/3d-gallery.jpg',
    submission_id: '3d-gallery',
    active: 'false',
    artinfo: 'false',
    artist: 'Hangaren',
    geotip: '3D Gallery',
    photograf: '',
    is3DModel: true
  };

  const [graffitisInMap, updateGraffity] = useState([...props.art, specialItem]);
  const [artSize, setArtSize] = useState(false);
  const [artInfo, setArtInfo] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [isClean, setIsClean] = useState(false);

  const router = useRouter();
  const { clean } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    
    if (clean) {
      setShowModel(true);
      setIsClean(true);
    }
  }, [router.isReady, clean]);

  const updateArtSize = () => {
    setArtSize(!artSize);
  }

  const updateGraffityInMap = (id) => {
    let newArray = graffitisInMap.map((graffiti) => {
      if (graffiti.submission_id === id) { graffiti.active = true; }
      return graffiti; });
    updateGraffity(newArray);
    scrollToArt(id); }

  function scrollToArt(id) {
    const el = document.getElementById(id);
    if (el) {  // check if element exists
      el.scrollIntoView({ behavior: 'instant', block: "center", inline: "center"}); 
    }
  } 

  const updateArtInfo = (id) => {
    setArtInfo(artInfo === id ? null : id);
  }

  const toggleModel = () => {
    setShowModel(!showModel);
  }
    
  return (
    <>
    {!isClean && <Navbar />}

     {/* art images  */}
    {!isClean && (
      <div className={artSize ? "art-size-open test" : "art-size-close test"} style={{  position: "absolute", zIndex: "9" }} >
        {artSize
          ?<div className="art-size" onClick={()=>updateArtSize()}> <img src="/mini.svg" alt="" /> </div>
          :<div className="art-size" onClick={()=>updateArtSize()}> <img src="/maxi.svg" alt="" /> </div>
        }

        {graffitisInMap.map((graffiti) => (
        <div id={graffiti.submission_id} className='art' key={graffiti.submission_id}>       
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0rem'
          }}>
            <button 
              onClick={() => updateArtInfo(graffiti.submission_id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                zIndex: '1000000',
                position: 'absolute',
              }} >

              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" stroke="currentColor" strokeWidth="2" > <circle cx="12" cy="12" r="10"/> <line x1="12" y1="17" x2="12" y2="10.5"/> <circle cx="12" cy="8" r="0.8" fill="currentColor"/> </svg>
            </button>
          </div>
          
          <div style={{
              display: artInfo === graffiti.submission_id ? 'flex' : 'none',
              flexDirection: 'column',
              padding: '0.5rem',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)' // safari 
            }} 
            className="art-info" >

            { graffiti.artist ? <p style={{ zIndex: "1000000", paddingLeft: "0.5rem", position: "absolute", bottom: "0.5rem", left: "0.5rem"}}><span style={{ paddingLeft: "0.5rem", position: "absolute", bottom: "0.5rem", left: "0.5rem"}}>Artist:</span> { graffiti.namellllllllllllll } </p> : null }
          
            { graffiti.artist ? <p><span></span> { graffiti.artist } </p> : null }
            { graffiti.photograf ? <p><span style={{ paddingLeft: "0.5rem"}}>Photo:</span> { graffiti.photograf } </p> : null }
            { graffiti.geotip ? <p><span style={{ paddingLeft: "0.5rem"}}>Geotip:</span> { graffiti.geotip } </p> : null }
          </div>

          { graffiti.name ? <p style={{ zIndex: "1000000", paddingLeft: "0.5rem", position: "absolute", bottom: "0.5rem", left: "0.5rem"}}><span style={{ paddingLeft: "0.5rem", position: "absolute", bottom: "0.5rem", left: "0.5rem"}}></span> { graffiti.name } </p> : null }
          
          <Image 
            layout="responsive" 
            alt={graffiti.name} 
            className="test"  
            width={100} 
            height={100} 
            src={graffiti.img} 
          />
        </div>
        ))}
      </div>
    )}

    <Map 
      ref={setMapRef}
      className="map" 
      mapLib={maplibregl} 
      initialViewState={{ 
        longitude: 13.0245076,    
        latitude: 55.5879983,   
        zoom: 15,   
        pitch: 85, 
        pinch: 200, 
        bearing: 0,
      }}
      style={{
        width: "100%", 
        top: isClean ? "0" : "6rem",
        background: "rgb(255, 64, 0)", 
        position: "fixed", 
        height: "100vh"
      }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=InUWzr8s1xkknwxF8ZG8"
    >

      {graffitisInMap.map((graffiti, index) => {
        const longitude = parseFloat(graffiti.position.split(',')[1]);
        const latitude = parseFloat(graffiti.position.split(',')[0]);
        
        if (isNaN(longitude) || isNaN(latitude)) {
          return null;
        }
        
        if (graffiti.is3DModel) {
          return (
            <Marker 
              key={graffiti.submission_id} 
              longitude={longitude} 
              latitude={latitude}
              anchor="center">
                
              <div style={{ 
                width: '150px', 
                height: '150px', 
                position: 'relative',
                cursor: 'pointer',
                zIndex: 1000000,
              }}>
                <Model
                  modelUrl="/pin.gltf" 
                  modelScale={0.42}
                  mapCoordinates={{ 
                    lng: longitude, 
                    lat: latitude,
                    elevation: 0 
                  }}
                  mapInstance={mapRef}
                  link={`https://3d.cfuk.nu/hangaren/32`}
                  tiltX={270}
                  tiltY={120}
                  tiltZ={110} 
                />
              </div>
            </Marker>
          );
        }
        
        return (
          <Marker key={graffiti.submission_id} longitude={longitude} latitude={latitude}>
            <img 
              className="" 
              onClick={() => updateGraffityInMap(graffiti.submission_id)} 
              width={80} 
              src="/pin-explosions.svg" 
              alt="" 
            />
          </Marker>
        );
      })}
      
      <NavigationControl />
    </Map>
    </>
  )
}