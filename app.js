const addTodoForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');

const addTodoWithTemplate = (todo) => {
    const todoTemplate = `
        <li class="list-group-item text-light border-0 my-1 rounded-3 d-flex justify-content-between">
            <span>${todo}</span>
            <i class="bi bi-trash-fill delete"></i>
        </li>
    `;
    
    todoList.innerHTML += todoTemplate;
};

const addTodosToLocalStorage = () => {
    const todoItems = document.querySelectorAll('li');
    const todoValues = [];
    todoItems.forEach((todo) => {
        todoValues.push(todo.innerText);
    });

    const todoJson = JSON.stringify(todoValues);
    localStorage.setItem("todos", todoJson);
};

addTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const todo = addTodoForm.add.value.trim();

    if(todo.length != 0) {
        addTodoWithTemplate(todo);
        addTodoForm.reset();
        addTodosToLocalStorage();
    }
});

todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }
    addTodosToLocalStorage();
});

const todosFromLocalStorage = localStorage.getItem("todos");
const parsedTodosFromLocalStorage = JSON.parse(todosFromLocalStorage);
parsedTodosFromLocalStorage.forEach((todo) => {
    addTodoWithTemplate(todo);
});