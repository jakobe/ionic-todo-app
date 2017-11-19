export class TodoItem {
    constructor(
      public title: string,
      public description: string,
      public isDone: boolean = false,
      public dueDate: Date = null,
      public call: boolean = false) { }
  }