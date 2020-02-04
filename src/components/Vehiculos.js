import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Vehiculos = () => {

  const [buscarElemento, setBuscarElemento] = useState("");

  const [vehiculoEncontrado, setVehiculoEncontrado] = useState({
    vehiculo: []
  });

  const [state, setState] = useState({
    done: false,
    vehiculos: []
  });

  useEffect(() => {
    Axios.get('http://localhost:3000/vehiculo')
      .then(res => {
        const vehiculos = res.data;
        setState({ vehiculos: [...state.vehiculos, ...vehiculos] });
      });
  }, []);

  const handleChange = event => {
    const value = event.target.value;

    setBuscarElemento(value);
  }

  const handleSubmit = (event) => {
    const encontrado = state.vehiculos.filter(vehiculo => {
      return vehiculo.placa === buscarElemento
    });

    setVehiculoEncontrado({ vehiculo: encontrado });
    
    setBuscarElemento("");
    
    event.preventDefault();
  }

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

  const buscarVehiculo = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={buscarElemento} onChange={handleChange} />
        </label>
        <input type='submit' value='Buscar' />
      </form>
    )
  }

  const renderVehiculo = () => {
    return (
      <div>
        {
          vehiculoEncontrado.vehiculo.map(v => {
            return (
              <div>
                <h3>Datos del vehículo</h3>
                <p>Placa:  {v.placa}</p>
                <p>Marca:  {v.marca}</p>
                <p>Línea:  {v.linea}</p>
                <p>Modelo: {v.modelo}</p>
              </div>
            )
          })
        }
      </div>
    );
  };

  return (
    <div>
      {buscarVehiculo()}
      {/* {renderVehiculos()} */}
      {renderVehiculo()}
    </div>
  )
}

export default Vehiculos;
