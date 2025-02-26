    // Поле ввода задачи
    const inputField = document.querySelector(".add-task input");

    // Загрузка задач из localStorage при загрузке страницы
    window.addEventListener('DOMContentLoaded', () => {
        loadTasksFromLocalStorage();
    });

    // Добавление задачи при нажатии Enter
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
                    <button class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                // Добавляем новую задачу в конец списка
                taskList.appendChild(newTask);
    
                // Сохраняем обновленный список задач в localStorage
                saveTasksToLocalStorage();
    
                // Очищаем поле ввода
                event.target.value = "+ Добавить задачу";
                event.target.style.color = "rgba(181, 181, 181, 1)"; // Ставим серый цвет

                event.target.blur(); // Убираем фокус с поля ввода
            }
        }
    });

    // Сохранение задач в localStorage при изменении текста
    document.querySelectorAll(".task input[type='text']").forEach(input => {
        input.addEventListener('input', () => {
            saveTasksToLocalStorage(); // Сохраняем после изменения текста
        });
    });

    // Удаление из localStorage
    document.querySelector(".task-list").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn") || event.target.closest(".delete-btn")) {
            const taskElement = event.target.closest(".task");
            taskElement.remove(); // Удаляем задачу из DOM
            saveTasksToLocalStorage(); // Сохраняем изменения
        }
    });

    // Функция для сохранения задач в localStorage
    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll(".task").forEach(taskElement => {
            const text = taskElement.querySelector("input[type='text']").value;
            const completed = taskElement.classList.contains("completed");
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Сохраняем в localStorage
    }

    // Функция для загрузки задач из localStorage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Читаем из localStorage
        const taskList = document.querySelector(".task-list");

        tasks.forEach(task => {
            const newTask = document.createElement("div");
            newTask.classList.add("task");

            // Если задача выполнена, добавляем класс 'completed'
            if (task.completed) {
                newTask.classList.add("completed");
            }

            newTask.setAttribute("onclick", "toggleTask(event)");

            newTask.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <input type="text" value="${task.text}">
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            taskList.appendChild(newTask);

            // Добавляем обработчики для кнопок удаления и изменения текста
            newTask.querySelector(".delete-btn").addEventListener('click', (event) => {
                const taskElement = event.currentTarget.closest(".task");
                taskElement.remove(); // Удаляем задачу из DOM
                saveTasksToLocalStorage(); // Сохраняем изменения
            });

            newTask.querySelector("input[type='text']").addEventListener('input', () => {
                saveTasksToLocalStorage(); // Сохраняем после изменения текста
            });

            // Обработчик для чекбокса, чтобы синхронизировать выполнение задачи
            newTask.querySelector("input[type='checkbox']").addEventListener('change', (event) => {
                const checkbox = event.target;
                if (checkbox.checked) {
                    newTask.classList.add("completed");
                } else {
                    newTask.classList.remove("completed");
                }
                saveTasksToLocalStorage(); // Сохраняем изменения в localStorage
            });
        });
    }

    // Функция для сохранения времени в localStorage
    function saveTimeToLocalStorage() {
        const startTime = document.querySelector("#start-time").value;
        const endTime = document.querySelector("#end-time").value;
        
        localStorage.setItem("startTime", startTime);
        localStorage.setItem("endTime", endTime);
    }

    // Загрузка времени из localStorage
    function loadTimeFromLocalStorage() {
        const startTime = localStorage.getItem("startTime");
        const endTime = localStorage.getItem("endTime");

        // Проверяем, если в localStorage есть данные, устанавливаем их в поля
        if (startTime) {
            document.querySelector("#start-time").value = startTime;
        }
        if (endTime) {
            document.querySelector("#end-time").value = endTime;
        }
    }

    // Слушаем изменения в полях времени
    document.querySelectorAll("input[type='time']").forEach(input => {
        input.addEventListener("change", saveTimeToLocalStorage);
    });

    // Загрузка времени при загрузке страницы
    document.addEventListener("DOMContentLoaded", () => {
        loadTimeFromLocalStorage();
    });


    // Функция для переключения состояния задачи
    function toggleTask(event) {
        const taskElement = event.currentTarget;
        const checkbox = taskElement.querySelector("input[type='checkbox']");
        const taskList = document.querySelector(".task-list");
        const textInput = taskElement.querySelector("input[type='text']");

        // Проверяем, что клик был именно по чекбоксу
        if (event.target === checkbox) {
            taskElement.classList.toggle("completed");

            if (checkbox.checked) {
                taskList.appendChild(taskElement);
                textInput.disabled = true;

            } else {
                taskList.insertBefore(taskElement, taskList.firstChild);
                textInput.disabled = false;

            }
        }

        // Сохраняем данные в localStorage
        saveTasksToLocalStorage();
    }

    // Функция для удаления задачи
    document.querySelector(".task-list").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn") || event.target.closest(".delete-btn")) {
            const taskElement = event.target.closest(".task");
            taskElement.remove(); // Удаляем задачу из DOM
        }
    });

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

    // Обработчик для потери фокуса на текстовых полях задач
    document.querySelector(".task-list").addEventListener("blur", function(event) {
        if (event.target && event.target.matches(".task input[type='text']")) {
            const taskElement = event.target.closest(".task"); // Находим родительский элемент (задачу)
    
            // Проверяем, если текстовое поле пустое
            if (event.target.value.trim() === "") {
                taskElement.remove(); // Удаляем задачу из DOM
                saveTasksToLocalStorage(); // Обновляем список задач в localStorage
            }
        }
    }, true); // Используем фазу захвата для более ранней обработки события

    // Очищаем поле ввода, если оно содержит текст по умолчанию
    document.addEventListener("DOMContentLoaded", () => {
        const taskList = document.querySelector(".task-list");
        if (taskList.children.length === 1) {
            taskList.innerHTML = ""; // Удаляем единственную задачу
        }
    });