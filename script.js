/* =========================================
   NAVEGACIÓN Y ACCIONES
   ========================================= */
function comenzar() {
    const galeria = document.getElementById("galeria");
    if (galeria) {
        galeria.scrollIntoView({ behavior: "smooth" });
    }
    lanzarConfeti();
}

/* =========================================
   CARTA INTERACTIVA MEJORADA
   ========================================= */
function abrirCarta() {
    const sobreContenedor = document.querySelector(".sobre-contenedor");
    const cartaModal = document.getElementById("cartaCompleta");
    
    if (!sobreContenedor || !cartaModal) return;
    
    // Iniciar secuencia de apertura del sobre
    sobreContenedor.classList.add("abierto");
    
    // Retrasar la apertura del modal para sincronizarlo con la animación de extracción
    setTimeout(() => {
        cartaModal.classList.add("visible");
        document.body.style.overflow = "hidden";
    }, 850);
}

function cerrarCarta() {
    const sobreContenedor = document.querySelector(".sobre-contenedor");
    const cartaModal = document.getElementById("cartaCompleta");
    
    if (!cartaModal) return;
    
    cartaModal.classList.remove("visible");
    document.body.style.overflow = "";
    
    // Regresar el sobre a su posición original gradualmente
    setTimeout(() => {
        if (sobreContenedor) sobreContenedor.classList.remove("abierto");
    }, 400);
}

function cerrarCartaExterna(event) {
    if (event.target.id === "cartaCompleta") {
        cerrarCarta();
    }
}

/* =========================================
   VISOR DE FOTOS
   ========================================= */
function abrirFoto(imagen) {
    const visor = document.getElementById("visor");
    const fotoGrande = document.getElementById("fotoGrande");
    const caption = document.getElementById("captionFoto");
    
    if (!visor || !fotoGrande || !imagen) return;
    
    fotoGrande.src = imagen.src;
    fotoGrande.alt = imagen.alt;
    caption.textContent = imagen.alt || "Recuerdo especial";
    
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

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cerrarFoto();
        cerrarCarta();
    }
});

/* =========================================
   CORAZONES Y PARTICULAS FLOTANTES
   ========================================= */
function crearCorazon() {
    const contenedor = document.getElementById("corazones");
    if (!contenedor) return;

    const corazon = document.createElement("div");
    corazon.classList.add("corazon-flotante");
    
    const simbolos = ["♥", "💖", "🌸", "✨"];
    corazon.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

    const tamano = Math.random() * 15 + 12;
    const duracion = Math.random() * 3 + 6;
    const posicionLeft = Math.random() * 100;

    corazon.style.left = `${posicionLeft}%`;
    corazon.style.fontSize = `${tamano}px`;
    corazon.style.animationDuration = `${duracion}s`;

    contenedor.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, duracion * 1000);
}

setInterval(crearCorazon, 600);

document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.85) {
        const particula = document.createElement("div");
        particula.classList.add("particula-cursor");
        particula.style.left = `${e.clientX}px`;
        particula.style.top = `${e.clientY}px`;
        document.body.appendChild(particula);

        setTimeout(() => particula.remove(), 800);
    }
});

/* =========================================
   EFECTO CONFETI
   ========================================= */
function lanzarConfeti() {
    const simbolos = ["♥", "✦", "🌸", "✨", "🎉"];
    const colores = ["#e85d75", "#f7cad0", "#f4acb7", "#d4af37"];

    for (let i = 0; i < 50; i++) {
        const confeti = document.createElement("span");
        confeti.style.position = "fixed";
        confeti.style.zIndex = "4000";
        confeti.style.pointerEvents = "none";
        confeti.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
        confeti.style.color = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.left = `${Math.random() * 100}vw`;
        confeti.style.top = "-20px";
        confeti.style.fontSize = `${Math.random() * 14 + 16}px`;

        const duracion = Math.random() * 2.5 + 2;
        confeti.style.transition = `transform ${duracion}s linear, opacity ${duracion}s linear`;

        document.body.appendChild(confeti);

        setTimeout(() => {
            confeti.style.transform = `translateY(105vh) rotate(${Math.random() * 720}deg)`;
            confeti.style.opacity = "0";
        }, 50);

        setTimeout(() => confeti.remove(), duracion * 1000);
    }
}

/* =========================================
   REPRODUCTOR DE MÚSICA AMBIENTAL
   ========================================= */
function controlarMusica() {
    const musica = document.getElementById("musica");
    const boton = document.getElementById("botonMusica");

    if (!musica) return;

    if (musica.paused) {
        musica.play().then(() => {
            boton.classList.add("reproduciendo");
            boton.querySelector(".icono-nota").textContent = "❙❙";
        }).catch(() => {
            console.log("El navegador bloqueó la reproducción automática.");
        });
    } else {
        musica.pause();
        boton.classList.remove("reproduciendo");
        boton.querySelector(".icono-nota").textContent = "♫";
    }
}

/* =========================================
   OBSERVADOR DE ANIMACIONES
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const elementosRevelables = document.querySelectorAll(".revelable");

    const observador = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("activo");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementosRevelables.forEach(el => observador.observe(el));
});
