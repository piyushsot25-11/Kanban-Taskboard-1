# Kanban-Taskboard-1

A responsive, interactive Kanban Task Board application crafted with vanilla **HTML5**, modern **CSS3**, and **JavaScript (ES6)**. Designed as a web application for task management, it features real-time metrics, interactive dialogs, smooth HTML5 native drag-and-drop, and data persistence.

---

## ✨ Features

- **Native HTML5 Drag and Drop**: Move cards smoothly between status columns. Dynamic drag styles and dashed-border drop indicators provide clear visual feedback.
- **Task Creation & Editing**: Add new tasks or update existing ones using a native `<dialog>` modal interface with input validation.
- **Persistence**: Tasks are automatically serialized and saved in the browser's `localStorage`, ensuring data persists across refreshes.
- **Interactive Metrics Dashboard**: A summary bar at the top displays real-time statistics (Total Tasks, To Do, In Progress, Done) that update instantly as you add, edit, move, or delete tasks.
- **Responsive Layout**: Designed using CSS Grid, Flexbox, and media queries to look premium on desktops, tablets, and mobile screens.
- **Sanitized UI Rendering**: Title and description inputs are sanitized to protect against cross-site scripting (XSS) and injection vulnerabilities.
- **Empty States**: Clear and clean dashed layout indicators show when columns are empty.

---

## 📂 Project Structure

The project consists of three main files in the root folder:

```text
├── index.html   # Main layout structure, modal element, and static page components
├── style.css    # CSS Variables, grid/flexbox layouts, custom UI states, and responsive styling
├── script.js    # Data state, drag-and-drop event logic, localStorage integration, and DOM updates
└── README.md    # Documentation (this file)
```

---

## 🛠️ How It Works (Technical Details)

### 1. State Management & Lifecycle
- The application stores task objects in a global `tasks` array.
- Each task object has the structure:
  ```typescript
  interface Task {
    id: string;          // Generated via Date.now()
    title: string;       // Sanitized title text
    description: string; // Sanitized description text
    status: 'todo' | 'progress' | 'done';
  }
  ```
- **Initial Load**: Checks `localStorage` for any existing task list. If none exists, it initializes the board with default onboarding/demo tasks.

### 2. Native HTML5 Drag and Drop
- Cards are set as `draggable="true"`.
- When dragging begins, `dragstart` attaches the card's unique `id` to the transfer payload and styles the card with reduced opacity.
- Columns are set up as drop targets using `dragover`, which highlights the drop zones.
- Dropping a card captures the transfer payload, updates the matching task's status in the state array, saves it to `localStorage`, and triggers a DOM re-render.

### 3. Dialog Modal Controls
- Uses the standard HTML `<dialog>` element, which is controlled via JavaScript's `showModal()` and `close()` methods.
- The same modal is shared for both **Adding** and **Editing** tasks. The script handles this context by checking the presence of a hidden `taskId` field.
- Simple validation ensures the task title is at least 3 characters long.

---

## 🚀 Running the Project

Since this is a client-side web application, you do not need to install any heavy packages or build systems.

### Option 1: Direct File Launch
Double-click the [index.html](file:///Users/piyushjuneja/projectojt/index.html) file or open it directly in any modern browser.

### Option 2: Local Server (Recommended)
To run the board inside a local server environment, run one of the following commands in your terminal:

**Using Node.js (`npx`):**
```bash
npx http-server
```

**Using Python 3:**
```bash
python3 -m http.server 8000
```
Then, open your browser and navigate to `http://localhost:8000`.