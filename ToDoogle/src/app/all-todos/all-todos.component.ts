import {Component, OnInit} from '@angular/core';
import {CalendarOptions, FullCalendarModule} from "@fullcalendar/angular";
import listPlugin from '@fullcalendar/list';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {DeleteEventComponent} from "../delete-event/delete-event.component";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  listPlugin,
  interactionPlugin
]);

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})

/**
 * Class for the view "Alle Einträge".
 * Lists all events from the user's Google Calendar.
 */
export class AllTodosComponent implements OnInit {

  /**
   * Static variable required for displaying the results of the search function.
   * If false, all events from the user's Google Calendar will be displayed.
   * If true, the results of the search function will be displayed instead of all events.
   */
  static displaySearch : boolean;

  /**
   * Variable required for the delete-event popup.
   */
  modalRef: BsModalRef;

  /**
   * Static list for storing all events from the user's Google Calendar.
   */
  static events = [{}]

  /**
   * Adds event to the static list "events"
   * @param id - ID of event
   * @param title - Title of event
   * @param start - Start date of event
   * @param end - End date of the event
   * @param recurringEventId - ID of recurring event if event is recurring
   */
  static addEvent(id, title, start, end,recurringEventId) {
    let event = {
      id: id,
      groupId: recurringEventId,
      title: title,
      start: start,
      end: end
    }
    AllTodosComponent.events.push(event)
  }

  /**
   * Returns the static variable "displaySearch" so it can be accessed in all-todos.component.html.
   * If returns false, all events from the user's Google Calendar will be displayed.
   * If returns true, the results of the search function will be displayed instead of all events.
   * @return {boolean}
   */
  displaySearch(){
    return AllTodosComponent.displaySearch
  }

  /**
   * Constructor for the class
   * @param modalService - Bootstrap modal required for the delete-event popup
   */
  constructor(private modalService: BsModalService) {}

  /**
   * Sets static fields of the DeleteEventComponent class to enable the delete-event popup when double-clicking on the event.
   */
  openModal(arg) {
    DeleteEventComponent.id = arg.event.id ;
    DeleteEventComponent.recurringEventId = arg.event.groupId ;
    DeleteEventComponent.title = arg.event.title ;
    DeleteEventComponent.start = arg.event.start ;
    DeleteEventComponent.end = arg.event.end ;
    this.modalRef = this.modalService.show(DeleteEventComponent);
  }

  /**
   * Creates FullCalendar for displaying events retrieved from the user's Google Calendar and added to AllTodosComponent's "events" list.
   * initialView: 'listYear' - The events are listed by years.
   * eventClick - If the user clicks on the event, the delete-event popup becomes visible.
   * events - Events present in AllTodosComponent's "events" list are passed to the FullCalendar to be displayed.
   */
  calendarOptions: CalendarOptions = {
    initialView: 'listYear',
    eventClick: this.openModal.bind(this),
    plugins: [listPlugin],
    events: AllTodosComponent.events
  };

  ngOnInit(): void {
  }

}
