// selectors
const openMenu = document.querySelector(".menu1");
const closeMenu = document.querySelector(".menu2");
const header = document.querySelector(".info");
const form = document.querySelector(".add-todo");
const task = document.querySelector(".tasks");
const addBtn = document.querySelector(".add-btn");
const taskForm = document.querySelector(".add-todo");
const addTodo = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".task-box");
const menu = document.querySelector(".menu");
const light=document.querySelector(".light");
const dark=document.querySelector(".dark");
const lightIcon=document.querySelector(".fa-sun");

// event listener
openMenu.addEventListener("click", open);
closeMenu.addEventListener("click", close);
addBtn.addEventListener("click", addItem);
addTodo.addEventListener("click", createList);
todoList.addEventListener("click", checkRemove);
menu.addEventListener("click", filterMenu);
document.addEventListener("DOMContentLoaded", getLocalTodos)
light.addEventListener("click",lightMod);
dark.addEventListener("click",darkMod);

// function
function lightMod(){
    document.body.style.backgroundColor="#EEEEEE";
    openMenu.style.color="#020527";
    closeMenu.style.color="#020527";
    light.style.display="none";
    close();
    dark.style.display="flex";

}
function darkMod(){
    document.body.style.backgroundColor="#020527";
    openMenu.style.color="#fff";
    closeMenu.style.color="#fff";
    light.style.display="flex";
    close();
    dark.style.display="none";
}
function open() {
    header.style.display = "flex";
    closeMenu.style.display = "flex";
    openMenu.style.display = "none";
    header.style.backgroundColor = "#3949AB";
    form.style.display = "none";
    task.style.opacity = ".3";
};

function close() {
    header.style.display = "none";
    closeMenu.style.display = "none";
    openMenu.style.display = "flex";
    task.style.opacity = "1";

};

function addItem() {
    taskForm.style.display = "flex";
    close();
}

function createList(e) {
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = ` <li class="todo-item">${todoInput.value}</li>
    <span> <i class="fa-solid fa-check"></i></span>
    <span><i class="fa-solid fa-trash-can"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
    taskForm.style.display = "none";
}

function checkRemove(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    if (classList[1] === "fa-check") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("complete");
    } else if (classList[1] === "fa-trash-can") {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
}

function filterMenu(e) {
    // console.log(e.target.parentElement.classList[0]);
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch (e.target.parentElement.classList[0]) {
            case "all":
                todo.style.display = "flex";
                close();
                break;
            case "completed":
                if (todo.classList.contains("complete")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                close();
                break;
            case "uncompleted":
                if (!todo.classList.contains("complete")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                close();
                break;
        }
    })

}
// local
function saveLocalTodos(todo) {
    let saveTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    saveTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(saveTodos));
}

function getLocalTodos() {
    let saveTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    saveTodos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = ` <li class="todo-item">${todo}</li>
    <span> <i class="fa-solid fa-check"></i></span>
    <span><i class="fa-solid fa-trash-can"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    // console.log(todo.children[0].innerText)
    let saveTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    const filterTodos = saveTodos.filter((t) => t !== todo.children[0].innerText)
    localStorage.setItem("todos", JSON.stringify(filterTodos));
}