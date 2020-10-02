# node-todo-app

TO-DO App built using NodeJS that allows to add, view, toggle and clear tasks by manipulating a JSON file.

## How to use

Open a terminal in the src directory and execute `node index.js`. This will show the help menu with all the available commands. Type `node index.js [command]` in order to execute the desired task.

## Command list

- ```all```: Display all registered tasks (both pending and done).
- pending: Display pending tasks.
- done: Display completed tasks.
- add [task description] [deadline]: Add a new task.
- toggle [task index]: Switch the current state of a registered task.
- clear: Removes all tasks from the tasks.json file.
