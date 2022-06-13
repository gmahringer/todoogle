import { Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {GoogleCalendarIntegrationComponent} from "../google-calendar-integration/google-calendar-integration.component";

@Component({
  selector: 'edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent {

  constructor(public bsModalRef: BsModalRef) {}

  public static id;
  public static recurringEventId;
  public static title;
  public static start;
  public static end;

  id = EditEventComponent.id;
  recurringEventId = EditEventComponent.recurringEventId;
  title = EditEventComponent.title;
  start = EditEventComponent.start;
  end = EditEventComponent.end;

  deleteEvent(){
    GoogleCalendarIntegrationComponent.deleteEvent(this.id)
    this.bsModalRef.hide()
    window.location.reload();
  }

  deleteAllEvents(){
    GoogleCalendarIntegrationComponent.deleteAll(this.recurringEventId)
    this.bsModalRef.hide()
    window.location.reload();
  }

  // editEvent(){
  //   GoogleCalendarIntegrationComponent.editEvent()
  //   this.bsModalRef.hide()
  //   window.location.reload();
  // }




}
