if(localStorage.getItem('list')===null)
{
    localStorage.setItem('list',JSON.stringify([]));
}


var forId=1;

let toDoList =document.querySelector('.toDoList');
let toDoListTable =document.querySelector('.toDoListTable');
let toDoListEmpty =document.querySelector('.toDoListEmpty');

let todoBody=document.createElement('tbody');
todoBody.setAttribute('id','todoBody');
toDoListTable.appendChild(todoBody);



function showToDoList(){
    let list=JSON.parse(localStorage.getItem('list'));
    if(list.length===0)
    return;    
    
    let showList='';

    list.forEach(listItem=>{
        showList+=`
        <tr>
            <td>${listItem.id}</td>
            <td onclick="editName(${listItem.id})">${listItem.name}</td>
            <td>${listItem.surname}</td>
            <td>${listItem.salary}</td>
            <td>
                <button onclick="editListItem1(${listItem.id})" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></i></button>
                <button onclick="deleteListItem(${listItem.id})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `
    })

    document.getElementById('todoBody').innerHTML=showList;
}

showToDoList();

let btnAdd=document.querySelector('#btnAdd');

btnAdd.addEventListener('click',function(){
    let list=JSON.parse(localStorage.getItem('list'));    
    let listName=document.querySelector('#listName');
    let listSurname=document.querySelector('#listSurname');
    let listsalary=document.querySelector('#listSalary');

    if(list.length!==0)
    {
        forId=list[list.length-1].id+1;
        // list.forEach(listItem => {
        //     if(listItem.name===listName.value && listItem.surname===listSurname.value && listItem.salary===salary.value)
        //     return;   
        // });

    } 

    let listObj={
        id: forId,
        name: listName.value,
        surname: listSurname.value,
        salary: listsalary.value
    }

    list.push(listObj);

    localStorage.setItem('list',JSON.stringify(list));
})

// function deleteListItem(){
//     let listItembtn=document.querySelectorAll('.toDoBodyBtn');
//     let list=JSON.parse(localStorage.getItem('list')); 
//     let currentBtnId;
//     listItembtn.forEach(btnItem=>btnItem.addEventListener('click',function(e){
//         e.preventDefault();
//         ecurrent=e.target;
//         currentBtnId=ecurrent.parentElement.firstElementChild.value;         
//         return;       
//     }))
//     let newList=list.forEach(listItem=>listItem.id!==currentBtnId);
//     localStorage.setItem('list',JSON.stringify(newList));
//     showToDoList();
// }

function deleteListItem(itemId){
    let list=JSON.parse(localStorage.getItem('list'));
    let newList=list.filter(i=>i.id!==itemId);
    localStorage.setItem('list',JSON.stringify(newList));
    showToDoList();
}

function editName(x){
    let list=JSON.parse(localStorage.getItem('list'));
    
    
}




