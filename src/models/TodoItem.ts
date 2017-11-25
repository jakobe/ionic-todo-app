export class TodoItem {
  
  List: any;

  constructor(
    public title: string,
    public description: string,
    public isDone: boolean = false,
    public dueDate: Date = null,
    public dueTonight: boolean = false,
    public call: boolean = false)
    {
    }

  public get isOverdue():boolean {
    return this.dueDate && TodoItem.today > this.dueDate;
  };

  public get isDueToday():boolean {
    var today = TodoItem.today;
    return this.dueDate &&
            this.dueDate.getFullYear() === today.getFullYear() &&
            this.dueDate.getMonth() === today.getMonth() &&
            this.dueDate.getDate() === today.getDate();
  };

  static get today() : Date {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;   
  }
}