if (localStorage.getItem('list') === null) {
    localStorage.setItem('list', JSON.stringify([]));
}


var forId = 1;

let toDoList = document.querySelector('.toDoList');
let toDoListTable = document.querySelector('.toDoListTable');
let toDoListEmpty = document.querySelector('.toDoListEmpty');

let todoBody = document.createElement('tbody');
todoBody.setAttribute('id', 'todoBody');
toDoListTable.appendChild(todoBody);



function showToDoList() {
    let list = JSON.parse(localStorage.getItem('list'));
    if (list.length === 0)
        return;

    let showList = '';

    list.forEach(listItem => {
        showList += `
        <tr>
            <td>${listItem.id}</td>
            <td><input id="searchName" type="text" value="${listItem.name}" onblur="editName(${listItem.id}, this.value)"></td>
            <td><input id="searchSurname" type="text" value="${listItem.surname}" onblur="editSurname(${listItem.id}, this.value)"></td>
            <td>${listItem.salary}</td>
            <td><button onclick="deleteListItem(${listItem.id})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
        `
    })

    document.getElementById('todoBody').innerHTML = showList;
}

showToDoList();

let btnAdd = document.querySelector('#btnAdd');

btnAdd.addEventListener('click', function () {
    let list = JSON.parse(localStorage.getItem('list'));
    let listName = document.querySelector('#listName');
    let listSurname = document.querySelector('#listSurname');
    let listsalary = document.querySelector('#listSalary');

    if (list.length !== 0) {
        forId = list[list.length - 1].id + 1;
    }

    let listObj = {
        id: forId,
        name: listName.value,
        surname: listSurname.value,
        salary: listsalary.value
    }

    list.push(listObj);

    localStorage.setItem('list', JSON.stringify(list));
})

// ---- delete ----//

function deleteListItem(itemId) {
    let list = JSON.parse(localStorage.getItem('list'));
    let newList = list.filter(i => i.id !== itemId);
    localStorage.setItem('list', JSON.stringify(newList));
    showToDoList();
}



// ---- edit ----//

function editName(itemId, newValue) {
    let list = JSON.parse(localStorage.getItem('list'));
    list.forEach(i => {
        if (i.id === itemId) {
            i.name = newValue;
        }
    })
    localStorage.setItem('list', JSON.stringify(list));
    showToDoList();
}

function editSurname(itemId, newValue) {
    let list = JSON.parse(localStorage.getItem('list'));
    list.forEach(i => {
        if (i.id === itemId) {
            i.surname = newValue;
        }
    })
    localStorage.setItem('list', JSON.stringify(list));
    showToDoList();
}



// ---- search ----//

let btnSearch = document.querySelector('#btnSearch');


let todoBodySearch = document.createElement('tbody');
todoBodySearch.setAttribute('id', 'todoBodySearch');
toDoListTable.appendChild(todoBodySearch);


btnSearch.addEventListener('click', function () {
    let searchInput = document.querySelector('#searchInput').value.toUpperCase();
    let list = JSON.parse(localStorage.getItem('list'));

    let todoBody = document.getElementById('todoBody');

    if (list.length === 0)
        return;

    if (searchInput === '') {
        todoBody.classList.remove('d-none');
        todoBodySearch.setAttribute("class", "d-none");
        todoBodySalarySearch.setAttribute("class", "d-none");

    }
    else {
        todoBody.setAttribute("class", "d-none");
        todoBodySearch.classList.remove('d-none');
        todoBodySalarySearch.setAttribute("class", "d-none");
    }

    let searchList = '';

    list.forEach(listItem => {
        if (listItem.name.toUpperCase().includes(searchInput) || listItem.surname.toUpperCase().includes(searchInput)) {
            searchList += `
            <tr>
                <td>${listItem.id}</td>
                <td>${listItem.name}</td>
                <td>${listItem.surname}</td>
                <td>${listItem.salary}</td>
            </tr>
            `
        }
    })

    document.getElementById('todoBodySearch').innerHTML = searchList;
    showToDoList();
})

// ---- salary filter ----//

let todoBodySalarySearch = document.createElement('tbody');
todoBodySalarySearch.setAttribute('id', 'todoBodySalary');
toDoListTable.appendChild(todoBodySalarySearch);

let btnSalary = document.querySelector('#btnSalary');

btnSalary.addEventListener('click', function (e) {
    let list = JSON.parse(localStorage.getItem('list'));
    let minNumber = document.getElementById('minNumber').value;
    let maxNumber = document.getElementById('maxNumber').value;
    console.log(minNumber);
    console.log(maxNumber);

    if (list.length === 0)
        return;

    if (minNumber=== '' || maxNumber=== '') {
        todoBody.classList.remove('d-none');
        todoBodySearch.setAttribute("class", "d-none");
        todoBodySalarySearch.setAttribute("class", "d-none");
        return;

    }
    else {
        todoBody.setAttribute("class", "d-none");
        todoBodySalarySearch.classList.remove('d-none');
        todoBodySearch.setAttribute("class", "d-none");
    }

    let salaryList = '';

    list.forEach(listItem => {
        if (Number(listItem.salary)>=minNumber && Number(listItem.salary)<=maxNumber) {
            a=Number(listItem.salary);
            salaryList += `
            <tr>
                <td>${listItem.id}</td>
                <td>${listItem.name}</td>
                <td>${listItem.surname}</td>
                <td>${listItem.salary}</td>
            </tr>
            `
        }
    })

    document.getElementById('todoBodySalary').innerHTML = salaryList;
    showToDoList();
})





