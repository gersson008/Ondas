document.addEventListener("DOMContentLoaded", () => {
  const modoToggle = document.getElementById("modoToggle");
  const ayudaBtn = document.getElementById("ayudaBtn");

  // Restaurar modo anterior (si está en localStorage)
  if (localStorage.getItem("modo") === "oscuro") {
    document.body.classList.add("oscuro");
    modoToggle.checked = true;
  }

  // Cambiar modo oscuro/claro
  modoToggle.addEventListener("change", () => {
    const esOscuro = modoToggle.checked;
    document.body.classList.toggle("oscuro", esOscuro);
    document.body.classList.toggle("claro", !esOscuro);
    localStorage.setItem("modo", esOscuro ? "oscuro" : "claro");
  });

  // Mostrar ayuda
  ayudaBtn.addEventListener("click", () => {
    document.getElementById("modalAyuda").classList.remove("oculto");
  });

  // Cerrar modal
  window.cerrarModal = () => {
    document.getElementById("modalAyuda").classList.add("oculto");
  };
});
