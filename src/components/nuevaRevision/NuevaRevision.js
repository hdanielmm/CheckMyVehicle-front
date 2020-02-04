import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const NuevaRevision = () => {

  const [buscarElemento, setBuscarElemento] = useState("");

  const [vehiculoEncontrado, setVehiculoEncontrado] = useState({
    vehiculo: [],
  });

  const [revision, setRevision] = useState({
    estado: 0,
    fechaRevision: '',
    vehiculoPlaca: '',
    empleadoId: ''
  });

  const [parteVehiculo, setParteVehiculo] = useState({
    fechaRevision: '',
    diagnostico: '',
    revisionId: '',
    parteVehiculoId: '',
    tecnicoId: ''
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

  const handleChangeBuscador = event => {
    const value = event.target.value;

    setBuscarElemento(value);
  }

  const handleSubmitBuscador = (event) => {
    const encontrado = state.vehiculos.filter(vehiculo => {
      return vehiculo.placa === buscarElemento
    });

    setVehiculoEncontrado({ vehiculo: encontrado });

    setBuscarElemento("");
    event.preventDefault();
  }

  const handleChange = (event) => {
    console.log("entra", event.target);
    const { name, value } = event.target;

    setRevision(prevRev => ({
      ...prevRev,
      [name]: value
    }));
  }

  const handleChangeParte = (event) => {
    
    const { name, value } = event.target;

    setParteVehiculo(prevRev => ({
      ...prevRev,
      [name]: value
    }));
  }

  const handleClick = () => {

  }

  const buscarVehiculo = () => {
    return (
      <div className='buscar-vehiculo'>
        <form onSubmit={handleSubmitBuscador}>
          <label>
            <input type="text" value={buscarElemento} onChange={handleChangeBuscador} />
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

  const adicionarParte = () => {
    return (
      <div>
        <form>
          <label>
            <input
              type='text'
              name='parteVehiculoId'
              onChange={handleChangeParte}
              value={parteVehiculo.parteVehiculoId}
              placeholder='Nuevo item' />
          </label>
        </form>
      </div>
    )
  }

  const guardarFecha = () => {
    return (
      <div>
        <form>
          <label>
            <input
              type='text'
              name='fechaRevision'
              onChange={handleChange}
              value={revision.fechaRevision}
              placeholder='Fecha y hora' />
          </label>
        </form>
      </div>
    )
  }

  return (
    <div className='container'>
      <div>
        {buscarVehiculo()}
        {renderVehiculo()}
      </div>
      {guardarFecha()}
      {adicionarParte()}
      <div className='div-boton'>
        <input className='boton' type='submit' value='Guardar' />
        <input className='boton' type='submit' value='Cancelar' onClick={handleClick} />
      </div>
    </div>
  )
}

export default NuevaRevision;
