// Requiere los modulos FileSystem, Path y Chalk (para console styling)
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Reconoce los parametros ingresados por consola que se van a utilizar para los comandos
const thirdParameter = process.argv[2];
const fourthParameter = process.argv[3];
const fifthParameter = process.argv[4];
const sixthParameter = process.argv[5];
const [, , , ...spreadParameter] = process.argv; // Junta en un solo array todos los elementos posteriores al "node - index.ja -  toggle"

// Setea el path absoluto para que sea correcto independientemente de donde se ejecute
const taskAbsolutePath = path.join(__dirname, "../db/tasks.json");
const helpAbsolutePath = path.join(__dirname, "./help.json");

// Lee el json utilizando el modulo FS
const tasksJSON = fs.readFileSync(taskAbsolutePath, { encoding: "utf-8" });
const helpJSON = fs.readFileSync(helpAbsolutePath, { encoding: "utf-8" });

// Convierte el string en formato de objeto JavaScript
const tasks = JSON.parse(tasksJSON);
const help = JSON.parse(helpJSON);

// Colores de Chalk para styling de consola
const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;

// Mostrar menú de ayuda
helpMenu = () => {
  const helpMenu = help.join("\n");
  console.log(helpMenu);
};

// Guardar datos en el archivo tasks.json
save = () => {
  const tasksJSON = JSON.stringify(tasks, null, 2); //Pretty print
  fs.writeFileSync(taskAbsolutePath, tasksJSON);
};

// Requiero moment luego de instalarlo
let moment = require("moment");

// Le creo dos variables con la fecha y la hora
let fechaHora = `${moment().format("HH:mm")} hs`;
let fechaDia = moment().format("DD/MM/YY");

// Ver todas las tareas guardadas
showAll = () => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.done) {
      console.log(green(`[${i}] ☑  ${task.name} (${task.deadline})`));
    } else {
      console.log(red(`[${i}] ☐  ${task.name} (${task.deadline})`));
    }
  }
  if (tasks.length === 0) {
    console.log("No existen tareas registradas.");
  }
};

// Se le suman las tareas realizadas cuando se ejecúta showDone()
let doneTasks = 0;

// Si las tareas realizadas son 0, muestra que no hay realizadas. Se ejecuta en showDone()
noDoneTasks = () => {
  if (doneTasks == 0) {
    console.log("No hay tareas realizadas");
  }
};

// Ver solo tareas realizadas
showDone = () => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.done) {
      doneTasks++;
      console.log(green`☑  ${task.name} (${task.deadline})`);
    }
  }
  noDoneTasks();
};

// Se le suman las tareas pendientes cuando se ejecúta showPending()
let pendingTasks = 0;

// Si las tareas pendientes son 0, muestra que no hay pendientes. Se ejecuta en showPending()
noPendingTasks = () => {
  if (pendingTasks == 0) {
    console.log("No hay tareas pendientes");
  }
};

// Ver solo tareas pendientes
showPending = () => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.done) {
      pendingTasks++;
      console.log(red`☐  ${task.name} (${task.deadline})`);
    }
  }
  noPendingTasks();
};

// Toggle del estado de tareas (cambiar de hecho a pendiente y viceversa) + Al modificarlas se le agrega la fecha y la hora de modificación

toggle = (...tasksIndex) => {
  tasksIndex.forEach(function (indexValue, indexNumber) {
    tasks[indexValue].done = !tasks[indexValue].done;
    tasks[indexValue]["modificationTime"] = fechaHora;
    tasks[indexValue]["modificationDay"] = fechaDia;
  });
  showAll();
  save();
};

// Funcion constructora para agregar tareas
function Tasks(name, deadline, done) {
  (this.name = name), (this.deadline = deadline), (this.done = false);
}

// Funcion add para agregar tareas
const add = (name, deadline) => {
  const newTask = new Tasks(name, deadline, false);
  tasks.push(newTask);

  showAll();
  save();
};

// Limpiar lista (elimina todas las tareas guardadas)
clear = () => {
  pressKey();
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

// Requiere que se presione una tecla para confirmar la acción
pressKey = () => {
  console.log(
    yellow(
      "ADVERTENCIA: Esta acción eliminará todas las tareas guardadas. Presione cualquier tecla para continuar:"
    )
  );
  process.stdin.setRawMode(true);
  fs.readSync(0, Buffer.alloc(1), 0, 1);
};

// Muestra las tareas que recibieron TOGGLE, en que día y en que horario
modification = () => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].modificationTime && tasks[i].modificationDay) {
      console.log(
        `- ${tasks[i].name} - Se modificó el día: ${yellow(
          tasks[i].modificationDay
        )} a la hora ${yellow(tasks[i].modificationTime)}.`
      );
    }
  }
};

// Créditos (si contribuiste al desarrollo, por favor incluí tu nombre en el console log)

credits = () => {
  console.log(
    "Este programa fue desarrollado como un proyecto introductorio a Node en Digital House\nContribuyeron al código:\n- Marcos Della Vecchia\n- Federico Silva\n- Gabriel Rubin\n- Damián Monti\n- Diego Valdés"
  );
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
    toggle(...spreadParameter);
    break;
  case "add":
    add(fourthParameter, fifthParameter);
    break;
  case "clear":
    clear();
    break;
  case "remove":
    remove(fourthParameter);
    break;
  case "edit":
    edit(fourthParameter, fifthParameter, sixthParameter);
    break;
  case "modification":
    modification();
    break;
  case "credits":
    credits();
    break;
  default:
    helpMenu();
}
