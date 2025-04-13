// Функция для сохранения задач в localStorage
export function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(taskElement => {
        const text = taskElement.querySelector("input[type='text']").value; // Получаем текст задачи
        const completed = taskElement.classList.contains("completed"); // Проверяем, завершена ли задача
        tasks.push({ text, completed }); // Добавляем задачу в массив
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Сохраняем в localStorage
}

// Функция для загрузки задач из localStorage
export function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Загружаем задачи из localStorage
    const taskList = document.querySelector(".task-list");

    tasks.forEach(task => {
        const newTask = document.createElement("div");
        newTask.classList.add("task");
        if (task.completed) {
            newTask.classList.add("completed"); // Если задача завершена, добавляем стиль
        }

        newTask.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.text}">
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;

        // Обработчик для чекбокса
        newTask.querySelector("input[type='checkbox']").addEventListener('change', (event) => {
            const checkbox = event.target;
            const taskElement = checkbox.closest(".task");

            if (checkbox.checked) {
                taskElement.classList.add("animate-complete"); // Запускаем анимацию завершения
                taskElement.addEventListener('animationend', () => {
                    taskElement.remove(); // Удаляем задачу после анимации
                    saveTasksToLocalStorage();
                }, { once: true });
            } else {
                taskElement.classList.remove("completed", "animate-complete");
                saveTasksToLocalStorage();
            }
        });

        taskList.appendChild(newTask); // Добавляем задачу в список
    });
}

// Функция для сохранения времени в localStorage
export function saveTimeToLocalStorage() {
    const startTime = document.querySelector("#start-time").value; // Получаем значение времени начала
    const endTime = document.querySelector("#end-time").value; // Получаем значение времени окончания
    
    localStorage.setItem("startTime", startTime); // Сохраняем время начала
    localStorage.setItem("endTime", endTime); // Сохраняем время окончания
}

// Загрузка времени из localStorage
export function loadTimeFromLocalStorage() {
    const startTime = localStorage.getItem("startTime"); // Получаем время начала из localStorage
    const endTime = localStorage.getItem("endTime"); // Получаем время окончания из localStorage

    // Проверяем, если в localStorage есть данные, устанавливаем их в поля
    if (startTime) {
        document.querySelector("#start-time").value = startTime;
    }
    if (endTime) {
        document.querySelector("#end-time").value = endTime;
    }
}