const actionTask = document.querySelector(".action-task");
const createTask = document.querySelector(".create-task");
const input = document.querySelector(".input-task");
const addTask = document.querySelector(".add-task");
const taskListItems = document.querySelector(".task-items-list");

let taskList = [];

// FUNÇÃO PARA ATUALIZAR A QUANTIDADE DE TAREFAS E TAREFAS CONCLUÍDAS
function updateTask() {
  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((item) => item.completed).length;

  const qtdTaskElement = document.getElementById("qtd-task");
  const completedTaskElement = document.getElementById("completed-task");

  qtdTaskElement.textContent = totalTasks;
  completedTaskElement.textContent = completedTasks;
}

// FUNÇÃO PARA ADICIONAR UMA TASK
function addTaskList() {
  const newTask = input.value.trim();

  if (newTask === "") {
    alert("Atenção! insira uma tarefa válida.");
    return;
  }

  taskList.push({
    tasks: input.value,
    completed: false,
  });

  input.value = "";

  displayTask();
  updateTask();
}

// FUNÇÃO PARA EXIBIR UMA TASK
function displayTask() {
  let newLi = "";

  taskList.forEach((item, index) => {
    newLi = newLi += `
    
        <li class="task-items ${item.completed && "done"}">
          <div class="task">
            <p>${item.tasks}</p>
          </div>
          <div class="action-btns-task">
            <i onclick="editTask(${index})" title="Editar Tarefa" class="bi bi-pencil-square"></i>
            <i onclick="completedTask(${index})" title="Finalizar Tarefa" class="bi bi-bookmark-check"></i>
            <i onclick="dellTask(${index})" title="Deletar Tarefa" class="bi bi-trash"></i>
          </div>
        </li>
    
    `;
  });

  taskListItems.innerHTML = newLi;

  localStorage.setItem("task", JSON.stringify(taskList));
}

// FUNÇÃO PARA EDITAR UMA TASK
function editTask(index) {
  const modalEditTaskList = document.querySelector(".modal-edit-task-list");
  const inputModalTask = document.querySelector(".modal-task input");
  const actionSave = document.querySelector(".save-task-list");
  const actionExit = document.querySelector(".exit-task-list");

  inputModalTask.value = taskList[index].tasks;

  inputModalTask.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      taskList[index].tasks = inputModalTask.value;

      modalEditTaskList.style.display = "none";

      displayTask();
    }
  });

  actionSave.onclick = function () {
    taskList[index].tasks = inputModalTask.value;

    modalEditTaskList.style.display = "none";

    displayTask();
  };

  actionExit.onclick = function () {
    modalEditTaskList.style.display = "none";
  };

  modalEditTaskList.style.display = "block";
  input.focus();
}

// FUNÇÃO PARA FECHAR A JANELA MODAL CLICANDO FORA DELA
window.onclick = function (event) {
  const modalEditTaskList = document.querySelector(".modal-edit-task-list");
  if (event.target === modalEditTaskList) {
    modalEditTaskList.style.display = "none";
  }
};

// FUNÇÃO PARA CONCLUIR UMA TASK
function completedTask(index) {
  taskList[index].completed = !taskList[index].completed;

  displayTask();
  updateTask();
}

// FUNÇÃO PARA DELETAR UMA TASK
function dellTask(index) {
  taskList.splice(index, 1);

  displayTask();
  updateTask();
}

// FUNÇÃO PARA SALVAR UMA TASK
function saveTask() {
  const saveTolocalStorege = localStorage.getItem("task");

  if (saveTolocalStorege) {
    taskList = JSON.parse(saveTolocalStorege);
  }

  displayTask();
  updateTask();
}

saveTask();

addTask.addEventListener("click", addTaskList);

// FUNÇÃO RESPONSÁVEL POR ADD TASK COM CLIQUE DO BOTÃO ENTER DO TECLADO
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTaskList();
  }
});

//FUNÇÃO RESPONSÁVEL POR ABRIR E FECHAR O MENU APÓS O USUÁRIO CLICAR EM CRIAR
createTask.addEventListener("click", function (e) {
  e.preventDefault();

  if (actionTask.classList.contains("open")) {
    actionTask.classList.remove("open");
  } else {
    actionTask.classList.add("open");
    input.focus();
  }
});
