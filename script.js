//I used AI to help debug my code, and it suggested lines 14 and 43. 
function btnClick(){
    let dueDate = infoArray[0];
    let details = infoArray[1];

    if (dueDate === "" || details === ""){
        alert("Please fill in all the required fields.");
        return; 
    }
    else{
        alert("Task added successfully!");
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(infoArray);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

document.getElementById("addBtn").addEventListener("click", function(){
    let dueDate = document.getElementById("dueDate").value;
    let details = document.getElementById("details").value;
    let selectedImportance = document.querySelector('input[name="importance"]:checked');
    let importance = selectedImportance ? selectedImportance.value : "None";

    infoArray = [dueDate, details, importance]; 
    btnClick();
});

function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
    displayTasks(); 
}

function displayTasks(){
    let container = document.getElementById("triplecontainer");
    container.innerHTML = ""; 

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        let dueDateBox = document.createElement("div");
        dueDateBox.classList.add("task-box");
        dueDateBox.textContent = task[0]; 
        taskItem.appendChild(dueDateBox);

        let detailsBox = document.createElement("div");
        detailsBox.classList.add("task-box");
        detailsBox.textContent = task[1]; 
        taskItem.appendChild(detailsBox);

        let importanceBox = document.createElement("div");
        importanceBox.classList.add("task-box");
        importanceBox.textContent = task[2]; 
        taskItem.appendChild(importanceBox);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function (){
            deleteTask(index); 
        });
        taskItem.appendChild(deleteBtn);

        container.appendChild(taskItem);
    });
}

displayTasks();