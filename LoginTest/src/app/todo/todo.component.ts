import { Component, OnInit } from '@angular/core';
import {Todo} from "./todo";
import {GoogleCalendarIntegrationComponent} from "../google-calendar-integration/google-calendar-integration.component";

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

  public getTodos(): Todo[] {
    return this.items;
  }

  public addTodo(title: string,description: string, startDate: Date, dueDate: Date): void {
    if (this.description && this.dueDate) {
      let id = 0;
      if (this.items.length) {
        id = Math.max(...this.items.map(t => t.id)) + 1;
      }
      GoogleCalendarIntegrationComponent.addEvent(title,description,startDate,dueDate);
      this.items.push({ id: id,title:title, description: description, startDate: startDate, dueDate: dueDate, creationDate: new Date() });
      this.description = '';
      this.startDate = new Date();
      this.title ='';
      this.dueDate = new Date();
    }
  }

  public deleteTodo(id: number): void {
    const index = this.items.findIndex(t => t.id === id);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }


}
