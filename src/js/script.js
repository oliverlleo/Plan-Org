import { updateAvatarDisplay } from './avatar.js';

// ----- Variáveis e elementos comuns -----
const datePicker = document.getElementById('datePicker');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const saveTasksBtn = document.getElementById('saveTasksBtn');

const planningText = document.getElementById('planningText');
const savePlanningBtn = document.getElementById('savePlanningBtn');

let tasks = [];
let currentDate = '';

// ----- Funções de Tarefas -----
function loadTasks(date) {
  const storedTasks = localStorage.getItem('tasks-' + date);
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
  renderTasks();
}

function saveTasks(date) {
  localStorage.setItem('tasks-' + date, JSON.stringify(tasks));
  updateXPFromTasks();
  alert('Tarefas salvas!');
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" data-index="${index}" ${task.done ? 'checked' : ''}> ${task.text} (XP: ${task.xp})`;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = prompt('Digite a tarefa:');
  if (!taskText) return;
  const xpValue = parseInt(prompt('XP dessa tarefa (número):'), 10) || 0;
  tasks.push({ text: taskText, xp: xpValue, done: false });
  renderTasks();
}

function updateXPFromTasks() {
  // Calcula o XP do dia (soma somente das tarefas concluídas)
  let xpDay = tasks.reduce((sum, task) => task.done ? sum + task.xp : sum, 0);
  // Atualiza o XP total do usuário armazenado no localStorage
  let xpTotal = parseInt(localStorage.getItem('xpTotal')) || 0;
  xpTotal += xpDay;
  localStorage.setItem('xpTotal', xpTotal);
  // Atualiza a visualização do avatar, se possível
  updateAvatarDisplay();
}

// Eventos para página de Tarefas
if (datePicker) {
  // Define a data atual ao carregar a página
  currentDate = datePicker.value || new Date().toISOString().split('T')[0];
  datePicker.value = currentDate;
  loadTasks(currentDate);
  
  datePicker.addEventListener('change', function() {
    currentDate = this.value;
    loadTasks(currentDate);
  });
}

if (addTaskBtn) {
  addTaskBtn.addEventListener('click', addTask);
}

if (saveTasksBtn) {
  saveTasksBtn.addEventListener('click', function() {
    // Atualiza o status de cada tarefa conforme o checkbox
    const checkboxes = document.querySelectorAll('#taskList input[type=\"checkbox\"]');
    checkboxes.forEach(checkbox => {
      const index = checkbox.getAttribute('data-index');
      tasks[index].done = checkbox.checked;
    });
    saveTasks(currentDate);
  });
}

// ----- Funções de Planejamento -----
if (savePlanningBtn) {
  savePlanningBtn.addEventListener('click', function() {
    const text = planningText.value;
    localStorage.setItem('planning', text);
    alert('Planejamento salvo!');
  });
}

if (planningText) {
  const storedPlanning = localStorage.getItem('planning');
  if (storedPlanning) {
    planningText.value = storedPlanning;
  }
}
