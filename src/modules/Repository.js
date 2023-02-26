import Task from "./Task";

export default class Repository {
  constructor() {
    this.projects = new Map();
  }

  addProject(name) {
    this.projects.set(name);
  }

  hasProject(name) {
    return this.projects.has(name);
  }

  addTask(projectName, taskName) {
    if (this.projects.has(projectName)) {
      this.projects
        .get(projectName)
        .put(new Task(taskName, "not yet implemented"));
    } else {
      this.projects.set(projectName, new Task(taskName, "not yet implemented"));
    }
  }
}
