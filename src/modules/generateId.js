let projectId = 0;
let taskId = 0;
export function generateProjectId() {
  return "p-" + projectId++;
}

export function generateTaskId() {
  return "t-" + taskId++;
}
