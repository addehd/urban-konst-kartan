import Navbar from '../../components/navbar.js';
import { useState } from 'react';
import Sequelize from "sequelize";
import dbConfig from "../../db/db.config.js";
import { sqlQuery } from "../../db/db.js";
import Pin from '../../components/pin.js';
import Image from 'next/image';
import Map, {NavigationControl, Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Model from '../../components/Model.js';

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
  const [artInfo, setArtInfo] = useState(null);
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

  const updateArtInfo = (id) => {
    setArtInfo(artInfo === id ? null : id);
  }

  const toggleModel = () => {
    setShowModel(!showModel);
  }
    
  // Example of multiple models at different locations
  const models = [
    { 
      id: 1, 
      url: "/ping.gltf", 
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
      <Model
        modelUrl="/pin.gltf" 
        modelScale={0.42}
        mapCoordinates={{ 
          lng: "12.9", 
          lat: "55.580",
          elevation: 0 
        }}
        mapInstance={mapRef}
        link={`https://3d.cfuk.nu/rum/32`}
        tiltX={270}
        tiltY={120}
        tiltZ={110}
      />
    </>
  )
}