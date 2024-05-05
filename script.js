const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')
musica.loop = true; //Reproducir en bucle

const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoDelBotonIniciar = document.querySelector('#start-pause img');
let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

const tiempoEnPantalla = document.querySelector('#timer');

//Evento para el input de música
inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

//Traer todos los botones
let boton = document.querySelectorAll('.app__card-button');

//Evento para cada botón
botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})

for (let i = 0; i < boton.length; i++) {
    boton[i].addEventListener('click', () => {
        for (let j = 0; j < boton.length; j++) {
            boton[j].classList.remove('active');
        }
        boton[i].classList.add('active');
    });
}

//Función para cambiar el contexto
function cambiarContexto(contexto) {
    mostrarTiempo();

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagenes/${contexto}.png`);

    //Cambiar el texto del título
    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
        <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case 'descanso-corto':
            titulo.innerHTML = `Recarga energías,<br>
            <strong class="app__title-strong">pequeños descansos, grandes resultados.</strong>`;
            break;
        case 'descanso-largo':
            titulo.innerHTML = `Desconéctate,<br>
            <strong class="app__title-strong">tu bienestar es lo más importante.</strong>`;
            break;
        default:
            break;
    }
}

// Funcion para el temporizador
const cuentaRegresiva = () => {
    if (tiempoTranscurridoEnSegundos <= 0) {
        audioTiempoFinalizado.play();
        alert('Tiempo finalizado');
        reiniciar();
        return;
    }
    iconoDelBotonIniciar.setAttribute('src', './imagenes/pause.png');
    textoIniciarPausar.textContent = 'Pausar';
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo(); // Actualiza el tiempo mostrado en la pantalla
}

//Evento para el botón de iniciar/pausar
botonIniciarPausar.addEventListener('click', iniciarPausar);

//Función para iniciar o pausar el temporizador
function iniciarPausar() {
    if (idIntervalo) {
        audioPausa.play();
        reiniciar();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

//Función para reiniciar el temporizador
function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    mostrarTiempo(); // Mostrar el tiempo restante
    textoIniciarPausar.textContent = 'Comenzar';
    iconoDelBotonIniciar.setAttribute('src', './imagenes/play_arrow.png');
}

//Función para mostrar el tiempo restante
function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {
        minute: '2-digit',
        second: '2-digit'
    });
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo(); // Mostrar el tiempo restante al cargar la página