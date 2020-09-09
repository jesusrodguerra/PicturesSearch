import { inputSearch } from './app.js';
import { resultado } from './app.js';
import { mostrarPagina } from './app.js';
import { generarPaginador } from './app.js';
import { divPaginacion } from './app.js';

let totalPaginas;
let iterador;
let paginaActual = 1;

class API {
    constructor (registro ) {
        this.registro = registro
    }

    async obtenerImagenes() {

        const inputValor = inputSearch.value;
        console.log(paginaActual)
        const key = '18226425-927adfe820dcb99fbc33ffe4f';
        const url = `https://pixabay.com/api/?key=${key}&q=${inputValor}&per_page=${this.registro}&page=${this.paginaActual}`;
        const res = await fetch(url);
        const data = await res.json()
        const imagenes = data.hits;
        totalPaginas = mostrarPagina(data.totalHits)
        console.log(imagenes)
        console.log(totalPaginas)
        
        while( resultado.firstChild ) {
            resultado.removeChild(resultado.firstChild);
        }


        // iteramos sobre el arreglo de la api de las imagenes
        imagenes.forEach(imagen => {
            const { previewURL, likes, views, largeImageURL } = imagen

            resultado.innerHTML += `
                <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                    <div class="bg-white tarjeta">
                        <img class="w-full imagen" src="${previewURL}" alt="imagen">

                        <div class="p-4">
                            <p class="font-bold"> ${likes} <span class="font-light"> Likes </span> </p>
                            <p class="font-bold"> ${views} <span class="font-light"> Views </span> </p>
                            <a class=" block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                               href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                               View Image
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        // Limpiamos la paginacion de la busqueda previa para que no aparezcan las paginaciones repetidas y solo las de la busqueda actual
        while(divPaginacion.firstChild) {
            divPaginacion.removeChild(divPaginacion.firstChild)
        }

        // imprimimos la paginacion
        this.imprimirPaginador();

    }

    imprimirPaginador() {
        iterador = generarPaginador(totalPaginas)

        while(true) {
            const { done, value } = iterador.next();
            // Si llegamos al final de las paginas, no hara nada
            if(done) return;

            // sino hemos llegado al final de las paginas, genera un boton por cada pagina 
            const boton = document.createElement('a');
            boton.href = '#';
            boton.dataset.pagina = value;
            boton.textContent = value;
            boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-4', 'mr-2', 'font-bold', 'mb-4', 'rounded', 'hover:bg-yellow-500');
            
            boton.onclick = () => {
                this.paginaActual = value;
                console.log(this.paginaActual)
                
                this.obtenerImagenes();
            }
            
            divPaginacion.appendChild(boton)
        }
    }

}

export default API;