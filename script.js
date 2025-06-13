const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todoInput');
const addTaskButton = document.getElementById('addTaskButton');
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const closeButton = document.querySelector('.close-button');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.querySelector('.cancel-btn');
const errorMessage = document.createElement('div');
errorMessage.classList.add('error-message');
todoInput.parentElement.appendChild(errorMessage);

let currentEditItem = null;

addTaskButton.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (validateTask(taskText)) {
    addTaskToList(taskText);
    todoInput.value = '';
    errorMessage.textContent = '';
    saveTasksToLocalStorage();
  }
});
