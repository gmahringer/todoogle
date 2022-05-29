import { Component, OnInit } from '@angular/core';
import {Todo} from "./todo";
import {GoogleCalendarIntegrationComponent} from "../google-calendar-integration/google-calendar-integration.component";
//import {AppComponent} from "../app.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public title ='';
  public description = '';
  public startDate = new Date();
  public dueDate = new Date();
  public items: Todo[] = [];
  selectedRecurrence = null;

  recurrence = [
    {id: 1, name: "-"},
    {id: 2, name: "daily"},
    {id: 3, name: "weekly"},
    {id: 4, name: "monthly"},
    {id: 5, name: "yearly"}
  ];

  public getTodos(): Todo[] {
    return this.items;
  }

  public addTodo(title: string,description: string, startDate: Date, dueDate: Date, selectedRecurrence: string): void {
    if (this.description && this.dueDate) {
      let id = 0;
      if (this.items.length) {
        id = Math.max(...this.items.map(t => t.id)) + 1;
      }
      GoogleCalendarIntegrationComponent.addEvent(title,description,startDate,dueDate,selectedRecurrence);
      this.items.push({id: id,title:title, description: description, startDate: startDate, dueDate: dueDate, creationDate: new Date(),recurrence: selectedRecurrence });
      this.description = '';
      this.startDate = new Date();
      this.title ='';
      this.dueDate = new Date();
    }
  }



}
