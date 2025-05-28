let desplazamiento = 0;
let animacionId = null;

function calcular() {
  const f = parseFloat(document.getElementById("frecuencia").value);
  const l = parseFloat(document.getElementById("longitud").value);
  const resultado = document.getElementById("resultadoVelocidad");
  const tipo = document.getElementById("tipoOnda");

  if (isNaN(f) || isNaN(l)) {
    resultado.textContent = "Por favor ingresa valores válidos.";
    tipo.textContent = "";
    cancelAnimationFrame(animacionId);
    return;
  }

  const v = f * l;
  resultado.textContent = `Velocidad: ${v.toExponential(2)} m/s`;

  // Determinar tipo de onda
  let tipoTexto = "";
  if (f >= 1e19) {
    tipoTexto = "Rayos Gamma (Ionizante)";
    tipo.style.color = "#ffdd00";
  } else if (f >= 1e17) {
    tipoTexto = "Rayos X (Ionizante)";
    tipo.style.color = "#00ccff";
  } else if (f >= 1e15) {
    tipoTexto = "Ultravioleta (Ionizante)";
    tipo.style.color = "#cc00ff";
  } else {
    tipoTexto = "No es una onda ionizante";
    tipo.style.color = "#bbbbbb";
  }

  tipo.textContent = `Tipo de onda: ${tipoTexto}`;

  // Dibujar onda animada en canvas
  const canvas = document.getElementById("ondaCanvas");
  const ctx = canvas.getContext("2d");
  const amp = 40;
  const largo = canvas.width;
  const altura = canvas.height / 2;
  const frecuencia = f / 1e14;

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, altura);

    for (let x = 0; x < largo; x++) {
      const y = altura + amp * Math.sin((x * frecuencia * 0.1) + desplazamiento);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#ff00aa";
    ctx.lineWidth = 2;
    ctx.stroke();

    desplazamiento += 0.1;
    animacionId = requestAnimationFrame(animar);
  }

  // Cancelar animaciones anteriores y comenzar una nueva
  cancelAnimationFrame(animacionId);
  desplazamiento = 0;
  animar();
}

