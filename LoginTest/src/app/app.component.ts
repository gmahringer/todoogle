import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GoogleCalendarIntegrationComponent} from "./google-calendar-integration/google-calendar-integration.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LoginTest';

  user: gapi.auth2.GoogleUser | undefined

  pre: ''
  isSignedIn = false;

  constructor() {
  }

  ngOnInit(): void{
  }



}
