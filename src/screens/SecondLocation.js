import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GpsInterface } from '../components/GpsInterface';
import { ApiUi } from '../components/ApiUi';

export default function SecondLocation() {
  const savedCoords = useSelector(state => state.coords[1]);
  const navigate = useNavigate();

  const [switchLeft, setSwitchLeft] = useState(true); // switch to select gps or api

  const GpsApiSwitch = () => {
    const isWaiting = useSelector(state => state.status.awaitingResponse);
    return(
      <div style={{textAlign:'center'}}>
        <span className={switchLeft ? 'switch-selected' : (isWaiting ? null : 'switch-notselected')} onClick={isWaiting ? null : ()=>setSwitchLeft(true)}>Use location on device</span>
        <span> | </span>
        <span className={switchLeft ? (isWaiting ? null : 'switch-notselected') : 'switch-selected'} onClick={isWaiting ? null : ()=>setSwitchLeft(false)}>Input target address</span>
      </div>
    );
  }

  const NavFooter = () => {
    const isWaiting = useSelector(state => state.status.awaitingResponse);
    return(
      <div style={{textAlign:'center'}}>
        <button name="back" disabled={isWaiting} onClick={()=>navigate(-1)}>Go back</button>
        <button name="next" disabled={savedCoords.source==null || isWaiting} onClick={()=>navigate("/end")}>Calculate distance</button>
      </div>
    );
  }

  return (
    <div className='outerbox'>
      <h1>Input Second Location</h1>
      
      <h2>Select method</h2>
      <GpsApiSwitch/>

      {switchLeft ? <GpsInterface screenIndex={1} /> : <ApiUi screenIndex={1} />}

      {savedCoords.source!=null ? <p>Currently saved source: {savedCoords.source}<br/>Saved Lat: {savedCoords.lat}<br/>Saved Lon: {savedCoords.lon}</p> : null }
      <NavFooter/>
    </div>
  );
}