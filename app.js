const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');

loadAllEventListerners();

function loadAllEventListerners() {
    //load all tasks
    document.addEventListener('DOMContentLoaded', loadAllTasks);
    //add task
    form.addEventListener('submit', addTask);
    //delete task
    taskList.addEventListener('click', removeTask);
    //clear all tasks
    clearBtn.addEventListener('click', clearTask);
    //filter
    filter.addEventListener('keyup', filterTask);
}

function loadAllTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

function clearTask() {
    //taskList.innerHTML = '';

    //faster method
    while(taskList.firstChild) {
        // taskList.firstChild.remove();
        taskList.removeChild(taskList.firstChild);
    }

    //clear LS
    clearLS();
}

function clearLS() {
    localStorage.clear();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        //remove from LS
        removeFromLS(e.target.parentElement.parentElement);
    }
}

function removeFromLS(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function addTask(e) {
    let task = taskInput.value;
    
    if(task === '') {
        alert('Add content before submitting');
        return ;
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLS(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLS(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}