const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
console.log(botonLargo);

let boton = document.querySelectorAll('button');

botonCorto.addEventListener('click', () => {
  html.setAttribute('data-contexto', 'descanso-corto');
  banner.setAttribute('src', 'imagenes/descanso-corto.png');
});

botonEnfoque.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'enfoque');
    banner.setAttribute('src', 'imagenes/enfoque.png');
})

botonLargo.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-largo');
    banner.setAttribute('src', 'imagenes/descanso-largo.png');
})

for (let i = 0; i < boton.length; i++) {
    boton[i].addEventListener('click', () => {
        for (let j = 0; j < boton.length; j++) {
            boton[j].classList.remove('active');
        }
        boton[i].classList.add('active');
    });
}

