( document => {
  function createElements(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);
    if(children.length > 0) {
      children.forEach(child => {

        if(typeof child == "string") {
          child = document.createTextNode(child);
        }

        element.appendChild(child);
      });
    }
    return element;
  }

  function createTodoItem(nameField, surnameField, emailField, phoneField, birdField) {
    const labelName = createElements('label', {className: 'title'}, nameField),
          inputName = createElements('input', {className: 'textfield', type: 'text', required: 'required'}),
          name = createElements('td', {}, labelName, inputName),
          labelSurname = createElements('label', {className: 'title'}, surnameField),
          inputSurname = createElements('input', {className: 'textfield', type: 'text', required: 'required'}),
          surname = createElements('td', {}, labelSurname, inputSurname),
          labelEmail = createElements('label', {className: 'title'}, emailField),
          inputEmail = createElements('input', {className: 'textfield', type: 'email', required: 'required'}),
          email = createElements('td', {}, labelEmail, inputEmail),
          labelPhone = createElements('label', {className: 'title'}, phoneField),
          inputPhone = createElements('input', {className: 'textfield', type: 'tel'}),
          phone = createElements('td', {}, labelPhone, inputPhone),
          labelDate = createElements('label', {className: 'title'}, birdField),
          inputDate = createElements('input', {className: 'textfield', type: 'date'}),
          birthdayDate = createElements('td', {}, labelDate, inputDate),
          editButton = createElements('button', {type: 'submit', className: 'btn btn-info'}, 'Edit'),
          editField = createElements('td', {}, editButton),
          listUser = createElements('tr', {className: 'item'}, name, surname, email, phone, birthdayDate, editField);


    bindEvents(listUser);

    return listUser;
  }

  function bindEvents(todoItem) {
    const editButton = todoItem.querySelector('button.btn-info');

    editButton.addEventListener('click', editTodoItem);
  }

  function addTodoItem(event) {
    event.preventDefault();
    const todoItem = createTodoItem(nameInput.value, surnameInput.value, emailInput.value, phoneInput.value, birsdayInput.value);
    todolist.appendChild(todoItem);
    userForm.reset();
  }


  function editTodoItem() {
    const listItem = this.parentNode.parentNode;
    const title = listItem.querySelectorAll('.title');
    const editInput = listItem.querySelectorAll('.textfield');
    const isEdditeng = listItem.classList.contains('editing');

    if (isEdditeng) {
      title.forEach((item, i) => item.innerText = editInput[i].value);
      this.innerText = 'Edit';
    } else {
      editInput.forEach((item, i) => item.value = title[i].innerText);
      this.innerText = 'Save';
    }

    listItem.classList.toggle('editing');
  }

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

  let winnerCount = 0;

  function randomWinner() {
    const todoList = document.querySelectorAll('.item');
    const winner = randomInteger(0, todoList.length - 1) ;
    const winnerList = document.getElementById('winner-list');

    todoList.forEach((item, i) => {
      if(item.classList.contains("success")) item.classList.remove("success");
      if(i == winner) {
        item.classList.add('success');
        const title = item.querySelectorAll('label.title');
        winnerCount++;
        const fullName = winnerCount + ' ' + title[0].innerText + ' ' + title[1].innerText;
        const newWinner = createElements('div', {className: 'winner-list'}, fullName);
        winnerList.appendChild(newWinner);
      }
    });

  }

  const userForm = document.getElementById('user-form'),
        nameInput = document.getElementById('name-input'),
        surnameInput = document.getElementById('surname-input'),
        emailInput = document.getElementById('email-input'),
        phoneInput = document.getElementById('phone-input'),
        birsdayInput = document.getElementById('birthday-input')
        todolist = document.getElementById('list-item'),
        todoItem = document.querySelectorAll('.item'),
        winnerBtn = document.getElementById('winner');

  function main() {
    userForm.addEventListener('submit', addTodoItem);
    todoItem.forEach(item => bindEvents(item));
    winnerBtn.addEventListener('click', randomWinner);
  }

  main();
})(document);
