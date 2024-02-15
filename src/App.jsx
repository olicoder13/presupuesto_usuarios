import React, { useState, useEffect } from "react";
import "./App.css";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  //definir el state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarPregunta, actualizarPregunta] = useState(true);
  const [gasto, guardarGasto] = useState({});
  const [gastos, guardarGastos] = useState([]);
  const [crearGasto, guardarCrearGasto] = useState(false);

  //UseEffect actualiza lo restante
  useEffect(() => {


    //Agrega el nuevo presupuesto
    if(crearGasto){
      guardarGastos( [
        ...gastos,
        gasto
      ] )

      //resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //resetear a false
      guardarCrearGasto(false)
    }
    
  }, [gasto, crearGasto, gastos, restante])
  

  //cuando agregemos un nuevo gasto
  
  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>

        <div className="contenido-principal contenido">
          {mostrarPregunta ? (
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                guardarGasto={guardarGasto}
                guardarCrearGasto={guardarCrearGasto}
                />
              </div>
              <div className="one-half column"><Listado
                gastos={gastos}
              />
              <ControlPresupuesto 
              presupuesto={presupuesto}
              restante={restante}
              />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
