// Requiere los modulos FileSystem y Path
const fs = require("fs");
const path = require("path");

// Reconoce los parametros ingresados por consola que se van a utilizar para los comandos
const thirdParameter = process.argv[2];
const fourthParameter = process.argv[3];
const fifthParameter = process.argv[4];
const sixthParameter = process.argv[5];

// Setea el path absoluto para que sea correcto independientemente de donde se ejecute
const absolutePath = path.join(__dirname, "../db/tasks.json");

// Lee el json utilizando el modulo FS
const tasksJSON = fs.readFileSync(absolutePath, { encoding: "utf-8" });

// Convierte el string en formato de objeto JavaScript
const tasks = JSON.parse(tasksJSON);

// Guardar datos en el archivo tasks.json
save = () => {
  const tasksJSON = JSON.stringify(tasks, null, 2); //Pretty print
  fs.writeFileSync(absolutePath, tasksJSON);
};

// Ver todas las tareas guardadas
showAll = () => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(
      `[${i}] ${task.done ? "☑ " : "☐ "} ${task.name} (${task.deadline})`
    );
  }
  if (tasks.length === 0) {
    console.log("No existen tareas registradas.");
  }
};

// Ver solo tareas realizadas
showDone = () => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.done) {
      console.log(`☑  ${task.name} (${task.deadline})`);
    }
  }
};

// Ver solo tareas pendientes
showPending = () => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.done) {
      console.log(`☐  ${task.name} (${task.deadline})`);
    }
  }
};

// Toggle del estado de tareas (cambiar de hecho a pendiente y viceversa)
toggle = (taskIndex) => {
  tasks[taskIndex].done = !tasks[taskIndex].done;
  showAll();
  save();
};

// Agregar nueva tarea
add = (name, deadline) => {
  const newTask = {
    name: name,
    deadline: deadline,
    done: false,
  };
  tasks.push(newTask);
  showAll();
  save();
};

// Limpiar lista (elimina todas las tareas guardadas)
clear = () => {
  tasks.length = 0;
  save();
};

// Eliminar una tarea especifica
remove = (taskIndex) => {
  tasks.splice(taskIndex, 1);

  showAll();
  save();
};

edit = (taskIndex, name, deadline) => {
  tasks[taskIndex].name = name;
  tasks[taskIndex].deadline = deadline;
  showAll();
  save();
};

// Switch que ejecuta una funcion segun el parametro que recibe por consola (toma la tercera palabra)
switch (thirdParameter) {
  case "all":
    showAll();
    break;
  case "done":
    showDone();
    break;
  case "pending":
    showPending();
    break;
  case "toggle":
    toggle(fourthParameter);
    break;
  case "add":
    add(fourthParameter, fifthParameter);
    break;
  case "clear":
    clear();
    console.log("Lista de tareas eliminada!");
    break;
  case "remove":
    remove(fourthParameter);
    break;
  case "edit":
    edit(fourthParameter, fifthParameter, sixthParameter);
    break;
  default:
    console.log(
      "*** TO-DO APP ***\nIngresa algunos de los siguientes comandos:\n- all: Ver todas las tareas.\n- add [nombre de la tarea] [fecha]: Agregar una nueva tarea.\n- pending: Ver tareas pendientes.\n- done: Ver tareas completadas.\n- toggle [indice de la tarea]: modificar el estado actual de una tarea.\n- remove [indice de la tarea]: eliminar una tarea específica de la lista.\n- clear: Eliminar todas las tareas registradas."
    );
}
