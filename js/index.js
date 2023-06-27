// Array de objetos para almacenar la información de los estudiantes
let estudiantes = [];

// Obtener elementos del DOM
const formulario = document.getElementById("formulario");
const nombreEstudianteInput = document.getElementById("nombreEstudiante");
const notaEstudianteInput = document.getElementById("notaEstudiante");
const agregarEstudianteBtn = document.getElementById("agregarEstudiante");
const limpiarListaBtn = document.getElementById("limpiarLista");
const calcularResultadosBtn = document.getElementById("calcularResultados");
const eliminarUltimoEstudianteBtn = document.getElementById("eliminarUltimoEstudiante");
const resultadosDiv = document.getElementById("resultados");
const estudiantesIngresadosOl = document.getElementById("estudiantesIngresados");

// Evento click del botón "Agregar Estudiante"
agregarEstudianteBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Obtener nombre y nota del estudiante del formulario
  const nombreEstudiante = nombreEstudianteInput.value;
  const notaEstudiante = parseFloat(notaEstudianteInput.value);

  // Validar la nota ingresada
  if (notaEstudiante < 0 || notaEstudiante > 10 || isNaN(notaEstudiante)) {
    alert("Ingrese un número válido entre 0 y 10.");
    return;
  }

  // Crear objeto estudiante y agregarlo al array de estudiantes
  const estudiante = {
    nombre: nombreEstudiante,
    nota: notaEstudiante
  };
  estudiantes.push(estudiante);

  // Mostrar el estudiante ingresado en la lista de estudiantes
  const nuevoEstudianteLi = document.createElement("li");
  nuevoEstudianteLi.textContent = `${nombreEstudiante}: ${notaEstudiante}`;
  estudiantesIngresadosOl.appendChild(nuevoEstudianteLi);

  // Limpiar campos del formulario
  nombreEstudianteInput.value = "";
  notaEstudianteInput.value = "";

  // Mostrar los arrays en la consola
  console.log("Estudiantes:", estudiantes);
});

// Evento click del botón "Limpiar Lista"
limpiarListaBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Reiniciar el array de estudiantes y vaciar la lista de estudiantes ingresados
  estudiantes = [];
  estudiantesIngresadosOl.innerHTML = "";

  // Limpiar campos del formulario
  nombreEstudianteInput.value = "";
  notaEstudianteInput.value = "";

  // Limpiar los resultados
  resultadosDiv.innerHTML = "";

  // Mostrar los arrays en la consola
  console.log("Estudiantes:", estudiantes);
});

// Evento click del botón "Calcular Resultados"
calcularResultadosBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Verificar si se ha ingresado al menos un estudiante
  if (estudiantes.length === 0) {
    alert("No se ha ingresado ningún estudiante.");
    return;
  }

  // Calcular los resultados
  const promedioGeneral = calcularPromedioGeneral();
  const porcentajeDesaprobados = calcularPorcentajeDesaprobados();
  const porcentajeAprobados = calcularPorcentajeAprobados();
  const porcentajePromocionados = calcularPorcentajePromocionados();

  // Mostrar los resultados en el elemento resultadosDiv
  resultadosDiv.innerHTML = `
    <p>Promedio general: ${promedioGeneral.toFixed(2)}</p>
    <p>Porcentaje de desaprobados: ${porcentajeDesaprobados.toFixed(2)}%</p>
    <p>Porcentaje de aprobados: ${porcentajeAprobados.toFixed(2)}%</p>
    <p>Porcentaje de promocionados: ${porcentajePromocionados.toFixed(2)}%</p>
  `;
});

// Evento click del botón "Eliminar Último Estudiante"
eliminarUltimoEstudianteBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Verificar si hay estudiantes para eliminar
  if (estudiantes.length === 0) {
    alert("No hay estudiantes para eliminar.");
    return;
  }

  // Eliminar el último estudiante ingresado
  estudiantes.pop();

  // Eliminar el último <li> de la lista de estudiantes ingresados
  estudiantesIngresadosOl.removeChild(estudiantesIngresadosOl.lastChild);

  // Mostrar los arrays en la consola
  console.log("Estudiantes:", estudiantes);
});

// Función para calcular el promedio general
function calcularPromedioGeneral() {
  let total = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    total += estudiantes[i].nota;
  }
  return total / estudiantes.length;
}

// Función para calcular el porcentaje de desaprobados
function calcularPorcentajeDesaprobados() {
  let contadorDesaprobados = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].nota < 4) {
      contadorDesaprobados++;
    }
  }
  return (contadorDesaprobados / estudiantes.length) * 100;
}

// Función para calcular el porcentaje de aprobados
function calcularPorcentajeAprobados() {
  let contadorAprobados = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].nota >= 4 && estudiantes[i].nota <= 10) {
      contadorAprobados++;
    }
  }
  return (contadorAprobados / estudiantes.length) * 100;
}

// Función para calcular el porcentaje de promocionados
function calcularPorcentajePromocionados() {
  let contadorPromocionados = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].nota >= 7 && estudiantes[i].nota <= 10) {
      contadorPromocionados++;
    }
  }
  return (contadorPromocionados / estudiantes.length) * 100;
}
