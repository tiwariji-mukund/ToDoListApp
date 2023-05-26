let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

// function fetchToDo(){
//     //GET Request
//     fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(function (response){
//         return response.json();
//     }).then(function (data){
//         tasks = data.slice(0,10);
//         renderList();
//     }).catch(function(error){
//         console.log('error', error);
//     })
// }

async function fetchToDo(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
    }
    catch(error){
        console.log(error);
    }
}

function addTaskDOM(task){
    let li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

function renderList(){
    tasksList.innerHTML = '';
    for(let i=0; i<tasks.length; i++){
        addTaskDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotifications("Task added successfully");
        return;
    }
    showNotifications("task can not be added")
}

function markTaskAsComplete(taskId){
    let taskCompleted = tasks.filter(function (task){
        return task.id === Number(taskId);
    })

    if(taskCompleted.length > 0){
        let currTask = taskCompleted[0];
        currTask.completed = !currTask.completed;
        renderList();
        showNotifications("Task status changed successfully");
        return;
    }
}

function deleteTask(taskId){
    let newTask = tasks.filter(function (task){
        return task.id !== Number(taskId);
    })

    tasks = newTask;
    renderList();
    showNotifications("Task deleted successfully");
}

function showNotifications(text){
    //window.alert(text);
    window.alert(text);
}

function handleInputKeyPress(e){
    if(e.key === 'Enter'){
        let text = e.target.value;

        if(!text){
            showNotifications('Task can not be empty');
            return;
        }

        let task = {
            title: text,
            id: Date.now(),
            completed: false,
        }

        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e){
    let target = e.target;
    
    if(target.className === 'delete'){
        let taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className === 'custom-checkbox'){
        let taskId = target.id;
        markTaskAsComplete(taskId);
        return;    
    }
}

function initializeApp(){
    fetchToDo();
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', handleClickListener);
}
initializeApp();