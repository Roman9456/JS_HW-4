
const tasksList = document.getElementById('tasks__list');
const form = document.getElementById('tasks__form');
const input = document.getElementById('task__input');

function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task__title');
    taskTitle.textContent = task;

    const removeButton = document.createElement('a');
    removeButton.classList.add('task__remove');
    removeButton.innerHTML = '&times;';

    taskElement.appendChild(taskTitle);
    taskElement.appendChild(removeButton);

    return taskElement;
}


function addTask(task) {
    const taskElement = createTaskElement(task);
    tasksList.appendChild(taskElement);
    input.value = '';
}


form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (input.value) {
        addTask(input.value);
    }
});

tasksList.addEventListener('click', function(event) {
    if (event.target.classList.contains('task__remove')) {
        event.target.parentNode.remove();
    }
});


function saveTasks() {
    const tasks = [];
    const taskElements = document.getElementsByClassName('task');

    for (let taskElement of taskElements) {
        tasks.push(taskElement.querySelector('.task__title').textContent);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
        const taskList = JSON.parse(tasks);

        for (let task of taskList) {
            addTask(task);
        }
    }
}


window.onload = loadTasks;


window.onbeforeunload = saveTasks;