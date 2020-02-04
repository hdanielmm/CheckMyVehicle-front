import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { render } from '@testing-library/react';
import './styles.css';

const Vehiculos = () => {

  const [buscarElemento, setBuscarElemento] = useState("");

  const [vehiculoEncontrado, setVehiculoEncontrado] = useState({
    vehiculo: [],
  });

  const [ultimaRevision, setUltimaRevision] = useState({
    revision: []
  })

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

  const revisiones = (placa) => {
    Axios.get('http://localhost:3000/vehiculo/' + placa)
      .then(res => {
        const revision = res.data;
        setUltimaRevision({ revision: [...ultimaRevision.revision, ...revision] });
      });
  }

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
    revisiones(encontrado[0].placa)
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
      <div className='buscar-vehiculo'>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" value={buscarElemento} onChange={handleChange} />
          </label>
          <input type='submit' value='Buscar' />
        </form>
      </div>
    )
  }

  const renderVehiculo = () => {

    return (
      <div className='vehiculo'>
        {
          vehiculoEncontrado.vehiculo.map(v => {
            return (
              <div key={v.placa}>
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

  const renderUltimaRevision = () => {
    return (
      <div className='ultima-revision'>
        <h3>Última revisión</h3>
        {
          ultimaRevision.revision.map((rev, index) => {
            return (
              <div key={rev.index}>
                <h4>{rev.parte}</h4>
                <p>Técnico: {rev.empleado}</p>
                <p>Comentario: {rev.diagnostico}</p>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div className='container'>
      {buscarVehiculo()}
      {/* {renderVehiculos()} */}
      {renderVehiculo()}
      {renderUltimaRevision()}
    </div>
  )
}

export default Vehiculos;
