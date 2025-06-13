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

function validateTask(taskText) {
  if (!taskText) {
    errorMessage.textContent = 'The field cannot be empty!';
    return false;
  }
  if (/[ء-ي]/.test(taskText)) {
    errorMessage.textContent = 'Arabic characters are not allowed!';
    return false;
  }
  if (/^\\d/.test(taskText)) {
    errorMessage.textContent = 'The task cannot start with a number!';
    return false;
  }
  if (taskText.length < 5) {
    errorMessage.textContent = 'The task must be at least 5 characters!';
    return false;
  }
  return true;
}
