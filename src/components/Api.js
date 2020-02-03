import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Api = () => {

  const [state, setState] = useState({
    done: false,
    vehiculos: []
  });

  useEffect(() => {
    Axios.get('http://localhost:3000/vehiculo')
      .then(res => {
        const vehiculos = res.data;
        setState({vehiculos: [...state.vehiculos, ...vehiculos]});
      });
  }, []);

  const renderVehiculos = () => {
    if (state.vehiculos.length < 1) {
      return <div>Loading...</div>
    } else {
      return (
        <ul>
          {state.vehiculos.map((vehiculo, index) => (
            <li key={index}>{vehiculo.placa} - {vehiculo.marca}</li>
          ))}
        </ul>
      )
    }
  }
  return (
    <div>

      <h1>Hola desde Api</h1>
      {renderVehiculos()}
    </div>
  )
}

export default Api
