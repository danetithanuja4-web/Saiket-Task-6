// Get DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
document.addEventListener('DOMContentLoaded', renderTasks);

// Add task event listener
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

// Function to add a new task
function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(task);
    renderTasks();
}

// Function to render all tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}

// Function to create a task element
function createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    if (task.completed) {
        taskItem.classList.add('completed');
    }
    taskItem.dataset.id = task.id;

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'task-btn complete-btn';
    completeBtn.innerHTML = '✓';
    completeBtn.title = 'Mark as complete';
    completeBtn.addEventListener('click', () => toggleComplete(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-btn delete-btn';
    deleteBtn.innerHTML = '✕';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskActions);

    return taskItem;
}

// Function to toggle task completion
function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add some interactivity: Focus on input when page loads
taskInput.focus();

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        taskForm.dispatchEvent(new Event('submit'));
    }
});