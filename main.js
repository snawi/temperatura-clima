import './style.css'

const formulario = document.querySelector('#formulario')
const resultados = document.querySelector('#resultados')

window.addEventListener('load', () => {
  formulario.addEventListener('submit', formularioValidacion)

 

})




 
function formularioValidacion(e){

  e.preventDefault()

  const ciudad = document.querySelector('#ciudad').value
  const pais = document.querySelector('#pais').value

  //validar

  if(ciudad === '' || pais === ''){
    validacion('los campos son obligatorios')

    return;
  }

  //consultar Api
  consultarApi(ciudad, pais)




}









function validacion(mensaje){

  // no se repita la alerta
  const repeticion = document.querySelector('.mensaje1')

  if(!repeticion){

  const mensajeError = document.createElement('div')
  mensajeError.classList.add('mensaje1')
  mensajeError.innerHTML = `
  <strong class="errorMedio">Error!</strong>
  <span> ${mensaje}</span>
  `

  
  formulario.append( mensajeError )
  
 setTimeout(() => {
  mensajeError.remove()
 }, 3000);

}

  }

  

// funcion de consultar api

function consultarApi(ciudad, pais){

  const apiKey = '0f0fef25c436a9a0b0979ad39c8cd0a5'

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

  spinner()

  fetch( url )
  .then( respuesta => respuesta.json())
  .then( resultado => {

    console.log(resultado);

    limpiarHtml()
    
    if(resultado.cod === "404"){
      validacion('ciudad no encontrada')
      return
    }

    //imprime la respuesta en el html
    respuestaDeApi(resultado)

  })
}


function respuestaDeApi(resultado){
  const {main: {temp, temp_max, temp_min}} = resultado;

  const grados = kelvinAgrados( temp)
  const max = kelvinAgrados(temp_max)
  const min = kelvinAgrados(temp_min)


  
  const tempMax = document.createElement('p')
   tempMax.classList.add('tempMaxima') 
  tempMax.innerHTML = `TempMax: ${max} &degC`

  const tempMin = document.createElement('p')
   tempMin.classList.add('tempMaxima') 
   tempMin.innerHTML = `TempMin: ${min} &degC`

 

  const mostrarGrados = document.createElement('p')
   mostrarGrados.classList.add('mensajeNumeroConsulta') 
  mostrarGrados.innerHTML = `${grados} &degC`

  resultados.appendChild( mostrarGrados)
  resultados.appendChild( tempMax)
  resultados.appendChild( tempMin)
  


  function kelvinAgrados(grados){
    return parseInt(grados - 273.15)
  }


}
  
function limpiarHtml(){
  while( resultados.firstChild){
    resultados.removeChild( resultados.firstChild)
  }
}



function spinner(){

  const divSpinner = document.createElement('div')
  divSpinner.classList.add('sk-fading-circle')

  divSpinner.innerHTML = `<div>
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
</div>`

resultados.appendChild(divSpinner)





}








