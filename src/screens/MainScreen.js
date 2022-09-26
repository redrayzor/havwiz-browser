import React from 'react';
import { Link } from 'react-router-dom';

export default function MainScreen() {
  return (
    <div className='outerbox'>
      <h1>Haversine Wizard</h1>
      <h2>Geocode API, GPS, and Distance Calculation App</h2>
      <p>This app will allow you to input two locations - either from addresses you enter or your device's GPS.  The app will then calculate the distance between the two locations.</p>
      <p>When you're ready, press the button below to input the first location.</p>
      <div style={{textAlign:'center'}}><Link to="firstlocation">Input first location</Link></div>
    </div>
  );
}