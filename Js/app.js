console.log("Conexión existosa");

/* =========================================
   IMPORTACIONES
========================================= */
import { obtenerPaises } from "./API/countriesApi.js";
import {
  mostrarCargando,
  mostrarError,
  renderPaises,
  actualizarContador,
} from "./ui/ui.js";

// ESTADO DE LA APLICACIÓN
let paises = [];

// REFERENCIAS DEL DOM
const destinationsContainer = document.querySelector("#destinations-container");
const resultsCount = document.querySelector("#results-count");

// INICIALIZACIÓN DE LA APLICACIÓN
// Se le agrega async para que sea una función asíncrona
async function init() {
    console.log("Explorador de Viajes iniciado");
    // resultsCount.textContent = "0 destinos"

    /* =====================================
        MOSTRAR ESTADO DE CARGA
    ===================================== */
    mostrarCargando(destinationsContainer);

    // OBTENER PAISES DE LA API
    paises = await obtenerPaises();

    // COMPROBAR RESULTADOS
    console.log("Países obtenidos: ", paises);

    // VALIDAR SI LA API RETORNO DATOS
    if (paises.length === 0) {
        mostrarError(destinationsContainer);
        actualizarContador(0, resultsCount);
        return;
    }

    // RENDERIZAR DESTINOS
    renderPaises(paises, destinationsContainer)

    // ACTUALIZAR CONTADOR
    actualizarContador(paises.length, resultsCount)
}

// INICIAR APLICACIÓN
init();
