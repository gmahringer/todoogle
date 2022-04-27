import { Component, OnInit } from '@angular/core';
import {Todo} from "./todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public description = '';
  public dueDate = new Date();
  public items: Todo[] = [];

  public getTodos(): Todo[] {
    return this.items;
  }

  public addTodo(description: string, dueDate: Date): void {
    if (this.description && this.dueDate) {
      let id = 0;
      if (this.items.length) {
        id = Math.max(...this.items.map(t => t.id)) + 1;
      }
      this.items.push({ id: id, description: description, dueDate: dueDate, creationDate: new Date() });
      this.description = '';
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
