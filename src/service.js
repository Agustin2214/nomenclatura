/////////// GENERAR PATRON

function generarPatron(filas, columnas) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const resultado = [];
    let contador = 1;
  
    for (let i = 0; i < filas; i++) {
      const letra = letras[i];
  
      for (let j = 0; j < columnas; j++) {
        const numero = contador.toString().padStart(2, '0');
        const item = `${numero}-${letra}_${letra}`;
        resultado.push(item);
        contador++;
      }
    }
  
    return resultado;
  }

//   const filas = 4;
//   const columnas = 3;
//   const patron = generarPatron(filas, columnas);

///////////// Eliminar modulos no existentes  //////////

  function eliminarNumeros(matriz, numeros) {
    numeros.forEach(numero => {
      const indice = matriz.findIndex(item => item.startsWith(numero.toString().padStart(2, '0')));
      if (indice !== -1) {
        matriz.splice(indice, 1);
        for (let i = indice; i < matriz.length; i++) {
          const num = (i + 1).toString().padStart(2, '0');
          matriz[i] = matriz[i].replace(/^\d+/, num);
        }
      }
    });
    return matriz
  }

  // eliminarNumeros(matriz, [12,9,8]);


  //////////////divividir por letras /////////////////////////
  function dividirPorLetra(matriz) {
    const letras = {};
  
    matriz.forEach((item) => {
      const letra = item.charAt(3); // Obtener la letra después del guion bajo
  
      if (!letras[letra]) {
        letras[letra] = [];
      }
  
      letras[letra].push(item);
    });
  
    return letras;
  }
 
 // const letrasDivididas = dividirPorLetra(matrizOriginal);


 ////////FORMAR RESULTADO ///////////
 function formarResultado(objeto) {
    const resultado = [];
  
    for (const letra in objeto) {
      if (objeto.hasOwnProperty(letra)) {
        const array = objeto[letra];
        const longitud = array.length;
  
        for (let i = 0; i < longitud; i++) {
          const numeroInicio = i * 4 + 1;
          const numeroFin = i * 4 + 4;
          
          ////////////////////
          function agregarNumeroDespuesPrimeraLetra(texto, numero) {
            const primeraParte = texto.slice(0, 1);
            const segundaParte = texto.slice(1);
            return `${primeraParte}${numero}${segundaParte}`;
          }
          
         
          const textoModificado = agregarNumeroDespuesPrimeraLetra(array[i].slice(3), numeroInicio);
         
          ////////////////////
         
          const elemento = `${array[i].slice(0, 3)}${textoModificado}${numeroFin}`;
          resultado.push(elemento);
        }
      }
    }
  
    return resultado;
  }
  
  
  //const resultadoFinal = formarResultado(objetoOriginal);

  const authService = {
    formarResultado,
    dividirPorLetra,
    eliminarNumeros,
    generarPatron
  
  };

  export default authService;