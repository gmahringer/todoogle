import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  /* An empty array that is responsible
  to add a division */
  public items = [];

  /* A two-way binding performed which
     pushes text on division */
  public newTask;
  public description;

  public object1 = {
    taskDescription: 'taskDescription',
    startDate: Date.now(),
    endDate: Date.now()
  };



  /* When input is empty, it will
     not create a new division */
  public addToList() {
    if (this.object1 == null) {
    }
    else {
      this.items.push(this.object1);
      console.log(this.items);
      this.object1 = null;
    }

  }



  /* This function takes to input the
     task, that has to be deleted*/
  public deleteTask(index) {
    this.items.splice(index, 1);
  }

}
