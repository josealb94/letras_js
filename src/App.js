import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import axios from 'axios';

function App() {

  const [ busqueda, guardarBusqueda ] = useState({});
  const [ letra, guardarLetra ] = useState('');
  const [ info, guardarInfo ] = useState({});

  useEffect(() => {
    const consultarAPILetra = async () => {
      if(Object.keys(busqueda).length === 0) return;

      const  { artista, cancion } = busqueda;
      const urlLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios.get(urlLetra),
        axios.get(urlArtista)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
      //const resultado = await axios.get(url);
      //guardarLetra(resultado.);
    }

    consultarAPILetra();
  }, [busqueda, info]);

  // 

  return (
    <Fragment>
      <Formulario 
        guardarBusqueda={guardarBusqueda}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion 
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
