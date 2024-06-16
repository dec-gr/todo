import { generateProjectId } from "./generateId";

const projectFactory = (title) => {
  const tasks = [];
  const id = generateProjectId();

  const addTask = (task) => {
    tasks.push(task);
  };

  const removeTask = (taskId) => {
    const index = tasks
      .map((x) => {
        return x.id;
      })
      .indexOf(taskId);
    tasks.splice(index, 1);
  };

  // const editProject = (newTitle) => {
  //   title = newTitle;
  // };

  return {
    title,
    tasks,
    id,
    addTask,
    removeTask,
  };
};

export default projectFactory;
