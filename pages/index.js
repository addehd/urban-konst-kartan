import Navbar from '../components/navbar.js';
import { useState } from 'react';
import Sequelize from "sequelize";
import dbConfig from "../db/db.config.js";
import { sqlQuery } from "../db/db.js";
import Pin from '../components/pin.js';

import Map, {NavigationControl, Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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

export async function getStaticProps() {
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
    
  return (
    <>
    <Navbar />
    
    <div className={artSize ? "art-size-open test" : "art-size-close test"} style={{  position: "absolute", zIndex: "9" }} >
      {artSize
        ?<div className="art-size" onClick={()=>updateArtSize()}>
          <img src="/mini.svg" alt="" />
         </div>
        :<div className="art-size" onClick={()=>updateArtSize()}>
          <img src="/maxi.svg" alt="" />
         </div>
      }

      {graffitisInMap.map((graffiti) => (
      <div id={graffiti.submission_id} className='art' key={graffiti.submission_id}>
        {/* <Image layout="responsive" alt={graffiti.name} className="test"  width={100} height={100} src={graffiti.img}   /> */}
       
        <div style={{display: artInfo ? 'flex':'flex'}} class="art-info">
          { graffiti.name ? <p><span></span>   { graffiti.name } </p> : <p></p> }
          {/* { graffiti.photograf ? <p><span style={{ paddingLeft: "0.5rem"}}>Foto:</span> { graffiti.photograf } </p> : <p></p> } */}
        </div>
        
        {/* <img src='/info.svg' className="show-info" onClick={()=>updateArtInfo(graffiti.submission_id)}/> */}
         
        <img src={graffiti.img} alt={graffiti.name} className="test" style={{ width: "100%"}}/>
        {/* <h1 className={ JSON.parse(graffiti.active) ? "red" : "blue"}> {graffiti.name}</h1> */}
      </div>
      ))}
    </div>

    <Map className="map" mapLib={maplibregl} 
      initialViewState={{ longitude: 12.98, latitude: 55.580, zoom: 14, pitch: 35, pinch: 200, bearing: 0, }}
      style={{width: "100%", top: "6rem", background: "rgb(255, 64, 0)", position: "fixed", height: "95vh"}}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=InUWzr8s1xkknwxF8ZG8">

      {graffitisInMap.map((graffiti) => (
        <Marker key={graffiti.submission_id} longitude={graffiti.position.split(',')[1]} latitude={graffiti.position.split(',')[0]}>
          <img className="" onClick={()=>updateGraffityInMap(graffiti.submission_id)} width={80} src="/pin-explosions.svg" alt="" />
          {/* <Image onClick={()=>updateGraffityInMap(graffiti.submission_id)} src="/pin-explosions.svg" alt="" width={80} height={80}   /> */}
        </Marker>
      ))}
      <NavigationControl />
    </Map>
    </>
  )
}