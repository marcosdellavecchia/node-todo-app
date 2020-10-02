// Las tareas por hacer y las tareas ya hechas
// - Un array de las cosas hechas
// - Un array de las cosas por hacer
// Fechas
// [TODO] Poder ingresar las tareas
// Poder consultar las tareas por hacer y las tareas hechas

// La tarea tiene que tener:
// - Nombre
// - Fecha
// - Estado (hecha o no)

const fs = require("fs");
const path = require("path");

// Parametros ingresados por consola
const thirdParameter = process.argv[2];
const fourthParameter = process.argv[3];
const fifthParameter = process.argv[4];

// Setea el path absoluto para que sea correcto independientemente de donde se ejecute
const absolutePath = path.join(__dirname, "../db/tasks.json");

// Lee el json utilizando el modulo FS
const tasksJSON = fs.readFileSync(absolutePath, { encoding: "utf-8" });

// Convierte el string en formato de objeto JavaScript
const tasks = JSON.parse(tasksJSON);

// Funcion que permite ver todas las tareas
function showAll() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(
      ` - ${task.done ? "✅" : "⛔"} ${task.name} (${task.deadline})  ${i}`
    );
  }
}

function showDone() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.done) {
      console.log(`✅ ${task.name} (${task.deadline})`);
    }
  }
}

function showPending() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.done) {
      console.log(`⛔ ${task.name} (${task.deadline})`);
    }
  }
}

function toggle(taskIndex) {
  tasks[taskIndex].done = !tasks[taskIndex].done;
  showAll();
  const tasksJSON = JSON.stringify(tasks, null, 2); //Pretty print
  fs.writeFileSync(absolutePath, tasksJSON);
}

function add(name, deadline) {
  const newTask = {
    name: name,
    deadline: deadline,
    done: false,
  };
  tasks.push(newTask);
  const tasksJSON = JSON.stringify(tasks, null, 2); //Pretty print
  fs.writeFileSync(absolutePath, tasksJSON);
}

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
  default:
    console.log(
      "Ingresa algunos de los siguientes comandos:\n- all: Ver TODAS las tareas.\n- pending: Ver tareas PENDIENTES.\n- done: Ver tareas REALIZADAS."
    );
}
