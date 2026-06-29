// Local storage key and board column names
const STORAGE_KEY = "kanban-tasks";
const columns = ["todo", "progress", "done"];

// Default demo tasks shown on first load
const demoTasks = [
  { id: "1", title: "Plan UI", description: "Create the board layout.", status: "todo" },
  { id: "2", title: "Drag cards", description: "Move cards using HTML5 drag and drop.", status: "progress" },
  { id: "3", title: "Save data", description: "Persist tasks in localStorage.", status: "done" },
];

// Load tasks from local storage
let savedTasks = localStorage.getItem(STORAGE_KEY);
let tasks;
let draggedId = "";

// Use demo tasks if no saved data exists
if (savedTasks === null) {
  tasks = demoTasks;
} else {
  tasks = JSON.parse(savedTasks);
}

// Get required DOM elements
const modal = document.querySelector("#taskModal");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const taskIdInput = document.querySelector("#taskId");
const error = document.querySelector("#error");
