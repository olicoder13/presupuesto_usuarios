import React, {useState} from 'react'
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [err, guardarError] = useState(false);

    //cuando un usuario agrega un gasto
    const agregarGasto = event =>{
        event.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        
        
        //Construir el gasto
        const gasto ={
            nombre,
            cantidad,
            id: shortid.generate()
        } 
        
        //pasar el gasto al componente principal
        guardarGasto(gasto)
        guardarCrearGasto(true)

        //resetear el form 
        guardarCantidad(0);
        guardarNombre('');
    }

  return (
    <form onSubmit={agregarGasto}>
        <h2>Agrega tus gatos aqui</h2>

        {
            err ? <Error mensaje='Ambos campos son obligatorios o Presupuesto Incorrecto' />
            :
            null
        }
        <div className="campo">
            <label htmlFor="nombre">Nombre Gasto</label>
            <input
            id='nombre'
            type="text"
            className="u-full-width"
            placeholder="Ej. Transporte"
            value={nombre}
            onChange={event => guardarNombre(event.target.value)}
            />
        </div>

        <div className="campo">
            <label htmlFor="cantidad">Catidad Gasto</label>
            <input
            id="cantidad"
            type="number"
            className="u-full-width"
            placeholder="Ej. 300"
            value={cantidad}
            onChange={event => guardarCantidad(parseInt(event.target.value, 10))}
            />
        </div>

        <input type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
        />
    </form>
  )
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
  }

export default Formulario