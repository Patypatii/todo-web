// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Functions

// Add Todo
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create List Item
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //SAVE TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  // Checkmark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  // Append Todo to List
  todoList.appendChild(todoDiv);

  // Clear Input Value
  todoInput.value = "";
}

// Delete or Mark as Completed
function deleteCheck(event) {
  const item = event.target;

  // Delete Todo
  if (item.classList.contains("trash-button")) {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Mark as Completed
  if (item.classList.contains("complete-button")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//FILTER TODO
const filterTodo = (event) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    if (todo.nodeType === 1) {
      // Fix: Check if the node is an element
      switch (event.target.value) {
        case "all":
          todo.style.display = "flex"; // Apply style to valid element nodes
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
};


//ADDING TO LOCALSTORAGE
const saveLocalTodos = (todo)=>{
    //check if the items already exists
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//SHOWING ITEMS TO UI FROM LOCAL STORAGE
const getTodos = ()=>{
     //check if the items already exists
     let todos;
     if (localStorage.getItem('todos') === null) {
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
 
     todos.forEach((todo)=>{
         // Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create List Item
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);


  // Checkmark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  // Append Todo to List
  todoList.appendChild(todoDiv);

     })
}


//REMOVE TODOS FROM LOCAL STORAGE
const removeLocalTodos = (todo)=>{
    //check if the items already exists
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex=  todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);
