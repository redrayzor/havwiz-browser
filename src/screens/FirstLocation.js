import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GpsInterface } from '../components/GpsInterface';
import { ApiUi } from '../components/ApiUi';

export default function FirstLocation() {
  const savedCoords = useSelector(state => state.coords[0]);
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
        <button name="next" disabled={savedCoords.source==null || isWaiting} onClick={()=>navigate("/secondlocation")}>Input second location</button>
      </div>
    );
  }

  return (
    <div className='outerbox'>
      <h1>Input First Location</h1>
      
      <h2>Select method</h2>
      <GpsApiSwitch/>

      {switchLeft ? <GpsInterface screenIndex={0} /> : <ApiUi screenIndex={0} />}

      {savedCoords.source!=null ? <p>Currently saved source: {savedCoords.source}<br/>Saved Lat: {savedCoords.lat}<br/>Saved Lon: {savedCoords.lon}</p> : null }
      <NavFooter/>
    </div>
  );
}