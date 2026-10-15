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
import { procesarPaises } from "./utils/filters.js";

// ESTADO DE LA APLICACIÓN
let paises = [];

// REFERENCIAS DEL DOM
const destinationsContainer = document.querySelector("#destinations-container");
const resultsCount = document.querySelector("#results-count");
const searchInput = document.querySelector("#search-input")
const continentFilter = document.querySelector("#continent-filter")
const sortFilter = document.querySelector("#sort-filter")

/* =========================================
   APLICAR FILTROS
========================================= */

function aplicarFiltros() {
    // OBTENER VALORES
    
    // Valor del input
    const texto = searchInput.value;

    // Valor del continente
    const continente = continentFilter.value;

    // Valor del criterio de orden
    const criterioOrden = sortFilter.value;

    // Procesar los datos
    const resultados = procesarPaises(paises, texto, continente, criterioOrden)

    // RENDERIZAR. Mostrar el código con HTML
    renderPaises(resultados, destinationsContainer);

    // ACTUALIZAR CONTADOR
    actualizarContador(resultados.length, resultsCount)
}

/* =========================================
   REGISTRAR EVENTOS
========================================= */

// Función para registra el evento input del buscador
function registrarEventos() {
    searchInput.addEventListener("input", aplicarFiltros)

    // Registrar el evento del continente
    continentFilter.addEventListener("change", aplicarFiltros)

    //Registrar el evento del ordenamiento
    sortFilter.addEventListener("change", aplicarFiltros)
}


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

    /* =====================================
    MOSTRAR RESULTADOS INICIALES
    ===================================== */

    aplicarFiltros();

    /* =====================================
    REGISTRAR EVENTOS
    ===================================== */

    registrarEventos();
}

// INICIAR APLICACIÓN
init();
