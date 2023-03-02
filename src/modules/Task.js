export default class Task {
  constructor(name, dueDate, done) {
    this.id = Date.now();
    this.name = name;
    this.dueDate = dueDate;
    this.done = done;
  }

  getId() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDueDate() {
    return this.dueDate;
  }
  
  setDone(done) {
    this.done = done;
  }

  getDone() {
    return this.done;
  }
}
