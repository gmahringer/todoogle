import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent {

  constructor(public bsModalRef: BsModalRef) {}

  public static title;
  public static start;
  public static end;

  title = EditEventComponent.title;
  start = EditEventComponent.start;
  end = EditEventComponent.end;



}
