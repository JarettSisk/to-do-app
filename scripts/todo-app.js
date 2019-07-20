"use strict"

const todoList = getSavedTodos();

//select the html body
let body = document.querySelector("body");

// Filters for rendering
const filters = {
  searchText: "",
  hideCompleted: false
}

renderTodos(todoList, filters);

document.querySelector("#search-todo-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todoList, filters);

})

document.querySelector("#addTodoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.elements.addNewTodoText.value.trim() !== "") {
    todoList.push({
      id: uuidv4(),
      text: e.target.elements.addNewTodoText.value,
      completed: false
  
    }) 

  } else {
    window.alert("notes cannot be empty!");
  }
  

  saveTodos(todoList);
  renderTodos(todoList, filters);
  e.target.elements.addNewTodoText.value = "";

})

document.querySelector("#hideIfCompleted").addEventListener("change", (e) => {
 filters.hideCompleted = e.target.checked
 renderTodos(todoList, filters);

})










