import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainScreen from './screens/MainScreen';
import FirstLocation from './screens/FirstLocation';
import SecondLocation from './screens/SecondLocation';
import DistanceCalculation from './screens/DistanceCalculation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen/>} />
        <Route path="firstlocation" element={<FirstLocation/>} />
        <Route path="secondlocation" element={<SecondLocation/>} />
        <Route path="end" element={<DistanceCalculation/>} />
      </Routes>
    </BrowserRouter>
  );
}