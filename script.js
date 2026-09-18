/* =========================
   NAVEGACIÓN / ACCIONES
   ========================= */
function comenzar() {
    const galeria = document.getElementById("galeria");
    if (galeria) {
        galeria.scrollIntoView({ behavior: "smooth" });
    }
    lanzarConfeti();
}

/* =========================
   CARTA INTERACTIVA
   ========================= */
function abrirCarta() {
    const sobre = document.querySelector(".sobre-contenedor");
    const carta = document.getElementById("cartaCompleta");
    
    if (!sobre || !carta) return;
    
    sobre.classList.add("abierto");
    
    setTimeout(() => {
        carta.classList.add("visible");
        document.body.style.overflow = "hidden";
    }, 600);
}

function cerrarCarta() {
    const sobre = document.querySelector(".sobre-contenedor");
    const carta = document.getElementById("cartaCompleta");
    
    if (!carta) return;
    
    carta.classList.remove("visible");
    document.body.style.overflow = "";
    
    setTimeout(() => {
        if (sobre) sobre.classList.remove("abierto");
    }, 300);
}

/* =========================
   VISOR DE FOTOS
   ========================= */
function abrirFoto(imagen) {
    const visor = document.getElementById("visor");
    const fotoGrande = document.getElementById("fotoGrande");
    
    if (!visor || !fotoGrande || !imagen) return;
    
    fotoGrande.src = imagen.src;
    fotoGrande.alt = imagen.alt;
    visor.classList.add("visible");
    document.body.style.overflow = "hidden";
}

function cerrarFoto(event) {
    if (event) event.stopPropagation();
    
    const visor = document.getElementById("visor");
    if (!visor) return;
    
    visor.classList.remove("visible");
    document.body.style.overflow = "";
}

/* Cierre mediante tecla ESC */
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const visor = document.getElementById("visor");
        const carta = document.getElementById("cartaCompleta");
        
        if (visor && visor.classList.contains("visible")) cerrarFoto();
        if (carta && carta.classList.contains("visible")) cerrarCarta();
    }
});

/* =========================
   CORAZONES FLOTANTES
   ========================= */
function crearCorazon() {
    const contenedor = document.getElementById("corazones");
    if (!contenedor) return;

    const corazon = document.createElement("div");
    corazon.classList.add("corazon-flotante");

    const tamano = Math.random() * 20 + 12;
    const duracion = Math.random() * 4 + 5;
    const posicion = Math.random() * 100;

    corazon.style.left = `${posicion}%`;
    corazon.style.width = `${tamano}px`;
    corazon.style.height = `${tamano}px`;
    corazon.style.animationDuration = `${duracion}s`;

    contenedor.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, duracion * 1000);
}

setInterval(crearCorazon, 800);

/* =========================
   EFECTO CONFETI
   ========================= */
function lanzarConfeti() {
    const simbolos = ["♥", "✦", "🌸", "✨"];
    const colores = ["#e63946", "#d45a78", "#ffb3c1", "#ff4d6d"];

    for (let i = 0; i < 40; i++) {
        const confeti = document.createElement("span");
        confeti.classList.add("confeti");

        confeti.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
        confeti.style.color = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.left = `${Math.random() * 100}vw`;
        confeti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        confeti.style.animationDelay = `${Math.random() * 0.5}s`;
        confeti.style.fontSize = `${Math.random() * 12 + 16}px`;

        document.body.appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, 4000);
    }
}

/* =========================
   CONTROL DE MÚSICA
   ========================= */
function controlarMusica() {
    const musica = document.getElementById("musica");
    const boton = document.getElementById("botonMusica");

    if (!musica) {
        alert("Si deseas reproducir música de fondo, añade tu archivo con el nombre 'musica.mp3' en la carpeta de tu proyecto y habilita la etiqueta de audio en tu archivo HTML.");
        return;
    }

    if (musica.paused) {
        musica.play();
        boton.textContent = "❙❙";
    } else {
        musica.pause();
        boton.textContent = "♫";
    }
}

/* =========================
   ANIMACIONES AL SCROLL
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(".introduccion, .galeria, .foto, .frase, .seccion-carta, .final");

    const observador = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aparecer");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementos.forEach(elemento => observador.observe(elemento));
});

window.addEventListener("load", () => {
    setTimeout(lanzarConfeti, 800);
});