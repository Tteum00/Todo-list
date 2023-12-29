document.addEventListener('DOMContentLoaded', () => {
  const toDo = document.querySelector('#toDo');
  const addButton = document.querySelector('#addButton');
  const toDoList = document.querySelector('#toDoList');

  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

  savedTodos.forEach((todoText) => {
    const item = createTodoItem(todoText);
    toDoList.appendChild(item);
  });

  addButton.addEventListener('click', () => {
    const todoText = toDo.value;

    const item = createTodoItem(todoText);
    toDoList.appendChild(item);

    savedTodos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(savedTodos));

    toDo.value = '';
  });

  function createTodoItem(text) {
    const item = document.createElement('div');
    const checkBox = document.createElement('input')
      checkBox.setAttribute('type','checkbox')
    const textSpan = document.createElement('span');
    const removeButton = document.createElement('button');

    textSpan.textContent = text;
    removeButton.textContent = '삭제';

    removeButton.addEventListener('click', (event) => {
      event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode);

      const index = savedTodos.indexOf(text);
      if (index !== -1) {
        savedTodos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(savedTodos));
      }
    });

    item.appendChild(checkBox);
    item.appendChild(textSpan);
    item.appendChild(removeButton);

    return item;
  }
});

