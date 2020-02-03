import React from 'react';
import './App.css';
import Api from './Api';
import NuevoVehiculo from './NuevoVehiculo';

function App() {
  return (
    <div className="App">
      <Api />
      <NuevoVehiculo />
    </div>
  );
}

export default App;
