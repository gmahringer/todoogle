import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  title: string = "Task Information";
  taskName: string = "Do work in the household";
  taskDescription: string = "Take out the trash and do the dishes";
  taskStartDate: Date = new Date();
  taskDueDate: Date = new Date();

  constructor() {

  }

  ngOnInit(): void {
  }

}
