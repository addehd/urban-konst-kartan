import Navbar from '../components/navbar.js';
import { useState } from 'react';
import Sequelize from "sequelize";
import dbConfig from "../db/db.config.js";
import { sqlQuery } from "../db/db.js";
import Pin from '../components/pin.js';
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
  const [graffitisInMap, updateGraffity] = useState(props.art);
  const [artSize, setArtSize] = useState(false);
  const [artInfo, setArtInfo] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [mapRef, setMapRef] = useState(null);

  const updateArtSize = () => {
    setArtSize(!artSize);
  }

  const updateGraffityInMap = (id) => {
    let newArray = graffitisInMap.map((graffiti) => {
      if (graffiti.submission_id === id) { graffiti.active = true; }
      return graffiti; });
    updateGraffity(newArray);
    scrollToArt(id); }

  function scrollToArt (id) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'instant', block: "center", inline: "center"}); } 

  const updateArtInfo = (e) => {
    console.log(this)
    setArtInfo(!artInfo);
    console.log(e)
  }

  const toggleModel = () => {
    setShowModel(!showModel);
  }
    
  // Example of multiple models at different locations
  const models = [
    { 
      id: 1, 
      url: "/hangar.glb", 
      scale: 0.002, 
      coordinates: { 
        lng: 12.98, 
        lat: 55.580,
        elevation: 0 
      },
      link: "https://www.google.com"
    }
  ];

  return (
    <>
    <Navbar />
    
    <div className={artSize ? "art-size-open test" : "art-size-close test"} style={{  position: "absolute", zIndex: "9" }} >
      {artSize
        ?<div className="art-size" onClick={()=>updateArtSize()}> <img src="/mini.svg" alt="" /> </div>
        :<div className="art-size" onClick={()=>updateArtSize()}> <img src="/maxi.svg" alt="" /> </div>
      }

      {graffitisInMap.map((graffiti) => (
      <div id={graffiti.submission_id} className='art' key={graffiti.submission_id}>       
        <div style={{display: artInfo ? 'flex':'flex'}} className="art-info">
          { graffiti.name ? <p><span></span>   { graffiti.name } </p> : <p></p> }
          { graffiti.artist ? <p><span style={{ paddingLeft: "0.5rem"}}>Artist:</span> { graffiti.artist } </p> : <p></p> }
          { graffiti.photograf ? <p><span style={{ paddingLeft: "0.5rem"}}>Photo:</span> { graffiti.photograf } </p> : <p></p> }
          { graffiti.geotip ? <p><span style={{ paddingLeft: "0.5rem"}}>Geotip:</span> { graffiti.geotip } </p> : <p></p> }
        </div>
        <Image layout="responsive" alt={graffiti.name} className="test"  width={100} height={100} src={graffiti.img}   />
      </div>
      ))}
    </div>

    <Map 
      ref={setMapRef}
      className="map" 
      mapLib={maplibregl} 
      initialViewState={{ longitude: 12.98, latitude: 55.580, zoom: 14, pitch: 85, pinch: 200, bearing: 0, }}
      style={{width: "100%", top: "6rem", background: "rgb(255, 64, 0)", position: "fixed", height: "95vh"}}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=InUWzr8s1xkknwxF8ZG8">

      {graffitisInMap.map((graffiti, index) => {
        const longitude = graffiti.position.split(',')[1];
        const latitude = graffiti.position.split(',')[0];
        
        // Check if this is index 3 to render a 3D model instead of an image
        if (index === 3) {
          return (
            <Marker key={graffiti.submission_id} longitude={longitude} latitude={latitude}>
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  position: 'relative',
                  cursor: 'pointer',
                  zIndex: 1000000,
                  position: 'absolute',
                }}
              >
                <Model
                  modelUrl="/hangar.glb" 
                  modelScale={0.06}
                  mapCoordinates={{ 
                    lng: longitude, 
                    lat: latitude,
                    elevation: 0 
                  }}
                  mapInstance={mapRef}
                  link={`https://3d.cfuk.nu/rum/32l,`}
                  tiltX={0}
                  tiltY={8}
                  tiltZ={0}
                />
              </div>
            </Marker>
          );
        }
        
        // use regular Marker for all other items
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

      {/* {models.map(model => (
        <div 
          key={model.id} 
          style={{ 
            position: 'relative', 
            zIndex: '10', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            backgroundColor: 'transparent'
          }}
        >
        
          <Model  
            modelUrl={model.url} 
            modelScale={model.scale}
            mapCoordinates={model.coordinates}
            mapInstance={mapRef}
            link={model.link}
          />
        </div>
      ))} */}
      
      <NavigationControl />
    </Map>
    </>
  )
}