const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
console.log(botonLargo);

//Traer todos los botones
let boton = document.querySelectorAll('button');

//Evento para cada botón
botonCorto.addEventListener('click', () => {
    cambiarContexto('descanso-corto');
});

botonEnfoque.addEventListener('click', () => {
    cambiarContexto('enfoque');
})

botonLargo.addEventListener('click', () => {
    cambiarContexto('descanso-largo');
})

//Ciclo para quitar la clase active de los botones
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
    }
}