import React, { useState } from 'react';
import axios from 'axios';

const NuevoVehiculo = () => {

  const [atributo, setAtributo] = useState({
    placa: '',
    marca: '',
    linea: '',
    modelo: ''
  });

  const handleSubmit = (event) => {

    

    axios.post(`http://localhost:3000/vehiculo`, atributo )
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
        <input type='submit' value='Guardar' />
      </form>
    </div>
  )
};

export default NuevoVehiculo;