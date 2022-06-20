import {Component, OnInit} from '@angular/core';
import {CalendarOptions, FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {DeleteEventComponent} from "../delete-event/delete-event.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.scss']
})

/**
 * Class for the view "Kalendaransicht" under the tab "Übersicht".
 * The events from the user's Google Calendar are displayed in a calendar.
 */
export class CalendarviewComponent implements OnInit {

  /**
   * Variable required for the delete-event popup.
   */
  modalRef: BsModalRef;

  /**
   * Static list for storing all events from the user's Google Calendar.
   */
  static events = [{ }]

  /**
   * Adds event to the static list "events"
   * @param id - ID of event
   * @param title - Title of event
   * @param start - Start date of event
   * @param end - End date of the event
   * @param recurringEventId - ID of recurring event if event is recurring
   */
  static addEvent(id,title,start,end, recurringEventId) {
    let event = {
      id: id,
      groupId: recurringEventId,
      title: title,
      start: start,
      end: end
    }
    CalendarviewComponent.events.push(event)
  }

  /**
   * Constructor for the class
   * @param modalService - Bootstrap modal required for the delete-event popup
   */
  constructor(private modalService: BsModalService) {
  }

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
   * Creates FullCalendar for displaying events retrieved from the user's Google Calendar and added to CalendarviewComponent's "events" list.
   * initialView: 'dayGridMonth' - The events are listed in a calendar.
   * eventClick - If the user clicks on the event, the delete-event popup becomes visible.
   * events - Events present in CalendarviewComponent's "events" list are passed to the FullCalendar to be displayed.
   */
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.openModal.bind(this),
    events: CalendarviewComponent.events
  };

  ngOnInit(): void {
  }

}
