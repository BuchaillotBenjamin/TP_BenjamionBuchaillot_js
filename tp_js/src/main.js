import './style.css';

const URL_API = 'https://rickandmortyapi.com/api/character/';
let personajes = [];

const $listaPersonajes = document.getElementById('listaPersonajes');
const $campoBusqueda = document.getElementById('campoBusqueda');
const $mensajeError = document.getElementById('mensajeError'); 

async function obtenerPersonajes() {
  try {
    const respuesta = await fetch(URL_API);
    const datos = await respuesta.json();
    personajes = datos.results;
    mostrarPersonajes(personajes);
  } catch (error) {
    $mensajeError.textContent = 'Error al cargar los personajes. Intenta nuevamente.';
    $mensajeError.style.display = 'block';
  }
}

function mostrarPersonajes(personajesMostrar) {
  $listaPersonajes.innerHTML = '';
  $mensajeError.style.display = 'none'; 
  
  if (personajesMostrar.length === 0) {
    $mensajeError.textContent = 'No se encontraron personajes con ese nombre.';
    $mensajeError.style.display = 'block';
    return;
  }
  
  personajesMostrar.forEach(personaje => {
    const tarjetaPersonaje = document.createElement('div');
    tarjetaPersonaje.className = 'tarjeta-personaje';
    
    tarjetaPersonaje.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}">
      <div class="info-personaje">
        <h2>${personaje.name}</h2>
        <p>Especie: ${personaje.species}</p>
      </div>
    `;
    
    $listaPersonajes.appendChild(tarjetaPersonaje);
  });
}

function filtrarPersonajes(terminoBusqueda) {
  const personajesFiltrados = personajes.filter(personaje =>
    personaje.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );
  mostrarPersonajes(personajesFiltrados);
}

$campoBusqueda.addEventListener('input', (e) => {
  filtrarPersonajes(e.target.value);
});

// Iniciar app
document.addEventListener('DOMContentLoaded', () => {
  obtenerPersonajes();
});


