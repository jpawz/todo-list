import Task from "./Task";

export default class Repository {
  constructor() {
    this.projects = new Map();
  }

  addProject(name) {
    this.projects.set(name, []);
  }

  hasProject(name) {
    return this.projects.has(name);
  }

  addTask(projectName, taskName) {
    if (this.projects.has(projectName)) {
      const tasks = this.projects.get(projectName);
      tasks.push(new Task(taskName, "not yet implemented"));
      this.projects.set(projectName, tasks);
    } else {
      this.projects.set(projectName, [
        new Task(taskName, "not yet implemented"),
      ]);
    }
  }

  getTasks(projectName) {
    return this.projects.get(projectName);
  }
}
