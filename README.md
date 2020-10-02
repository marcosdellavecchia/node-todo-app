# node-todo-app

TO-DO App that allows to view, add, toggle and clear tasks through the terminal by manipulating a JSON file. Built using NodeJS.

## How to use

Open a terminal located in the src directory and run `node index.js`. The program will display the help menu containing all the available commands. Type `node index.js [command]` in order to execute the desired task.

## Command list

- ```all```: Display all registered tasks (both pending and done).
- ```pending```: Display pending tasks.
- ```done```: Display completed tasks.
- ```add [task description] [deadline]```: Add a new task.
- ```toggle [task index]```: Switch the current state of a registered task.
- ```clear```: Removes all tasks from the tasks.json file.

##Credits:
This software was created as a Node JS project during the Full Stack Node course at Digital House programming school.
