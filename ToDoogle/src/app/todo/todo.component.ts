import { Component, OnInit } from '@angular/core';
import {Todo} from "./todo";
import {GoogleCalendarIntegrationComponent} from "../google-calendar-integration/google-calendar-integration.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
/**
 * Class for adding new todos to the user's Google Calendar using the interface "Todo".
 */
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Fields to enable adding new todos to the user's Google Calendar.
   */
  public title ='';
  public description = '';
  public startDate = new Date();
  public dueDate = new Date();

  /**
   * List of todos - type: interface "Todo".
   */
  public items: Todo[] = [];

  /**
   * Field required for adding recurring events to the user's Google Calendar.
   */
  selectedRecurrence = null;

  /**
   * List for dropdown list to let the user choose the frequency of recurrence when adding a new todo.
   */
  recurrence = [
    {id: 1, name: "-"},
    {id: 2, name: "täglich"},
    {id: 3, name: "wöchentlich"},
    {id: 4, name: "monatlich"},
    {id: 5, name: "jährlich"}
  ];

  /**
   * Returns the list of the newly added todos.
   */
  public getTodos(): Todo[] {
    return this.items;
  }

  /**
   * Adds new todo to the user's Google Calendar by calling the GoogleCalendarIntegrationComponent' method "addEvent"
   * and passing the user's input.
   * Todo is also added to the todo list of the class so that the newly added todos are visible to the user before navigating to another view.
   * @param title - Title of todo
   * @param description - Description of todo
   * @param startDate - Start date of todo
   * @param dueDate - Due date of todo
   * @param selectedRecurrence - Recurrence, null if no recurrence is selected
   */
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
