function mostrarEnPantalla(texto) {
  const salida = document.getElementById("salida");
  salida.textContent += texto + "\n";
  salida.scrollTop = salida.scrollHeight;
  console.log(texto);
}

function operacionesBasicas(a, b) {
  mostrarEnPantalla(`Suma: ${a} + ${b} = ${a + b}`);
  mostrarEnPantalla(`Resta: ${a} - ${b} = ${a - b}`);
  mostrarEnPantalla(`Multiplicación: ${a} * ${b} = ${a * b}`);
  mostrarEnPantalla(`División: ${a} / ${b} = ${(a / b).toFixed(2)}`);
}

function crearGasto(descripcion, monto, categoria) {
  return {
    descripcion: descripcion,
    monto: monto,
    categoria: categoria,
    resumen: function () {
      return `${this.descripcion}: $${this.monto} (${this.categoria})`;
    },
  };
}

let gastos = [
  crearGasto("Supermercado", 25000, "Comida"),
  crearGasto("Netflix", 6000, "Entretenimiento"),
  crearGasto("Bencina", 15000, "Transporte"),
  crearGasto("Curso online", 30000, "Educación"),
];

function calcularTotal(listaGastos) {
  let total = 0;
  for (let i = 0; i < listaGastos.length; i++) {
    total += listaGastos[i].monto;
  }
  return total;
}

function mostrarGastos(listaGastos) {
  mostrarEnPantalla("--- Lista de gastos ---");
  listaGastos.forEach((gasto, index) => {
    mostrarEnPantalla(`${index + 1}. ${gasto.resumen()}`);
  });
}

function filtrarPorCategoria(listaGastos, categoria) {
  return listaGastos.filter((gasto) => gasto.categoria === categoria);
}

function agregarGasto(listaGastos, descripcion, monto, categoria) {
  if (monto <= 0 || isNaN(monto)) {
    mostrarEnPantalla("Monto inválido. No se agregó el gasto.");
    return;
  }
  listaGastos.push(crearGasto(descripcion, monto, categoria));
  mostrarEnPantalla(`Gasto "${descripcion}" agregado correctamente.`);
}

function clasificarGasto(monto) {
  if (monto < 10000) {
    return "Gasto bajo";
  } else if (monto >= 10000 && monto < 25000) {
    return "Gasto medio";
  } else {
    return "Gasto alto";
  }
}

function iniciarMenu() {
  const nombreUsuario = prompt("¡Hola! ¿Cuál es tu nombre?");

  if (nombreUsuario === null || nombreUsuario.trim() === "") {
    mostrarEnPantalla("Programa cancelado: no se ingresó un nombre.");
    return;
  }

  alert(`Bienvenido/a ${nombreUsuario} a tu gestor de gastos personales`);
  mostrarEnPantalla(`=== Gestor de gastos de ${nombreUsuario} ===`);

  let continuar = true;
  let intentosInvalidos = 0;

  while (continuar) {
    let opcion = prompt(
      "Elige una opción:\n" +
        "1. Ver todos los gastos\n" +
        "2. Ver total de gastos\n" +
        "3. Agregar un nuevo gasto\n" +
        "4. Filtrar gastos por categoría\n" +
        "5. Clasificar gastos por nivel\n" +
        "6. Ver operaciones matemáticas básicas\n" +
        "7. Salir",
    );

    if (opcion === null) {
      mostrarEnPantalla("Programa cerrado por el usuario.");
      break;
    }

    opcion = opcion.trim();

    switch (opcion) {
      case "1":
        mostrarGastos(gastos);
        intentosInvalidos = 0;
        break;

      case "2":
        mostrarEnPantalla(`Total de gastos: $${calcularTotal(gastos)}`);
        intentosInvalidos = 0;
        break;

      case "3": {
        let desc = prompt("Descripción del gasto:");
        let monto = parseFloat(prompt("Monto del gasto:"));
        let categoria = prompt("Categoría del gasto:");

        if (
          !desc ||
          !categoria ||
          desc.trim() === "" ||
          categoria.trim() === ""
        ) {
          mostrarEnPantalla("Registro cancelado: faltan datos.");
        } else {
          agregarGasto(gastos, desc.trim(), monto, categoria.trim());
        }
        intentosInvalidos = 0;
        break;
      }

      case "4": {
        let categoriaBuscar = prompt("¿Qué categoría deseas filtrar?");

        if (!categoriaBuscar || categoriaBuscar.trim() === "") {
          mostrarEnPantalla("Búsqueda cancelada.");
        } else {
          let resultado = filtrarPorCategoria(gastos, categoriaBuscar.trim());
          if (resultado.length === 0) {
            mostrarEnPantalla("No se encontraron gastos en esa categoría.");
          } else {
            mostrarGastos(resultado);
          }
        }
        intentosInvalidos = 0;
        break;
      }

      case "5":
        mostrarEnPantalla("--- Clasificación de gastos ---");
        gastos.forEach((gasto) => {
          mostrarEnPantalla(
            `${gasto.descripcion}: ${clasificarGasto(gasto.monto)}`,
          );
        });
        intentosInvalidos = 0;
        break;

      case "6": {
        let num1 = parseFloat(prompt("Ingresa el primer número:"));
        let num2 = parseFloat(prompt("Ingresa el segundo número:"));

        if (isNaN(num1) || isNaN(num2)) {
          mostrarEnPantalla("Debes ingresar dos números válidos.");
        } else {
          operacionesBasicas(num1, num2);
        }
        intentosInvalidos = 0;
        break;
      }

      case "7":
        continuar = false;
        alert(`¡Gracias por usar el gestor, ${nombreUsuario}!`);
        break;

      default:
        intentosInvalidos++;
        mostrarEnPantalla("Opción no válida, intenta nuevamente.");
        if (intentosInvalidos >= 3) {
          mostrarEnPantalla(
            "Demasiados intentos inválidos. Cerrando programa.",
          );
          continuar = false;
        }
    }
  }
}

document.getElementById("btnIniciar").addEventListener("click", iniciarMenu);
