// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Calling function that will load all event listeners
loadEventListeners();

// Making a function which will call all event listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

// Add Task Function
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // Create a new task
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);
    console.log(li);
    taskList.appendChild(li);
    // Store in local Storage
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage
                (e.target.parentElement.parentElement);
        }
    }
}
function clearTasks() {
    // taskList.innerHTML = '';
    // OR
    while (taskList.firstChild) { // Faster one
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        // Create a new task
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(tasks));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);
        console.log(li);
        taskList.appendChild(li);
    });
}
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task, idx) {
        if (taskItem.textContent === task) {
            tasks.splice(idx, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTaskFromLocalStorage(taskItem) {
    localStorage.clear();
}