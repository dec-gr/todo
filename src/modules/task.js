import { generateTaskId } from "./generateId";

const taskFactory = (title, description, dueDate, isComplete = false) => {
  const id = generateTaskId();

  const toggleComplete = function () {
    this.isComplete = !this.isComplete;
  };

  const editTask = (newTitle, newDescription, newDueDate) => {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDueDate;
  };

  return {
    title,
    description,
    dueDate,
    isComplete,
    id,
    toggleComplete,
    editTask,
  };
};

export default taskFactory;
