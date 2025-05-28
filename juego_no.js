const canvas = document.getElementById("juegoCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let puntaje = 0;
let vidas = 3;
let ondas = [];

const tipos = ["UV", "Rayos Gamma", "Microondas", "Ondas de Radio"];
const noIonizantes = ["Microondas", "Ondas de Radio"];

const canasta = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 40,
  width: 100,
  height: 20,
  color: "#00ff99"
};

document.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  canasta.x = e.clientX - rect.left - canasta.width / 2;
});

function crearOnda() {
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];
  ondas.push({
    x: Math.random() * (canvas.width - 30),
    y: -30,
    r: 20,
    tipo: tipo,
    velocidad: 2 + Math.random() * 2
  });
}

function dibujarOnda(onda) {
  const color = noIonizantes.includes(onda.tipo) ? "#00f" : "#f00";
  const sombra = noIonizantes.includes(onda.tipo) ? "#0ff" : "#f88";

  ctx.beginPath();
  const grad = ctx.createRadialGradient(onda.x, onda.y, 5, onda.x, onda.y, onda.r);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "black");
  ctx.fillStyle = grad;
  ctx.shadowColor = sombra;
  ctx.shadowBlur = 10;
  ctx.arc(onda.x, onda.y, onda.r, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(onda.tipo, onda.x, onda.y + 5);
}

function dibujarCanasta() {
  ctx.fillStyle = canasta.color;
  ctx.shadowColor = "#0f9";
  ctx.shadowBlur = 15;
  ctx.fillRect(canasta.x, canasta.y, canasta.width, canasta.height);
}

function detectarColision(onda) {
  return (
    onda.y + onda.r >= canasta.y &&
    onda.x >= canasta.x &&
    onda.x <= canasta.x + canasta.width
  );
}

function mostrarModal() {
  document.getElementById("modal").style.display = "flex";
}

function actualizar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarCanasta();

  ondas.forEach((onda, index) => {
    onda.y += onda.velocidad;
    dibujarOnda(onda);

    if (detectarColision(onda)) {
      if (noIonizantes.includes(onda.tipo)) {
        puntaje++;
      } else {
        vidas--;
        if (vidas <= 0) {
          mostrarModal();
        }
      }
      ondas.splice(index, 1);
      document.getElementById("puntos").textContent = `Puntaje: ${puntaje} | Vidas: ${vidas}`;
    }

    if (onda.y > canvas.height + 20) {
      ondas.splice(index, 1);
    }
  });

  if (vidas > 0) {
    requestAnimationFrame(actualizar);
  }
}

function iniciarJuego() {
  setInterval(crearOnda, 1200);
  actualizar();
}

window.onload = iniciarJuego;
