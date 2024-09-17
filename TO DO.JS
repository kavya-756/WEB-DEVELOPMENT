document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('todo-form').addEventListener('submit', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (task === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTask = prompt('Edit your task:', tasks[index]);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
