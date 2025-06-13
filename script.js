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


function addTaskToList(taskText, isCompleted = false) {
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <span class="todo-text ${isCompleted ? 'completed' : ''}">${taskText}</span>
    <input type="checkbox" ${isCompleted ? 'checked' : ''}>
    <span class="icons">
      <i class="fas fa-pen edit-icon"></i>
      <i class="fas fa-trash delete-icon"></i>
    </span>
  `;
  todoList.appendChild(taskItem);
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(taskItem => {
    tasks.push({
      text: taskItem.querySelector('.todo-text').textContent,
      completed: taskItem.querySelector('input[type="checkbox"]').checked
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  storedTasks.forEach(task => addTaskToList(task.text, task.completed));
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();

  document.getElementById('deleteDone').addEventListener('click', () => {
    document.querySelectorAll('#todo-list li').forEach(task => {
      if (task.querySelector('input[type="checkbox"]').checked) task.remove();
    });
    saveTasksToLocalStorage();
  });

  document.getElementById('deleteAll').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all tasks?')) {
      todoList.innerHTML = '';
      saveTasksToLocalStorage();
    }
  });
});
document.getElementById('showAll').addEventListener('click', () => {
  filterTasks('all');
  setActiveFilter('showAll');
});
document.getElementById('showDone').addEventListener('click', () => {
  filterTasks('done');
  setActiveFilter('showDone');
});
document.getElementById('showTodo').addEventListener('click', () => {
  filterTasks('todo');
  setActiveFilter('showTodo');
});

function filterTasks(filterType) {
  document.querySelectorAll('#todo-list li').forEach(task => {
    const isChecked = task.querySelector('input[type="checkbox"]').checked;
    task.style.display =
      filterType === 'all' ? 'flex' :
      filterType === 'done' ? (isChecked ? 'flex' : 'none') :
      !isChecked ? 'flex' : 'none';
  });
}

function setActiveFilter(activeId) {
  document.querySelectorAll('.filter-buttons button').forEach(button => {
    button.classList.remove('active');
  });
  document.getElementById(activeId).classList.add('active');
}
