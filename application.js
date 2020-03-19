const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    //Loading the tasks from the local storage
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add a task event
    form.addEventListener('submit', addTask);
    //Remove a task event
    tasklist.addEventListener('click', removeTask);
    //Clear all the task events
    clearBtn.addEventListener('click', clearTask);

    //filter tasks events
    filter.addEventListener('keyup', filterTask);
}
//Getting the tasks from the local storage 
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        //Adding a default class for list item
        li.className = 'collection-item';
        //Appending the list item to whatever value is entered in the task input 
        li.appendChild(document.createTextNode(task));
        //creating the link icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //adding icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //appending the link to the li item 

        li.appendChild(link);
        //append the li to the ul

        tasklist.appendChild(li);

    })
}

//Adding task function

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add a task');
    } else {
        //Creation of the list element
        const li = document.createElement('li');
        //Adding a default class for list item
        li.className = 'collection-item';
        //Appending the list item to whatever value is entered in the task input 
        li.appendChild(document.createTextNode(taskInput.value));
        //creating the link icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //adding icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //appending the link to the li item 

        li.appendChild(link);
        //append the li to the ul

        tasklist.appendChild(li);

        //Store in Local Storage

        storeTaskinLocalStorage(taskInput.value);
        //clearing the input 

        taskInput.value = '';
        e.preventDefault()
    }
}


//Store Task- local storage can only store strings so we r gonna parse it as JSON

function storeTaskinLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Function to remove the tasks .

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you Sure ?")) {
            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask() {
    //tasklist.innerHTML = '';

    //faster and better way
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }

    clearTasksFromLocalStorage();
}

//Clearing the tasks from Local Storage

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTask(e) {

    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            //as in -1 signifies if there is text entered or not
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}