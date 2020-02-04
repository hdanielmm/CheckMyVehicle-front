import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const NuevoVehiculo = () => {

  const [atributo, setAtributo] = useState({
    placa: '',
    marca: '',
    linea: '',
    modelo: ''
  });

  const handleSubmit = (event) => {

    axios.post(`http://localhost:3000/vehiculo`, atributo)
      .then(res => {
        console.log(res);
        console.log(res.Status);
      })
      .catch(error => console.log(error));
    event.preventDefault();
    limpiarInput();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAtributo(prevAtributo => ({
      ...prevAtributo,
      [name]: value
    }));
  }

  const handleClick = () => {
    limpiarInput();
  }

  const limpiarInput = () => {
    setAtributo({
      placa: '',
      marca: '',
      linea: '',
      modelo: ''
    });
  };

  return (
    <div>
      <form className='form-vehiculo' onSubmit={handleSubmit}>
        <label>
          <input
            type='text'
            name='placa'
            onChange={handleChange}
            value={atributo.placa}
            placeholder='Placa' />
        </label>
        <label>
          <input
            type='text'
            name='marca'
            onChange={handleChange}
            value={atributo.marca}
            placeholder='Marca' />
        </label>
        <label>
          <input
            type='text'
            name='linea'
            onChange={handleChange}
            value={atributo.linea}
            placeholder='Línea' />
        </label>
        <label>
          <input
            type='text'
            name='modelo'
            onChange={handleChange}
            value={atributo.modelo}
            placeholder='Modelo' />
        </label>
        <div className='div-boton'>
          <input className='boton' type='submit' value='Guardar' />
          <input className='boton' type='submit' value='Cancelar' onClick={handleClick} />
        </div>
      </form>
    </div>
  )
};

export default NuevoVehiculo;