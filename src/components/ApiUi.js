import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { saveCoords } from '../screens/coordsSlice';
import { useGetCoordsQuery } from './apiSlice';

export const ApiUi = (props) => {
    const dispatch = useDispatch();

    const [text, setText] = useState(''); // text input
    const [apiCallPressed, setApiCallPressed] = useState(false);
  
    // renders only when API call button is pressed
    const ApiResponse = () => {
      const { data, isFetching, isSuccess, isError, error } = useGetCoordsQuery(text);

      if (isFetching) {
        return(
          <p>Currently Querying API</p>
        );
      } else if (isSuccess) {
        if (data.results.length === 1) {
          return(
            <div>
              <p>Interpreted address: {data.results[0].formatted_address}<br/>Lat: {data.results[0].location.lat}, Lon: {data.results[0].location.lng}</p>
              <button name="savecoords1" onClick={()=>apiCoordsSave(data,0)}>save coords</button>
              <button onClick={()=>setApiCallPressed(false)}>change address</button>
            </div>
          );
        } else if (data.results.length >= 2) {
          const MultiResults = () => {
            let temp = [];
            for (let i=0; i<data.results.length; i++) {
              temp.push(<div key={i}>
                <span>Match #{i+1}: {data.results[i].formatted_address}<br/>Lat: {data.results[i].location.lat}, Lon: {data.results[i].location.lng} </span>
                <span><button name={"savecoords"+(i+1)} onClick={()=>apiCoordsSave(data,i)}>save coords</button></span>
                <br/><br/>
              </div>)
            }
            return temp;
          }

          return(
            <div>
              <span>Multiple results returned!<br/>Interpreted input: {data.input.formatted_address} </span>
              <span><button onClick={()=>setApiCallPressed(false)}>change address</button></span>
              <br/>
              Choose one of the results below to save.
              <br/><br/>
              <MultiResults/>
            </div>
          );
        }
      } else if (isError) {
        console.log(error);
        return(
          <div>
            <p>Status code {error.status}: {JSON.stringify(error.data)}</p>
            <button onClick={()=>setApiCallPressed(false)}>change address</button>
          </div>
        );
      }
    }
  
    const apiCoordsSave = (data,i) => {
      dispatch(saveCoords({
        index: props.screenIndex,
        lat: data.results[i].location.lat,
        lon: data.results[i].location.lng,
        source: data.results[i].formatted_address,
      }));
    }
  
    return(
      <div style={{marginBottom:10}}>
        <p>Get latitude and longitude of user input address via Geocod.io API</p>
        <input
          placeholder="Type an address in here!"
          onChange={newText => setText(newText.target.value)}
          value={text}
          disabled={apiCallPressed}
          size="50"
        />
        <button name="submit" disabled={apiCallPressed || /[\da-z]/i.test(text) === false} onClick={()=>setApiCallPressed(true)}>{apiCallPressed ? "API already called" : "Geocode address"}</button>
        {apiCallPressed ? <ApiResponse /> : <p>Please double-check your address before clicking the button to geocode the address via the Geocod.io API.</p> }
      </div>
    );
}