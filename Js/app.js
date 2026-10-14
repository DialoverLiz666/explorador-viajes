console.log("Conexión existosa")

/* =========================================
   IMPORTACIONES
========================================= */
import { obtenerPaises } from "./API/countriesApi.js";

// ESTADO DE LA APLICACIÓN
let paises = []

// REFERENCIAS DEL DOM
const destinationContainer = document.querySelector("#destinations-container")
const resultsCount = document.querySelector("#results-count")
const initialMessage = document.querySelector("#initial-message")

// INICIALIZACIÓN DE LA APLICACIÓN
// Se le agrega async para que sea una función asíncrona
async function init() {
    console.log("Explorador de Viajes iniciado")
    // resultsCount.textContent = "0 destinos"

    // MOSTRAR ESTADO DE CARGA
    initialMessage.innerHTML = /*html*/ `
    <div class="text-5xl mb-4">
        🌎
    </div>

    <h3 class="
            text-xl
            font-semibold
            text-slate-800
            mb-2
        ">
        Cargando destinos
    </h3>

    <p class="text-slate-500">
        Estamos consultando información de países alrededor del mundo
    </p>
    `

    // OBTENER PAISES DE LA API
    paises = await obtenerPaises()
    console.log("Países obtenidos: ", paises)

    // ACTUALIZAR CONTADOR
    resultsCount.textContent = `${paises.length} destinos`
    
    // MOSTRAR RESULTADOS DE LA CARGA
    if (paises.length > 0) {
        initialMessage.innerHTML = /*html*/`
        <div class="text-5xl mb-4">
        ✅
        </div>

        <h3 class="
                text-xl
                font-semibold
                text-slate-800
                mb-2
            ">
            Destinos cargados
        </h3>

        <p class="text-slate-500">
            Se obtuvieron ${paises.length} destinos correctamente.
        </p>
        `
    } else {
        // MOSTRAR UN MENSAJE SI OCURRE UN ERROR
        initialMessage.innerHTML = /*html*/`
        <div class="text-5xl mb-4">
            ⚠️
        </div>

        <h3 class="
                text-xl
                font-semibold
                text-slate-800
                mb-2
            ">
            No fue posible cargar los destinos
        </h3>

        <p class="text-slate-500">
            Verifica tu conexión e intenta nuevamente.
        </p>
        `
    }
}

// INICIAR APLICACIÓN
init()