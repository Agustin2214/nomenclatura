
import  React, { useState } from 'react';
import authService from './service';

import style from './App.module.css'

function App() {
  const [filas, setFilas] = useState(0);
  const [columnas, setColumnas] = useState(0);
  const [patron, setPatron] = useState([])
  const [eliminados, setEliminados] = useState([])
  const [final, setFinal] = useState([])

function handleSumbit(e){
  e.preventDefault()
  setPatron(authService.generarPatron(filas,columnas))
}

function handleClick(e){
let numero = parseInt(e.target.value)
  if (eliminados.includes(numero)) {
    // Si el número ya está presente en el array, lo eliminamos
    const nuevosEliminados = eliminados.filter((el) => el !== numero);
    setEliminados(nuevosEliminados);
  } else {
    // Si el número no está en el array, lo agregamos
    setEliminados([...eliminados, numero]);
  }}

function handleClickDelete(e){

let aux = authService.eliminarNumeros(patron,eliminados)
let aux1 = authService.dividirPorLetra(aux)
let aux2 = authService.formarResultado(aux1)
setFinal(aux2)
}

function handelReiniciar(){
  setFilas(0)
  setColumnas(0)
  setPatron([])
  setEliminados([])
  setFinal([])
}








  return (
    <div>
    {final.length > 0 ? (
      <>
        {final.map((option, index) => (
          <p key={index}>{option}</p>
        ))}
        <button onClick={handelReiniciar}>Reiniciar</button>
      </>
    ) :
    <div className="App">
        <form onSubmit={handleSumbit}>
    <label>
      Filas:
      <input type="number" value={filas} onChange={event => setFilas(Number(event.target.value))} />
    </label>
    <label>
      Columnas:
      <input type="number" value={columnas} onChange={event => setColumnas(Number(event.target.value))} />
    </label>
    <button type="submit">Enviar</button>
  </form>
  <div>
  {patron.length > 0 ? (
    <>
      {patron.map((option, index) => {
        const currentLetter = option[3];
        const prevLetter = index > 0 ? patron[index - 1][3] : '';

        return (
          <React.Fragment key={index}>
            {currentLetter !== prevLetter && index > 0 && <br />}
            <button className={eliminados.includes(parseInt(`${option[0]}${option[1]}`)) ? style.eliminados : style.noEliminados} value={parseInt(`${option[0]}${option[1]}`)} onClick={handleClick}>{option}</button>
          </React.Fragment>
        );
      })}
      <div>
  
        <label>
         <h5>Eliminar siguiente modulos: </h5> {eliminados.map((option, index) => (
            <p>{option}</p>
          ))}
        </label>
        <button onClick={handleClickDelete}>Enviar</button>
     </div>
    </>
  ) : null}
</div>



    </div>
         }
         </div>
  );
         
}

export default App;
