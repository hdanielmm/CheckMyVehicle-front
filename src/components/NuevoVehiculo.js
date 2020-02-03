import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const NuevoVehiculo = () => {

  const [atributo, setAtributo] = useState({
    placa: '',
    marca: '',
    linea: '',
    modelo: ''
  });

  const handleSubmit = (event) => {

    event.preventDefault();
    
    // const headers = {
    //   'Access-Control-Allow-Origin' : '*',
    //   'Access-Control-Allow-Credentials': true,
    //   'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // }

    const vehiculo = {
      placa: atributo.placa
    }

    console.log("Vehiculo", vehiculo);
    // useEffect(() => {

    axios.post(`http://localhost:3000/vehiculo`, vehiculo )
      .then(res => {
        console.log(res);
        console.log(res.Status);
      })
      .catch(error => console.log(error));

    // }, []);

  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(value);

    setAtributo(prevAtributo => ({
      ...prevAtributo,
      [name]: value
    }));
  }

  function handleClick(e) {

    setAtributo({
      placa: '',
      marca: '',
      linea: '',
      modelo: ''
    });
    e.preventDefault();

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Placa
        <input type='text' name='placa' onChange={handleChange} value={atributo.placa} />
        </label>
        <label>
          Marca
        <input type='text' name='marca' onChange={handleChange} value={atributo.marca} />
        </label>
        <label>
          Línea
        <input type='text' name='linea' onChange={handleChange} value={atributo.linea} />
        </label>
        <label>
          Modelo
        <input type='text' name='modelo' onChange={handleChange} value={atributo.modelo} />
        </label>
        {/* <button type='submit'>Guardar</button> */}
        <input type='submit' value='Guardar' />
      </form>
    </div>
  )
};

export default NuevoVehiculo;