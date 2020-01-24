import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    const [ datos, guardarDatos ] = useState({
        artista: '',
        cancion: ''
    });
    const [ error, guardarError ] = useState(false);

    const { artista, cancion } = datos;
    

    const leerCambios = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    } 

    const buscarInformacion = e =>{
        e.preventDefault();

        // Validar
        if(artista.trim() === '' || cancion.trim() === ''){
            guardarError(true);
            return null;
        }
        guardarError(false);

        //Pasar Valores
        guardarBusqueda(datos);
    }

    return ( 
        <div className="bg-info">
            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null }
            <div className="container">
                <div className="row">
                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarInformacion}
                    >
                        <fieldset>
                            <legend className="text-center">
                                Buscar Letras Canciones
                            </legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={leerCambios}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Canción"
                                            onChange={leerCambios}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Formulario;