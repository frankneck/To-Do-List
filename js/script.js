function toggleTask(event) {
    const taskElement = event.currentTarget;
    const checkbox = taskElement.querySelector("input[type='checkbox']");
    const textInput = taskElement.querySelector("input[type='text']");

    // Проверяем, был ли клик по чекбоксу
    if (event.target === checkbox) {
        checkbox.checked = !checkbox.checked;
        taskElement.classList.toggle("completed"); // Добавляем/удаляем класс completed
    }

    // Если задача выполнена, делаем поле для ввода неактивным
    if (checkbox.checked) {
        textInput.disabled = true;  // Делаем поле недоступным для редактирования
    } else {
        textInput.disabled = false;  // Разблокируем поле для редактирования
    }
}
