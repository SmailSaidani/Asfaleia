// import React, { useState } from "react";

// import MapPicker from "react-google-map-picker";


// const DefaultLocation = { lat: 36.89252954512626, lng: 4.1249710567289855 };
// const DefaultZoom = 10;

// export default function ResponsiveDialog() {
//   const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

//   const [location, setLocation] = useState(defaultLocation);
//   const [zoom, setZoom] = useState(DefaultZoom);

//   function handleChangeLocation(lat, lng) {
//     setLocation({ lat: lat, lng: lng });
//   }

//   function handleChangeZoom(newZoom) {
//     setZoom(newZoom);
//   }

//   function handleResetLocation() {
//     setDefaultLocation({ ...DefaultLocation });
//     setZoom(DefaultZoom);
//   }

//   return (
//     <>
//       <button onClick={handleResetLocation}>Reset Location</button>
//       <label>Latitute:</label>
//       <input type="text" value={location.lat} disabled />
//       <label>Longitute:</label>
//       <input type="text" value={location.lng} disabled />
//       <label>Zoom:</label>
//       <input type="text" value={zoom} disabled />

//       <MapPicker
//         defaultLocation={defaultLocation}
//         zoom={zoom}
//         style={{ height: "700px" }}
//         onChangeLocation={handleChangeLocation}
//         onChangeZoom={handleChangeZoom}
//         apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
//       />
//     </>
//   );
// }


import React, { useState } from 'react';
import Loader from "./loader";
import Vid from "./video";
import Logo from './logoL';

  const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  return (
    <div className="App">
      <Logo />
      {/* <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>} */}
    </div>
  );
}

export default App;