let animationId = null;
let desplazamiento = 0;

function calcular() {
  const f = parseFloat(document.getElementById("frecuencia").value);
  const l = parseFloat(document.getElementById("longitud").value);
  const resultado = document.getElementById("resultadoVelocidad");
  const tipo = document.getElementById("tipoOnda");

  if (isNaN(f) || isNaN(l)) {
    resultado.textContent = "Por favor ingresa valores válidos.";
    tipo.textContent = "";
    return;
  }

  const v = f * l;
  resultado.textContent = `Velocidad: ${v.toExponential(2)} m/s`;

  let tipoTexto = "";
  let color = "#ffffff";

  if (f < 1e9) {
    tipoTexto = "Ondas de Radio (No Ionizante)";
    color = "#aaffaa";
  } else if (f < 1e12) {
    tipoTexto = "Microondas (No Ionizante)";
    color = "#33ffaa";
  } else if (f < 4e14) {
    tipoTexto = "Infrarrojo (No Ionizante)";
    color = "#ffcc99";
  } else if (f < 7.5e14) {
    tipoTexto = "Luz Visible (No Ionizante)";
    color = "#ffff66";
  } else {
    tipoTexto = "Posiblemente ionizante";
    color = "#dddddd";
  }

  tipo.textContent = `Tipo de onda: ${tipoTexto}`;
  tipo.style.color = color;

  // Iniciar animación
  const canvas = document.getElementById("ondaCanvas");
  const ctx = canvas.getContext("2d");
  const altura = canvas.height / 2;
  const amplitud = 30;
  const frecuenciaAngular = f / 1e9;

  cancelAnimationFrame(animationId); // Detener animaciones previas

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {
      const y = altura + amplitud * Math.sin((x + desplazamiento) * frecuenciaAngular * 0.1);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    desplazamiento += 2;
    animationId = requestAnimationFrame(animar);
  }

  animar(); // Iniciar el bucle
}
