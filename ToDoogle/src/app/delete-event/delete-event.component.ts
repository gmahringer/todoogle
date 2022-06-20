import { Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {GoogleCalendarIntegrationComponent} from "../google-calendar-integration/google-calendar-integration.component";

@Component({
  selector: 'edit-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})

/**
 * Class for the delete-event popup.
 * When the user clicks on an event, its details are displayed
 * and a delete button is available to delete the clicked event from the user's Google Calendar.
 */
export class DeleteEventComponent {

  /**
   * @param bsModalRef - Bootstrap modal required for the delete-event popup
   */
  constructor(public bsModalRef: BsModalRef) {}

  /**
   * Static variable to retrieve the ID, recurring event id, title, start, and end
   * of the clicked event, defined in the AllTodos/Calendarview/Listview/SearchResult component.
   */
  public static id;
  public static recurringEventId;
  public static title;
  public static start;
  public static end;

  /**
   * Fields to make the static variables id, recurringEventId, title, start and end
   * accessible in the component's html file and in the class's functions.
   */
  id = DeleteEventComponent.id;
  recurringEventId = DeleteEventComponent.recurringEventId;
  title = DeleteEventComponent.title;
  start = DeleteEventComponent.start.toLocaleString();
  end = DeleteEventComponent.end.toLocaleString();

  /**
   * Calls the GoogleCalendarIntegrationComponent's deleteEvent function
   * which deletes the clicked event from the user's Google Calendar.
   * After deleting the clicked event, closes the actual popup window and reloads the page.
   */
  deleteEvent(){
    GoogleCalendarIntegrationComponent.deleteEvent(this.id)
    this.bsModalRef.hide()
    window.location.reload();
  }

  /**
   * Button for this function is visible only if the clicked event is a recurring event.
   * Calls the GoogleCalendarIntegrationComponent's deleteAll function
   * which deletes the clicked recurring event from the user's Google Calendar.
   * After deleting the clicked recurring event, closes the actual popup window and reloads the page.
   */
  deleteAllEvents(){
    GoogleCalendarIntegrationComponent.deleteAll(this.recurringEventId)
    this.bsModalRef.hide()
    window.location.reload();
  }


}
