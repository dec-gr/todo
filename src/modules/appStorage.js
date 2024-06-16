import projectFactory from "./project.js";
import taskFactory from "./task.js";

const appStorage = () => {
  const projects = [];
  const projectCounter = 0;

  const loadFromStorage = (localDataStore) => {
    const dataStoreObj = JSON.parse(localDataStore);
    dataStoreObj.forEach((storedProject) => {
      const createdProject = projectFactory(storedProject["title"]);
      const projectId = createdProject.id;
      addProject(createdProject);

      storedProject.tasks.forEach((storedTask) => {
        const createdTask = taskFactory(
          storedTask.title,
          storedTask.description,
          storedTask.dueDate,
          storedTask.isComplete
        );
        addTaskToProject(projectId, createdTask);
      });
    });
  };

  const updateStorage = () => {
    localStorage.setItem("dataStore", JSON.stringify(projects));
  };

  const addProject = (project) => {
    projects.push(project);
    updateStorage();
  };

  const removeProject = (projectId) => {
    const index = projects
      .map((x) => {
        return x.id;
      })
      .indexOf(projectId);

    projects.splice(index, 1);
    updateStorage();
  };

  const addTaskToProject = (projectId, task) => {
    console.log("Here1");
    const project = projects.find((p) => p.id === projectId);
    console.log("Here2");
    if (project) {
      project.addTask(task);
    } else {
      console.log(projectId);
      console.log(typeof projectId);
      console.log(projects[1].id);
      console.log(typeof projects[1].id);

      console.log(projects);
      console.error(`Project with ID ${projectId} not found`);
    }
    updateStorage();
  };

  const updateTask = (taskId, title, description, dueDate) => {
    const tasks = projects.flatMap((project) => project.tasks);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }
    updateStorage();
  };

  const toggleTaskComplete = (taskId) => {
    const tasks = projects.flatMap((project) => project.tasks);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.toggleComplete();
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }
    updateStorage();
  };

  const getTaskComplete = (taskId) => {
    const tasks = projects.flatMap((project) => project.tasks);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      return task.isComplete;
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }
  };

  const updateProject = (projectId, newTitle) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      console.log(newTitle);
      project.title = newTitle;
    } else {
      console.error(`Project with Id ${projectId} does not exist`);
    }
    updateStorage();
  };

  const removeTaskFromProject = (projectId, taskId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      project.removeTask(taskId);
    } else {
      console.error(`Project with Id ${projectId} not found.`);
    }
    updateStorage();
  };

  return {
    projects,
    projectCounter,
    addProject,
    removeProject,
    addTaskToProject,
    updateTask,
    removeTaskFromProject,
    updateProject,
    toggleTaskComplete,
    getTaskComplete,
    loadFromStorage,
  };
};

export default appStorage;
