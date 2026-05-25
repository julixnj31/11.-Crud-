
const URL =
  "http://localhost:3000/tasks";

const taskForm =
  document.getElementById("task-form");

const taskInput =
  document.getElementById("task-input");

const taskList =
  document.getElementById("task-list");

const message =
  document.getElementById("message");

// =====================================================
// LISTAR TAREAS (READ)
// =====================================================
//
// GET
//
// Esta función consulta
// las tareas del servidor
// y las muestra en pantalla.
//
// =====================================================

async function getTasks() {

  const response =
    await fetch(URL);

  const tasks =
    await response.json();

  // Limpiar lista
  taskList.innerHTML = "";

  // Recorrer tareas
  tasks.forEach(task => {

    // Crear elemento
    const li =
      document.createElement("li");

    // Insertar contenido
    li.innerHTML = `
    
      ${task.title}

      <button onclick="deleteTask(${task.id})">
        Eliminar
      </button>

      <button onclick="editTask(${task.id}, '${task.title}')">
        Editar
      </button>

    `;

    // Agregar lista
    taskList.appendChild(li);

  });

}

// =====================================================
// ELIMINAR TAREA (DELETE)
// =====================================================
//
// DELETE
//
// Esta función elimina
// una tarea usando el id.
//
// =====================================================

async function deleteTask(id) {

  await fetch(`${URL}/${id}`, {

    method: "DELETE"

  });

  // Actualizar lista
  getTasks();

}

// =====================================================
// EDITAR TAREA (UPDATE)
// =====================================================
//
// PATCH
//
// Esta función modifica
// el nombre de la tarea.
//
// =====================================================

async function editTask(id, oldTitle) {

  // Nuevo nombre
  const newTitle =
    prompt(
      "Editar tarea",
      oldTitle
    );

  // Validar vacío
  if (!newTitle) return;

  // Actualizar
  await fetch(`${URL}/${id}`, {

    method: "PATCH",

    headers: {

      "Content-Type":
        "application/json"

    },

    body:
      JSON.stringify({

        title: newTitle

      })

  });

  // Actualizar lista
  getTasks();

}
// =====================================================
// EVENTO FORMULARIO
// =====================================================

taskForm.addEventListener(
  "submit",
  createTask
);



// =====================================================
// CARGAR TAREAS
// =====================================================

getTasks();