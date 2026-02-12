const userInput = document.querySelector(".inputUser");
const userSubmit = document.querySelector(".submitUser");
const listUser = document.querySelector(".listsUser");
const hero = document.querySelector(".hero");

// Show msg if not contain any task
const taskmsg = document.createElement("p");
taskmsg.textContent = "No tasks yet — add something 🚀";
showmsg();
hero.append(taskmsg);

loadTasks();

// logic to work list item
function toDo() {
    userInput.focus();
    if (userInput.value === "") {
        userInput.style.border = "2px solid red";
        return;
    }
    // list item creates 
    const listItems = document.createElement("li");
    const listbtn = document.createElement("button");

    listItems.classList.add("listUser");
    listItems.textContent = userInput.value;
    listItems.classList.add("text");
    listbtn.classList.add("listDelete");
    listbtn.textContent = "Delete";

    listUser.appendChild(listItems);
    listItems.appendChild(listbtn);

    saveTask(userInput.value, false);
    userInput.value = "";
}
// User Submit data 
userSubmit.addEventListener("click", event => {
    event.preventDefault();
    toDo();
    showmsg();
})
userInput.addEventListener("keydown", event => {
    if (event.key === 'Enter') {
        toDo();
    }
    showmsg();
})

// Remove items from lists
listUser.addEventListener("click", event => {
    if (event.target.classList.contains("listDelete")) {
        const taskstext = event.target.parentElement.textContent.replace("Delete","").trim();
        removeTask(taskstext);
        event.target.parentElement.remove();
        showmsg();
    }
   
})

// add list as marked
listUser.addEventListener("click", event => {
    if (event.target.classList.contains("text")) {
        event.target.classList.toggle("marked");
        showMark(event.target.textContent);
    }
})

// Show message when no data
function showmsg() {
    if (listUser.children.length === 0) {
        taskmsg.style.display = "block";
    }
    else {
        taskmsg.style.display = "none";
    }
}

// Code for local strorage

// save task to local storage
function saveTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(element => {
    const listItems = document.createElement("li");
    const listbtn = document.createElement("button");

    listItems.classList.add("listUser");
    listItems.textContent = element.text;
    listItems.classList.add("text");
    listbtn.classList.add("listDelete");
    listbtn.textContent = "Delete";

    listUser.appendChild(listItems);
    listItems.appendChild(listbtn);

    if(element.completed){
        listItems.classList.add("marked");
    }
    });
    showmsg();
}
function removeTask(text){
   let tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
   tasks = tasks.filter(data => data.text !== text);
    localStorage.setItem("tasks",JSON.stringify(tasks));

}


function showMark(text){
    const text1 = text.replace("Delete","").trim();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(value=>{
        if(value.text === text1){
            value.completed = !value.completed;
        }
        return value;
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}