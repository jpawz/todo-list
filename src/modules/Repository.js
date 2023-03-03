import Task from "./Task";

export default class Repository {
  constructor() {
    this.projects = new Map();
    this.loadProjectsFromLocalStorage();
  }

  loadProjectsFromLocalStorage() {
    const numberOfProjects = window.localStorage.length;
    for (let i = 0; i < numberOfProjects; i++) {
      let projectName = window.localStorage.key(i);
      let tasks = this.loadTasksFromLocalStorage(projectName);
      tasks.forEach((task) =>
        this.addTask(
          projectName,
          new Task(task.name, task.dueDate, task.done, task.id)
        )
      );
      // this.projects.set(projectName, tasks);
    }
  }

  saveProjectToLocalStorage(projectName, tasks) {
    window.localStorage.setItem(projectName, JSON.stringify(tasks));
  }

  loadTasksFromLocalStorage(projectName) {
    return JSON.parse(window.localStorage.getItem(projectName));
  }

  addProject(name) {
    this.projects.set(name, []);
    this.saveProjectToLocalStorage(name, []);
  }

  hasProject(name) {
    return this.projects.has(name);
  }

  addTaskToProject(projectName, task) {
    this.addTask(projectName, task);

    this.saveProjectToLocalStorage(projectName, this.projects.get(projectName));
  }

  addTask(projectName, task) {
    if (this.projects.has(projectName)) {
      const tasks = this.projects.get(projectName);
      tasks.push(task);
      this.projects.set(projectName, tasks);
    } else {
      this.projects.set(projectName, [task]);
    }
  }

  getTasks(projectName) {
    if (this.projects.get(projectName)) {
      return this.projects.get(projectName);
    } else {
      return [];
    }
  }

  switchTaskDone(projectName, taskId) {
    const tasks = this.projects.get(projectName);
    tasks.forEach((task) => {
      if (task.getId() == taskId) {
        task.setDone(!task.getDone());
      }
    });
    this.projects.set(projectName, tasks);

    this.saveProjectToLocalStorage(projectName, this.projects.get(projectName));
  }

  getAllTasks() {
    const allTasks = [];

    for (const tasks of this.projects.values()) {
      allTasks.push(...tasks);
    }

    return allTasks;
  }
}
