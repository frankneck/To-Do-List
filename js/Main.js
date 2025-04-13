// Основные элементы
const inputField = document.querySelector(".add-task input");
const taskList = document.querySelector(".task-list");

// ================== Инициализация приложения ==================
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    loadTimeFromLocalStorage();
    
    const defaultTasks = Array.from(taskList.children).filter(function (task) {
        const text = task.querySelector('input[type="text"]').value;
        return text === "Новая задача" || text === "";
    })

    // Очистка дефолтной задачи если она единственная
    if (taskList.children.length >= defaultTasks.length) {
        defaultTasks.forEach(task => task.remove());
    }
});

// ================== Обработчики событий (делегирование) ==================
taskList.addEventListener('click', handleTaskActions);
taskList.addEventListener('change', handleCheckboxChange);
taskList.addEventListener('input', handleTextInput);
taskList.addEventListener('focus', handleFocus, true);
taskList.addEventListener('blur', handleBlur, true);

// ================== Функции обработки событий ==================
function handleTaskActions(event) {
    // Удаление задачи
    if (event.target.closest('.delete-btn')) {
        const taskElement = event.target.closest('.task');
        taskElement.remove();
        saveTasksToLocalStorage();
        return;
    }

    // Обработка чекбокса (перенесено в отдельный обработчик change)
    if (event.target.matches('input[type="checkbox"]')) {
        toggleTaskState(event.target);
    }
}

function handleCheckboxChange(event) {
    if (event.target.matches('input[type="checkbox"]')) {
        saveTasksToLocalStorage();
    }
}

function handleTextInput(event) {
    if (event.target.matches('.task input[type="text"]')) {
        saveTasksToLocalStorage();
    }
}

function handleFocus(event) {
    if (event.target.matches('.task input[type="text"]')) {
        event.target.closest('.task').style.backgroundColor = 'rgba(240, 240, 240, 0.5)';
    }
}

function handleBlur(event) {
    if (event.target.matches('.task input[type="text"]')) {
        const taskElement = event.target.closest('.task');
        taskElement.style.backgroundColor = '';
        
        if (!event.target.value.trim()) {
            taskElement.remove();
            saveTasksToLocalStorage();
        }
    }
}

// ================== Логика задач ==================
function addNewTask(text) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    
    taskElement.innerHTML = `
        <input type="checkbox">
        <input type="text" value="${text}">
        <button class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    `;

    taskList.appendChild(taskElement);
    saveTasksToLocalStorage();
}

function toggleTaskState(checkbox) {
    const taskElement = checkbox.closest('.task');
    const textInput = taskElement.querySelector('input[type="text"]');
    
    taskElement.classList.toggle('completed', checkbox.checked);
    textInput.disabled = checkbox.checked;

    // Анимация удаления
    if (checkbox.checked) {
        taskElement.classList.add('animate-complete');
        taskElement.addEventListener('animationend', () => {
            taskElement.remove();
            saveTasksToLocalStorage();
        }, { once: true });
    }
}

// ================== Работа с LocalStorage ==================
function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(taskElement => ({
        text: taskElement.querySelector('input[type="text"]').value,
        completed: taskElement.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || []);
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) taskElement.classList.add('completed');
        
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.text}" ${task.completed ? 'disabled' : ''}>
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;

        taskList.appendChild(taskElement);
    });
}

// ================== Обработчик добавления задач ==================
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const taskText = event.target.value.trim();
        
        if (taskText) {
            addNewTask(taskText);
            resetInputField(event.target);
        }
    }
});

function resetInputField(input) {
    input.value = '+ Добавить задачу';
    input.style.color = 'rgba(181, 181, 181, 1)';
    input.blur();
}

// ================== Работа с временем ==================
document.querySelectorAll('input[type="time"]').forEach(input => {
    input.addEventListener('change', () => {
        localStorage.setItem('startTime', document.querySelector('#start-time').value);
        localStorage.setItem('endTime', document.querySelector('#end-time').value);
    });
});

function loadTimeFromLocalStorage() {
    document.querySelector('#start-time').value = localStorage.getItem('startTime') || '';
    document.querySelector('#end-time').value = localStorage.getItem('endTime') || '';
}

// ================== Обработчики поля ввода ==================
inputField.addEventListener('focus', (event) => {
    if (event.target.value === '+ Добавить задачу') {
        event.target.value = '';
        event.target.style.color = 'black';
    }
});

inputField.addEventListener('blur', (event) => {
    if (!event.target.value.trim()) {
        event.target.value = '+ Добавить задачу';
        event.target.style.color = 'rgba(181, 181, 181, 1)';
    }
});