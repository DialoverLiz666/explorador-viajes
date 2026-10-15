/* =========================================
   FILTROS Y ORDENAMIENTO
   Funciones para procesar destinos
========================================= */

/* =========================================
   BUSCAR PAÍSES POR NOMBRE
========================================= */

export function buscarPaises(paises, texto) {
    //Normalizar el texto
    const textoNormalizado = texto.trim().toLowerCase();

    // Retornar todos los países si no hay paises que coincidan
    // con el texto ingresado
    if (!textoNormalizado) {
        return paises;
    }
    // Si el texto está vacío de igual manera devolverá todos los
    // países

    //Filtrar países con filter()
    return paises.filter(pais => {
        // Normalización del nombre de mi país
        // .common representa común
        // En este caso busca el nombre común
        const nombre = pais.names?.common.toLowerCase() ?? ""
        return nombre.includes(textoNormalizado)
    })
}

/* =========================================
   FILTRAR POR CONTINENTE
========================================= */

export function filtrarPorContinente(paises, continente) {
    // Validación si el filtro es all
    if (continente === "all") {
        return paises
    }
    // Filtrado por region
    return paises.filter(pais => pais.region === continente)
}

/* =========================================
   ORDENAR PAÍSES
========================================= */

export function ordenarPaises(paises, criterio) {
    // Se utiliza el spread operator para conservar el arreglo
    // original
    const paisesOrdenados = [...paises]
    // Ordenar A-Z con localeCompare()
    if (criterio === "az") {
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? "";
            const nombreB = b.names?.common ?? "";
            return nombreA.localeCompare(nombreB)
        })
    }
    // Ordenar Z-A con localeCompare()
    if (criterio === "za") {
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? "";
            const nombreB = b.names?.common ?? "";
            return nombreB.localeCompare(nombreA)
        })
    }
}

/* =========================================
   PROCESAR PAÍSES
========================================= */

// Función para combinar filtrado de países

export function procesarPaises(paises, texto, continente, criterioOrden) {
    // Se llama a la función para hacer la búsqueda de países
    let resultado = buscarPaises(paises, texto)
    resultado = filtrarPorContinente(resultado, continente)
    resultado = ordenarPaises(resultado, criterioOrden)
    return resultado;
}