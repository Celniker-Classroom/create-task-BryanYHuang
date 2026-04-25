//I used AI to help debug my code, and it suggested the line with jquery. 
function updateTimer(){
    let now = new Date(); 

    now.getFullYear(); 
    now.getMonth(); 
    now.getDate(); 
    now.getDay(); 
    now.getHours(); 
    now.getMinutes(); 
    now.getSeconds(); 
    now.getTime(); 

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = days[now.getDay()];

    let myDate = document.getElementById("myDate"); 
    myDate.textContent = `${dayName}, ${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds().toString().padStart(2, '0')}`;
}

setInterval(updateTimer, 1000); 
updateTimer(); 

document.getElementById("existingTasks").textContent = "Added Tasks Will Appear Below";

function btnClick(){
    let dueDate = infoArray[0];
    let details = infoArray[1];
    
    if (dueDate === "" || details === ""){
        alert("Please fill in all the required fields.");
        return; 
    }
    else{
        document.getElementById("existingTasks").textContent = "Existing Tasks: ";
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

    let dueDateValue = new Date(task[0]); 
    let now = new Date();

    dueDateBox.textContent = task[0];

    if (!isNaN(dueDateValue) && dueDateValue < now) {
        dueDateBox.classList.add("overdue");
    }

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