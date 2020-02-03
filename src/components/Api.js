import React, { useState, useEffect } from 'react'

const Api = () => {

  const [state, setstate] = useState({
    done: false,
    vehiculos: []
  });

  useEffect(() => {
    fetch('http://localhost:3000/vehiculo')
      .then(response => response.json())
      .then(res => {
        if (res && res.data) {
          console.log("res.data", res.data);
          setstate({ vehiculos: [...state.vehiculos, ...res.data] });
        }
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
