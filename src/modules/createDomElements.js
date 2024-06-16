import taskFactory from "./task";
import { format } from "date-fns";

const createTaskCard = (todo, projectId) => {
  const projectDiv = document.querySelector(
    `[data-project-id="${projectId}"]:not(button)`
  );

  const taskList = projectDiv.querySelector(".taskList");

  const listItem = document.createElement("li");

  // const defaultProject = projects.children[projectNum];

  // Obviously we should bet getting the text from the todo object above.
  const todoCard = document.createElement("div");
  todoCard.dataset.taskId = todo.id;
  todoCard.classList.add("project-card");
  todoCard.classList.add("minimised");

  const toggleCompleteBtn = document.createElement("button");
  toggleCompleteBtn.classList.add("toggleTaskBtn");
  toggleCompleteBtn.dataset.currentTaskId = todo.id;
  toggleCompleteBtn.dataset.currentProjectId = projectId;

  var buttonIcon = document.createElement("span");
  buttonIcon.classList.add("fas", "fa-thumbs-up", "complete-icon");

  //toggleCompleteBtn.classList.add("fas", "fa-thumbs-up");

  //toggleCompleteBtn.textContent = "Complete";

  toggleCompleteBtn.appendChild(buttonIcon);

  // toggleCompleteBtn.addEventListener("click", () => {
  //   console.log("clicked");
  //   todo.toggleComplete();
  //   todoCard.querySelector(".isComplete").textContent =
  //     todo.isComplete === true ? "Completed" : "In-complete";
  //   todoCard.querySelector(".isComplete").classList.toggle("complete");
  //   todoCard.querySelector(".fa-thumbs-up").classList.toggle("green");
  //   todoCard.querySelector(".fa-thumbs-up").classList.toggle("visible");
  //   todoCard.classList.toggle("green-border");
  //   event.stopPropagation();
  // });

  const editButton = document.createElement("button");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-pencil-alt");
  editButton.appendChild(editIcon);
  //editButton.textContent = "Edit";

  const editDialog = document.querySelector("#editTaskDialog");
  const editTaskTitle = document.getElementById("edit-task-title");
  const editTaskDesc = document.getElementById("edit-task-desc");
  const editTaskDate = document.getElementById("edit-task-date");

  editButton.addEventListener("click", () => {
    editTaskTitle.value = todo.title;
    editTaskDesc.value = todo.description;
    editTaskDate.value = todo.dueDate;
    editDialog.dataset.currentTaskId = todo.id;
    editDialog.showModal();
  });

  const deleteButton = document.createElement("button");
  //deleteButton.textContent = "Remove";
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
  deleteButton.appendChild(deleteIcon);
  deleteButton.dataset.currentTaskId = todo.id;
  deleteButton.classList.add("deleteTaskBtn");
  // deleteButton.addEventListener("click", () => {
  //   projectDiv.removeChild(todoCard);
  // });

  const titleDiv = document.createElement("div");
  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = todo.title;
  const dateTitle = document.createElement("h3");
  dateTitle.textContent = "Due Date";
  dateTitle.classList.add("task-card-section-header");
  const date = document.createElement("p");
  date.classList.add("date", "task-card-section-text");
  //date.textContent = `Due Date: ${todo.dueDate}`;
  date.textContent = `${format(todo.dueDate, "do MMM")}`;

  const descriptionTitle = document.createElement("h3");
  descriptionTitle.textContent = "Description";
  descriptionTitle.classList.add("task-card-section-header");
  const description = document.createElement("p");
  description.classList.add("descr");
  description.classList.add("task-card-section-text");

  description.textContent = todo.description;
  const isComplete = document.createElement("p");
  isComplete.classList.add("isComplete", "task-card-section-text");
  const completedText = todo.isComplete === true ? "Completed" : "In-complete";
  isComplete.textContent = completedText;

  if (todo.isComplete) {
    buttonIcon.classList.toggle("green");
    buttonIcon.classList.toggle("visible");
    todoCard.classList.toggle("green-border");
  }

  //
  //

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("task-card-details");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("taskBtnContainer");
  btnContainer.appendChild(editButton);
  btnContainer.appendChild(deleteButton);
  btnContainer.appendChild(toggleCompleteBtn);

  // todoCard.appendChild(toggleCompleteBtn);
  // todoCard.appendChild(editButton);
  // todoCard.appendChild(deleteButton);

  const taskCardHeader = document.createElement("div");
  taskCardHeader.classList.add("taskCardHeader");
  titleDiv.appendChild(title);
  taskCardHeader.appendChild(titleDiv);
  taskCardHeader.appendChild(btnContainer);

  // todoCard.appendChild(btnContainer);
  // todoCard.appendChild(title);
  //todoCard.appendChild(buttonIcon);

  todoCard.appendChild(taskCardHeader);

  detailsDiv.appendChild(descriptionTitle);
  detailsDiv.appendChild(description);

  detailsDiv.appendChild(dateTitle);
  detailsDiv.appendChild(date);

  detailsDiv.appendChild(isComplete);

  todoCard.appendChild(detailsDiv);

  // todoCard.addEventListener("click", function () {
  //   this.classList.toggle("minimised");
  // });

  listItem.appendChild(todoCard);

  taskList.appendChild(listItem);
};

const toggleTask = (taskId, taskComplete) => {
  const todoCard = document.querySelector(
    `[data-task-id="${taskId}"]:not(button)`
  );

  console.log("clicked");
  //todo.toggleComplete();
  todoCard.querySelector(".isComplete").textContent =
    taskComplete === true ? "Completed" : "In-complete";
  todoCard.querySelector(".isComplete").classList.toggle("complete");
  todoCard.querySelector(".fa-thumbs-up").classList.toggle("green");
  todoCard.querySelector(".fa-thumbs-up").classList.toggle("visible");
  todoCard.classList.toggle("green-border");
  //event.stopPropagation();
};

const deleteTaskCard = (taskId) => {
  const taskDiv = document.querySelector(
    `[data-task-id="${taskId}"]:not(button)`
  );

  const listItem = taskDiv.parentElement;

  const projectDiv = listItem.parentElement;

  projectDiv.removeChild(listItem);
};

const updateTaskCard = (taskId, title, desc, date) => {
  console.log("here");

  const taskDiv = document.querySelector(
    `[data-task-id="${taskId}"]:not(button)`
  );

  const taskTitle = taskDiv.querySelector(".title");
  const taskDesc = taskDiv.querySelector(".descr");
  const taskDate = taskDiv.querySelector(".date");

  taskTitle.textContent = title;
  taskDesc.textContent = desc;
  taskDate.textContent = format(date, "do MMM");
};

const createProjectCard = (project) => {
  const projects = document.querySelector("#board");

  const projectWrapper = document.createElement("li");
  projectWrapper.classList.add("project-wrapper");
  const projectCont = document.createElement("div");
  projectCont.classList.add("project-cont");
  projectCont.dataset.projectId = project.id;

  const dialog = document.getElementById("addTaskDialog");

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("add-task-button-container");
  const addTaskBtn = document.createElement("button");
  addTaskBtn.id = "addTaskBtn";
  addTaskBtn.classList.add("fas", "fa-plus");
  addTaskBtn.textContent = "   Add Task";
  addTaskBtn.addEventListener("click", () => {
    dialog.dataset.currentProjectId = project.id;
    dialog.showModal();
    console.log("add button clicked");
  });
  addTaskBtn.dataset.projectId = project.id;

  const deleteButton = document.createElement("button");
  // deleteButton.textContent = "Remove";
  deleteButton.dataset.currentProjectId = project.id;
  deleteButton.classList.add("deleteProjectBtn");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash", "deleteProjectBtnIcon");
  deleteButton.appendChild(deleteIcon);

  const editProjectDialog = document.querySelector("#editProjectDialog");

  const editTitle = document.getElementById("edit-project-title");

  const editButton = document.createElement("button");
  //editButton.textContent = "Edit";
  editButton.dataset.currentProjectId = project.id;
  editButton.classList.add("projectEditBtn");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-pencil-alt");
  editButton.appendChild(editIcon);

  editButton.addEventListener("click", () => {
    console.log(editTitle);
    console.log(project.title);
    editTitle.value = project.title;
    editProjectDialog.showModal();
    editProjectDialog.dataset.currentProjectId = project.id;
  });

  const taskList = document.createElement("ol");
  taskList.classList.add("taskList");

  // confirmBtn.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   console.log("Button Clicked");
  //   console.log(addTaskBtn.dataset.projectId);
  //   console.log("Here");
  //   console.log(addTaskBtn.getAttribute("data-project-id"));
  //   console.log("Stop");
  //   const task = taskFactory(taskTitle.value, taskDesc.value, taskDate.value);
  //   project.addTask(task);
  //   dialog.close(); // Have to send the select box value here.
  //   taskTitle.value = "";
  //   taskDesc.value = "";
  //   taskDate.value = "";
  // });

  const projectButtonContainer = document.createElement("div");
  projectButtonContainer.classList.add("project-btn-container");
  projectButtonContainer.appendChild(editButton);
  projectButtonContainer.appendChild(deleteButton);

  // projectCont.appendChild(projectButtonContainer);

  // projectCont.appendChild(deleteButton);

  // projectCont.appendChild(editButton);

  const title = document.createElement("p");
  title.textContent = project.title;
  title.classList.add("title-text");

  const titleDiv = document.createElement("div");
  titleDiv.appendChild(title);

  const projectHeader = document.createElement("div");
  projectHeader.classList.add("project-header");

  projectHeader.appendChild(titleDiv);

  // projectCont.appendChild(title);
  projectHeader.appendChild(projectButtonContainer);

  projectCont.appendChild(projectHeader);

  projectCont.appendChild(taskList);

  btnDiv.appendChild(addTaskBtn);
  projectCont.appendChild(btnDiv);

  projectWrapper.appendChild(projectCont);

  projects.appendChild(projectWrapper);
};

const deleteProjectCard = (projectId) => {
  const projectdiv = document.querySelector(
    `[data-project-id="${projectId}"]:not(button)`
  );

  console.log(projectdiv);

  const projectWrapper = projectdiv.parentElement;

  console.log(projectWrapper);

  //const projects = document.querySelector("#board");

  const board = projectWrapper.parentElement;

  board.removeChild(projectWrapper);
};

const updateProjectCard = (projectId, title) => {
  const projectDiv = document.querySelector(
    `[data-project-id="${projectId}"]:not(button)`
  );

  console.log(projectDiv);

  const projectTitle = projectDiv
    .querySelector(".project-header")
    .querySelector(".title-text");

  console.log(projectTitle);
  projectTitle.textContent = title;
};

export {
  createTaskCard,
  createProjectCard,
  updateTaskCard,
  deleteTaskCard,
  toggleTask,
  deleteProjectCard,
  updateProjectCard,
};
