const contenedores = document.querySelectorAll(".contenedor");

function cambiarColor(event) {
  const elemento = event.target;

  if (elemento.className === "contenedorVioleta") {
    elemento.className = "contenedorRojo";
  } else {
    elemento.className = "contenedorVioleta";
  }
}

for (const element of contenedores) {
  element.addEventListener("click", cambiarColor);
}
/// agregar un nuevo div

function agregarDiv() {
  const nuevoDiv = document.createElement("div");
  nuevoDiv.innerText = "Este es un nuevo DIV";
  nuevoDiv.className = "contenedorVioleta";
  nuevoDiv.addEventListener("click", cambiarColor);
  const body = document.querySelector("body");
  body.appendChild(nuevoDiv);
}

const boton = document.querySelector("#botonAgregar");
boton.addEventListener("click", agregarDiv);
