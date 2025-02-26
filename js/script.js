const inputField = document.querySelector(".add-task input");

document.querySelector(".add-task input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const taskText = event.target.value.trim();
        
        // Если текст задачи не пустой
        if (taskText) {
            const taskList = document.querySelector(".task-list");

            // Создаём новый элемент задачи
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("onclick", "toggleTask(event)");

            // Вставляем чекбокс и поле ввода для новой задачи
            newTask.innerHTML = `
                <input type="checkbox">
                <input type="text" value="${taskText}">
            `;
            
            // Добавляем новую задачу в конец списка
            taskList.appendChild(newTask);

            // Очищаем поле ввода
            event.target.value = "+ Добавить задачу";
            event.target.style.color = "rgba(181, 181, 181, 1)"; // Ставим серый цвет

            // Убираем фокус с поля
            event.target.blur();
        }
    }
});

// Функция для переключения состояния задачи
function toggleTask(event) {
    const taskElement = event.currentTarget; // это сама задача
    const checkbox = taskElement.querySelector("input[type='checkbox']");

    // Проверяем, был ли клик по чекбоксу
    if (event.target === checkbox) {
        checkbox.checked = !checkbox.checked;  // Меняем состояние чекбокса
        taskElement.classList.toggle("completed");  // Добавляем/удаляем класс completed
    }
}

// Очищаем текст при клике в поле
inputField.addEventListener("focus", function(event) {
    if (event.target.value === "+ Добавить задачу") {
        event.target.value = ""; // Стираем текст, когда начинаем ввод
        event.target.style.color = "black"; // Устанавливаем цвет черный
    }
});

// Возвращаем текст, если поле пустое при потере фокуса
inputField.addEventListener("blur", function(event) {
    if (event.target.value.trim() === "") {
        event.target.value = "+ Добавить задачу";
        event.target.style.color = "rgba(181, 181, 181, 1)"; // Серый цвет
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.querySelector(".task-list");
    if (taskList.children.length === 1) {
        taskList.innerHTML = ""; // Удаляем единственную задачу
    }
});