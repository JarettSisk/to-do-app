"use strict"

let mainDiv = document.querySelector("#todo-div");
// Read existing todos from localStorage
const getSavedTodos = () => {
  let todoListJSON = localStorage.getItem("todos");

  try {
    return todoListJSON ? JSON.parse(todoListJSON) : [];
  } catch (error) {
    return [];
  }

}

// save the todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render the todos
const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter(function (obj) {
    const searchTextMatch = obj.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !obj.completed
    
    return searchTextMatch && hideCompletedMatch
    
  })

  let unfinishedTodos = filteredTodos.filter(function (obj) { 
    return !obj.completed

  })

  mainDiv.innerHTML = ""

  generateSummaryDOM(unfinishedTodos);

  filteredTodos.forEach(function(obj) {
    generateTodoDom(obj);
  })

}

// Remove a todo by id
const removeTodo = (id) => {
  let todoIndex = todoList.findIndex(function (obj) {
    console.log("ID" + id);
    console.log(obj.id);
    return obj.id === id;
    
  }) 
  console.log(todoIndex);
  if (todoIndex > -1) {
    todoList.splice(todoIndex, 1);
  }
}

//Toggle completed
const markTodoCompleted = (obj1, todoCheckbox) =>  {
  let todoIndex = todoList.findIndex( (obj) => {
   
    return obj.id === obj1.id;
    
  }) 

  if (todoIndex > -1) {
    obj1.completed = todoCheckbox.checked;
  }
}

// add the notes to the DOM
const generateTodoDom = (obj) => {
  let todoLabel = document.createElement("label");
  let containerDiv = document.createElement("div");
  let todoCheckbox = document.createElement("input");
  let todoSpan = document.createElement("span");
  let todoButton = document.createElement("button");

  // set the todo checkbox
  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = obj.completed;
  todoCheckbox.addEventListener("change", () => {
    markTodoCompleted(obj, todoCheckbox);
    saveTodos(todoList);
    renderTodos(todoList, filters);
  })
  containerDiv.appendChild(todoCheckbox);
  
  // set todo text
  todoSpan.textContent = obj.text;
  containerDiv.appendChild(todoSpan);

  // setup container
  todoLabel.classList.add("list-item");
  containerDiv.classList.add("list-item__container");
  todoLabel.appendChild(containerDiv);

  // set the remove button
  todoButton.textContent = "remove";
  todoButton.classList.add("button", "button--text");
  todoButton.addEventListener("click", () => {
    removeTodo(obj.id);
    saveTodos(todoList);
    renderTodos(todoList, filters);
  })
  todoLabel.appendChild(todoButton);
  
  mainDiv.appendChild(todoLabel);
}

const generateSummaryDOM = (unfinishedTodos) => {
  
  let summaryOfTodos = document.createElement("h2");
  summaryOfTodos.classList.add("list-title");
  if (unfinishedTodos.length === 1) {
    summaryOfTodos.textContent = `You have ${unfinishedTodos.length} todo left:`;
  } else {
    summaryOfTodos.textContent = `You have ${unfinishedTodos.length} todo's left:`;
  }
  
  mainDiv.appendChild(summaryOfTodos);
}
