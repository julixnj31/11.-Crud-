
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
