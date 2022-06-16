import { Component, OnInit } from '@angular/core';
import listPlugin from '@fullcalendar/list';
import {CalendarOptions} from "@fullcalendar/angular";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import {DeleteEventComponent} from "../delete-event/delete-event.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})

/**
 * Class for the view "Heute" under the tab "Übersicht".
 * The events from the user's Google Calendar are listed by days.
 */
export class ListviewComponent implements OnInit {

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
  static addEvent(id,title,start,end,recurringEventId) {
    let event = {
      id: id,
      groupId: recurringEventId,
      title: title,
      start: start,
      end: end
    }
    ListviewComponent.events.push(event)
  }

  /**
   * Constructor for the class
   * @param modalService - Bootstrap modal required for the delete-event popup
   */
  constructor(private modalService: BsModalService) { }

  /**
   * Creates FullCalendar for displaying events retrieved from the user's Google Calendar and added to ListViewComponent's "events" list.
   * initialView: 'listDay' - The events are listed by days.
   * eventClick - If the user clicks on the event, the delete-event popup becomes visible.
   * events - Events present in ListviewComponent's "events" list are passed to the FullCalendar to be displayed.
   */
  calendarOptions: CalendarOptions = {
    initialView: 'listDay',
    eventClick: this.openModal.bind(this),
    plugins: [ listPlugin],
    events: ListviewComponent.events
  };

  /**
   * Sets static fields of the DeleteEventComponent class to enable the delete-event popup when double-clicking on the event.
   */
  openModal(arg) {
    DeleteEventComponent.id = arg.event.id ;
    DeleteEventComponent.recurringEventId = arg.event.groupId ;
    DeleteEventComponent.title = arg.event.title ;
    DeleteEventComponent.start = arg.event.start ;
    DeleteEventComponent.end = arg.event.start ;
    this.modalRef = this.modalService.show(DeleteEventComponent);
  }

  ngOnInit(): void {
  }

}
