import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Inicio from './Inicio';
import Vehiculos from './vehiculos/Vehiculos';
import NuevoVehiculo from './nuevoVehiculo/NuevoVehiculo';
import Revisiones from './Revisiones';
import NuevaRevision from './NuevaRevision';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <h1>Check My Vehicle</h1>
        <ul className='header'>
          <li><NavLink exact to="/">Inicio</NavLink></li>
          <li><NavLink to="/vehiculos">Vehiculos</NavLink></li>
          <li><NavLink to="/nuevoVehiculo">Nuevo vehículo</NavLink></li>
          <li><NavLink to="/revisiones">Revisiones</NavLink></li>
          <li><NavLink to="/nuevaRevision">Nueva revisión</NavLink></li>
        </ul>
        <div className='content'>
          <Route exact path='/' component={Inicio} />
          <Route path='/vehiculos' component={Vehiculos} />
          <Route path='/nuevoVehiculo' component={NuevoVehiculo} />
          <Route path='/revisiones' component={Revisiones} />
          <Route path='/nuevaRevision' component={NuevaRevision} />
        </div>
      </div >
    </HashRouter>
  );
}

export default App;
