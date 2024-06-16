import "./style.css";
import {
  createTaskCard,
  createProjectCard,
  updateTaskCard,
  deleteTaskCard,
  toggleTask,
  deleteProjectCard,
  updateProjectCard,
} from "./modules/createDomElements";
import taskFactory from "./modules/task";
import projectFactory from "./modules/project.js";
import appStorage from "./modules/appStorage";
import { generateProjectId, generateTaskId } from "./modules/generateId.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// if (localStorage.getItem("dataStore").length !== 0) {
//   const dataStore = localStorage.getItem("dataStore");
//   console.log(dataStore);
// } else {
//   const dataStore = appStorage();
// }

const dataStore = appStorage();

if (appStorage.getItem("dataStore").length == !0) {
  dataStore.loadFromStorage(localStorage.getItem("dataStore"));
}

console.log(appStorage);

console.log("Hello World!");

displayProjects();

function createProject(projectTitle) {
  //const currentCounter = dataStore.projectCounter;
  dataStore.addProject(projectFactory(projectTitle));

  //dataStore.projectCounter = newProject.id;
}

function displayProjects() {
  const projects = document.querySelector("#board");
  const addProjectButton = projects.lastElementChild;
  console.log(addProjectButton);
  projects.innerHTML = "";
  dataStore.projects.forEach((project) => {
    //console.log(i);
    createProjectCard(project);
    project.tasks.forEach((task) => {
      createTaskCard(task, project.id);
    });
  });
  projects.appendChild(addProjectButton);
  //localStorage.setItem("dataStore", JSON.stringify(dataStore));
  //console.log("local storage:");
  //console.log(localStorage.getItem("dataStore"));
  console.log("Data Store:");
  console.log(dataStore);
  console.log("stringify");
  console.log(JSON.stringify(dataStore));
  //localStorage.setItem("dataStore", JSON.stringify(dataStore));
}

function storeData() {}
// // This is how you create a new project
// createProject("Today");

// // This is how you create a task for that project
// dataStore.projects[0].addTask(
//   taskFactory("Washing", "Wash the white shirts", "2024-05-07")
// );

// // And toggle complete
// // dataStore.projects[0].tasks[0].toggleComplete();

// createProject("Tomorrow");

// for (var i = 0; i < 2; ++i) {
//   dataStore.projects[1].addTask(
//     taskFactory(`Clean`, "Clean the living room", "2024-05-07")
//   );
// }

// console.log(dataStore);

//displayProjects();

// sleep(5000).then(() => {
//   console.log("World!");
// });

// createProjectCard(dataStore.projects[0]);
// createTaskCard(dataStore.projects[0].tasks[0], 0);

const dialog = document.getElementById("addProjectDialog");
const addProBtn = document.getElementById("addProjectBtn");
const confirmBtn = dialog.querySelector("#confirmBtn");
const projectName = document.getElementById("project-name");

addProBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // we don't want to submit this form
  console.log("This is the other button");
  createProject(projectName.value);
  // const newProject = projectFactory(projectName.value);
  // dataStore.addProject(newProject);
  dialog.close(); // Have to send the select box value here.
  projectName.value = "";
  //inputs.forEach((input) => (input.value = ""));
  displayProjects();
  console.log(dataStore);
  console.log("Hello");
});

// document.querySelector(".projects").addEventListener("click", function (event) {
//   console.log(event);
//   if (event.target.id === "taskConfirmBtn") {
//     event.preventDefault();
//     console.log("Button Clicked");
//     console.log(event.target.dataSet.projectId);
//   }
// });

const addTaskDialog = document.getElementById("addTaskDialog");
addTaskDialog.addEventListener("click", function (event) {
  if (event.target.id === "taskConfirmBtn") {
    event.preventDefault();
    const taskTitle = document.getElementById("task-title");
    const taskDesc = document.getElementById("task-desc");
    const taskDate = document.getElementById("task-date");
    const currentProjectId = addTaskDialog.getAttribute(
      "data-current-project-id"
    );
    const task = taskFactory(taskTitle.value, taskDesc.value, taskDate.value);

    addTaskDialog.close(); // Have to send the select box value here.
    taskTitle.value = "";
    taskDesc.value = "";
    taskDate.value = "";
    dataStore.addTaskToProject(currentProjectId, task);
    createTaskCard(task, currentProjectId);
  }
});

const editTaskDialog = document.getElementById("editTaskDialog");
editTaskDialog.addEventListener("click", function (event) {
  if (event.target.id === "edit-taskConfirmBtn") {
    event.preventDefault();
    const taskTitle = document.getElementById("edit-task-title");
    const taskDesc = document.getElementById("edit-task-desc");
    const taskDate = document.getElementById("edit-task-date");
    const currentTaskId = editTaskDialog.getAttribute("data-current-task-id");

    dataStore.updateTask(
      currentTaskId,
      taskTitle.value,
      taskDesc.value,
      taskDate.value
    );

    updateTaskCard(
      currentTaskId,
      taskTitle.value,
      taskDesc.value,
      taskDate.value
    );

    taskTitle.value = "";
    taskDesc.value = "";
    taskDate.value = "";

    editTaskDialog.close();
  }
});

const editProjectDialog = document.getElementById("editProjectDialog");
editProjectDialog.addEventListener("click", (event) => {
  if (event.target.id === "edit-projectConfirmBtn") {
    event.preventDefault();
    const projectTitle = document.getElementById("edit-project-title");
    const projectId = editProjectDialog.getAttribute("data-current-project-id");
    console.log(projectTitle.value);
    dataStore.updateProject(projectId, projectTitle.value);
    updateProjectCard(projectId, projectTitle.value);
    projectTitle.value = "";
    editProjectDialog.close();
  }
});

// const printDataButton = document.getElementById("printDataBtn");
// printDataButton.addEventListener("click", () => {
//   console.log(dataStore);
//   console.log(generateProjectId());
//   console.log(generateTaskId());
// });

const projects = document.querySelector(".projects");
projects.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-icon")) {
    console.log(event);
    console.log(event.target.parentElement);
    const deleteBtn = event.target.parentElement;
    console.log(deleteBtn);
    console.log("try to delete");
    const taskId = deleteBtn.getAttribute("data-current-task-id");
    const taskDiv = document.querySelector(
      `[data-task-id="${taskId}"]:not(button)`
    );
    console.log("taskDiv");
    console.log(taskDiv);

    const projectDiv = taskDiv.parentElement.parentElement.parentElement;
    const projectId = projectDiv.getAttribute("data-project-id");
    console.log(projectDiv);
    console.log(projectId);
    dataStore.removeTaskFromProject(projectId, taskId);
    deleteTaskCard(taskId);
  }
});

projects.addEventListener("click", (event) => {
  if (event.target.classList.contains("complete-icon")) {
    const completeBtn = event.target.parentElement;
    const taskId = completeBtn.getAttribute("data-current-task-id");
    //const projectId = completeBtn.getAttribute('data-current-project-id');

    dataStore.toggleTaskComplete(taskId);
    const taskComplete = dataStore.getTaskComplete(taskId);
    toggleTask(taskId, taskComplete);
    event.stopPropagation();
  }
});

projects.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteProjectBtnIcon")) {
    console.log(event);
    const projectId = event.target.parentElement.getAttribute(
      "data-current-project-id"
    );
    console.log(projectId);
    deleteProjectCard(projectId);
    dataStore.removeProject(projectId);
  }
});

projects.addEventListener("click", (event) => {
  if (event.target.closest("button")) {
  } else if (event.target.closest(".project-card")) {
    console.log("clicked");
    console.log(event.target);
    const toDoCard = event.target.closest(".project-card");
    toDoCard.classList.toggle("minimised");

    // todoCard.addEventListener("click", function () {
    //   this.classList.toggle("minimised");
    // });
  }
});
