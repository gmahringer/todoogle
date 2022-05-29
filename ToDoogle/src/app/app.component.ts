import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GoogleCalendarIntegrationComponent} from "./google-calendar-integration/google-calendar-integration.component";
import * as myGlobals from 'globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Login';

  user: gapi.auth2.GoogleUser | undefined

  pre: ''
  public static isSignedIn : boolean;

  constructor() {
  }

  ngOnInit(): void{
  }

  isSigned(): boolean{
    return AppComponent.isSignedIn
  }



}
