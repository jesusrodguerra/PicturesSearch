import API from './API.js';

export const inputSearch = document.getElementById('termino');
const formulario = document.getElementById('formulario');
export const resultado = document.getElementById('resultado');
export const divPaginacion = document.getElementById('paginacion');

//Variables para la paginacion
export const registrosPorPagina = 50;

// EventListener
formulario.addEventListener('submit', buscar)

// funciones
function buscar(e) {
    e.preventDefault();
    // const inputValor = inputSearch.value;
    const api = new API(registrosPorPagina);
    api.obtenerImagenes();
}

export function mostrarPagina(total) {
    return parseInt(Math.ceil(total / registrosPorPagina))
}

    //generador que registra la cantidad de elementos de acuerdo a las paginas, el * indica que es un generador
export function *generarPaginador(total) {
    for(let i = 1; i <= total ; i++) {
        // con yield en el generador registramos el valor de i para poder imprimirlo
        yield i;
    }
}
