import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveCoords } from '../screens/coordsSlice';
import { startWaiting, stopWaiting } from '../screens/statusSlice';

export const GpsInterface = (props) => {
  const dispatch = useDispatch();
  const isWaiting = useSelector(state => state.status.awaitingResponse);

  const [statusMessage, setStatusMessage] = useState('Waiting for user action'); // message
  const [currentPosition, setCurrentPosition] = useState(null); // stores coords
  const [isError, setIsError] = useState(false);

  // gets device location
  const getOneTimeLocation = () => {
    setIsError(false);
    setStatusMessage('Getting location');
    dispatch(startWaiting());
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(stopWaiting())
        setStatusMessage('Successfully obtained location');
        setCurrentPosition(position.coords);
      },
      (error) => {
        dispatch(stopWaiting());
        setStatusMessage(error.message);
        setIsError(true);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000
      },
    );
  }

  const backupCoords = () => {
    setCurrentPosition({latitude:27.77, longitude:-82.63});
    setIsError(false);
    setStatusMessage('Successfully obtained location');
  }

  const gpsCoordsSave = () => {
    dispatch(saveCoords({
      index: props.screenIndex,
      lat: currentPosition.latitude,
      lon: currentPosition.longitude,
      source: "Device Location",
    }));
  }

  return(
    <div style={{marginBottom:10}}>
      <p>Access Device's GPS and show current latitude and longitude</p>
      <button name="getcoords" disabled={isWaiting} onClick={getOneTimeLocation}>{isWaiting ? "getting coordinates" : "get coordinates"}</button>
      <p>{statusMessage}</p>
      {(statusMessage==='Successfully obtained location') ? <div>
          <p>Lat: {currentPosition.latitude}, Lon: {currentPosition.longitude}</p>
          <button name="savecoords" disabled={currentPosition==null} onClick={()=>gpsCoordsSave()}>save coords</button>
        </div> : null }
      {isError ? <button name="mockcoords" onClick={backupCoords}>Mock successful location call</button> : null}
    </div>
  );
}