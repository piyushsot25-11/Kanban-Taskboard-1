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

// Register button click events
document.querySelector("#addBtn").addEventListener("click", openAddModal);
document.querySelector("#cancelBtn").addEventListener("click", closeModal);
document.querySelector("#closeBtn").addEventListener("click", closeModal);
document.querySelector("#saveBtn").addEventListener("click", saveTask);
document.querySelector(".board").addEventListener("click", handleCardButtons);

// Enable drag-and-drop for all task columns
let taskZones = document.querySelectorAll(".tasks");

for (let i = 0; i < taskZones.length; i++) {
  taskZones[i].addEventListener("dragover", allowDrop);
  taskZones[i].addEventListener("dragleave", removeDropStyle);
  taskZones[i].addEventListener("drop", dropTask);
}

// Display tasks on page load
renderBoard();

// Save tasks to local storage
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Render all task columns and update counters
function renderBoard() {
  let totalTasks = 0;

  for (let i = 0; i < columns.length; i++) {
    let status = columns[i];
    let zone = document.querySelector('[data-status="' + status + '"]');
    let count = 0;
    let cards = "";

    for (let j = 0; j < tasks.length; j++) {
      if (tasks[j].status === status) {
        cards = cards + makeCard(tasks[j]);
        count++;
      }
    }

    if (count === 0) {
      zone.innerHTML = '<p class="empty">No tasks here</p>';
    } else {
      zone.innerHTML = cards;
    }

    totalTasks = totalTasks + count;
    document.querySelector("#" + status + "Count").textContent = count;
    document.querySelector("#" + status + "Summary").textContent = count;
  }

  document.querySelector("#totalCount").textContent = totalTasks;
  addDragEvents();
}

// Create HTML for a task card
function makeCard(task) {
  let card = "";
  card = card + '<article class="card" draggable="true" data-id="' + task.id + '">';
  card = card + "<h3>" + cleanText(task.title) + "</h3>";

  if (task.description === "") {
    card = card + "<p>No description</p>";
  } else {
    card = card + "<p>" + cleanText(task.description) + "</p>";
  }

  card = card + "<div>";
  card = card + '<button data-action="edit">Edit</button>';
  card = card + '<button data-action="delete">Delete</button>';
  card = card + "</div>";
  card = card + "</article>";
  return card;
}

// Attach drag events to all cards
function addDragEvents() {
  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("dragstart", dragStart);
    cards[i].addEventListener("dragend", dragEnd);
  }
}

// Open modal to add a new task
function openAddModal() {
  taskIdInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  error.textContent = "";
  document.querySelector("#modalTitle").textContent = "Add Task";
  modal.showModal();
}

