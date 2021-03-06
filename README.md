# node-todo-app

![Node Tasks App Logo](https://i.imgur.com/vDqH6qr.png)

TO-DO application that allows to view, add, toggle and delete tasks through the terminal by manipulating a JSON file. Built using NodeJS.

## How to use

Open a terminal located at the src directory and run `node index.js`. The program will display the help menu containing all the available commands. Type `node index.js [command]` in order to execute the desired task.

## Command list

- `all`: Display all registered tasks (both pending and done).
- `pending`: Display pending tasks.
- `done`: Display completed tasks.
- `add [task description] [deadline]`: Add a new task.
- `remove [task index]`: Removes a specific task of the list.
- `toggle [...task index]`: Switch the current state of the selected tasks (pending/done). Each task is selected by introducing in the command line its specific number as a separate parameter.
- `modification`: Display the specific day and time when tasks were modified using toggle command.
- `edit [task index] [task description] [deadline]`: Edit registered task.
- `progress`: View progress bar according to the number of completed tasks.
- `clear`: Clears all tasks from the tasks.json file.
- `time left` : Returns number of days left till the task expires
- `credits`: Get to know the people behind the code!.

## Credits:

This software was created as a Node JS project during the Full Stack Node course at Digital House programming school.
