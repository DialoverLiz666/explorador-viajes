console.log("Conexión existosa")

// REFERENCIAS DEL DOM
const destinationContainer = document.querySelector("#destinations-container")
const resultsCount = document.querySelector("#results-count")

// INICIALIZACIÓN DE LA APLICACIÓN
function init() {
    console.log("Explorador de Viajes iniciado")
    resultsCount.textContent = "0 destinos"
}

// INICIAR APLICACIÓN
init()