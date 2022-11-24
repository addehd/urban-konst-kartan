import Map, {NavigationControl, Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import {useState} from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/navbar';

export default function Home() {
  const [graffitisInMap, activateGraffiti] = useState([ 
    {  id:0, styleId: "artsy-zero", "name": "artsy", "img": "https://wordpress-577345-2793876.cloudwaysapps.com/wp-content/uploads/elementor/forms/62eb861f93479.jpg", "longitude": 13.016582150204426, "latitude": 55.58838099725011, "active": true,},
    { id: 1, styleId: "artsy-one","name": "artsy","name": "art", "img": "https://wordpress-577345-2793876.cloudwaysapps.com/wp-content/uploads/elementor/forms/63106db05f8e9.jpg", "longitude":13.00973, "latitude": 55.60587, "active": false },
    { id: 2, styleId: "artsy-two", "name": "art", "img": "https://wordpress-577345-2793876.cloudwaysapps.com/wp-content/uploads/elementor/forms/63106db05f8e9.jpg", "longitude":13.00023, "latitude": 55.60587, "active": false },
    { id:3, styleId: "artsy-three", "name": "artsy deux", "img": "https://wordpress-577345-2793876.cloudwaysapps.com/wp-content/uploads/elementor/forms/63106db05f8e9.jpg", "longitude": 13.00793, "latitude": 55.60887, "active": false, },
  ], []);
  function updateGraffity(){
    console.log("updateGraffity");
  }
  return (  
    <main>
      <div className='artView'>
        {graffitisInMap.map((graffiti, index) => (
        <div className='art' key={index}>
          <img style={{width:"100%", paddingRight: "1rem"}} src={graffiti.img} alt="" />
          <p>{graffiti.latitude}<span>, </span>{graffiti.longitude}</p>
          <p>{graffiti.name}</p>
          <p>{graffiti.active}</p>
          <div className={graffiti.active ? 'active' : 'inactive'} > TEST</div>
        </div>
        ))}
      </div>

      <Map className="test" mapLib={maplibregl} 
        initialViewState={{ longitude: 13.00073, latitude: 55.60587, zoom: 17, pitch: 85, pinch: 200, bearing: 0, }}
        style={{width: "100%", height: " calc(100vh - 77px)"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=InUWzr8s1xkknwxF8ZG8">

        <NavigationControl />

        {graffitisInMap.map((graffiti, index) => (
          <Marker key={index} longitude={graffiti.longitude} latitude={graffiti.latitude}>
            <img onClick={() => updateGraffity(graffiti.id)} width={80} src="/pin-explosions.svg" alt="" />
          </Marker>
        ))}
      </Map>
    </main>
  )
}
