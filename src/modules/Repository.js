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

  addTaskToProject(projectName, task) {
    if (this.projects.has(projectName)) {
      const tasks = this.projects.get(projectName);
      tasks.push(task);
      this.projects.set(projectName, tasks);
    } else {
      this.projects.set(projectName, [task]);
    }
  }

  getTasks(projectName) {
    return this.projects.get(projectName);
  }
}
