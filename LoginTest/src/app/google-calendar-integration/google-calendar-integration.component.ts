import {Component, NgZone, OnInit} from '@angular/core';
import {calendar_v3} from "@googleapis/calendar";
import {CalendarOptions, FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import * as myGlobals from 'globals';
import {AppComponent} from "../app.component";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@Component({
  selector: 'app-google-calendar-integration',
  templateUrl: './google-calendar-integration.component.html',
  styleUrls: ['./google-calendar-integration.component.scss']
})

export class GoogleCalendarIntegrationComponent implements OnInit {
  isSignedIn = false;
  pre = '';
  description: String;
  title: String;
  startDate: String;
  dueDate: String;
  //todos: any[] = this.listUpcomingEvents(); //!!
  //calendarId: String;

  constructor(private zone: NgZone) {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2022-05-11' },
      { title: 'event 2', date: '2022-05-12' }
    ]
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  initClient() {
    const updateSigninStatus = this.updateSigninStatus.bind(this);
    gapi.client
        .init({
          apiKey: 'AIzaSyAp_Insk0JjH4oxZ4I0-PLIydIno9jZEZ8',
          clientId:
              '507232289390-bbo3sbk9t7op0utpakhfc8juman0g025.apps.googleusercontent.com',
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: 'https://www.googleapis.com/auth/calendar',
        })
        .then(() => {
          this.zone.run(() => {

            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          });
        });
    /*this.calendarId = gapi.client['calendar'].calendarId;
    this.appendPre(this.calendarId);*/
  }

  updateSigninStatus(isSignedIn) {
    console.log('updateSigninStatus', isSignedIn);
    this.isSignedIn = isSignedIn;
    AppComponent.isSignedIn = isSignedIn;
    if (isSignedIn) {
      this.listUpcomingEvents();
    }
  }

  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }


  static addEvent(title,description,startDate, dueDate) {
    startDate = startDate.toString() + ':00+01:00'
    dueDate = dueDate.toString() + ':00+01:00'
    let event: calendar_v3.Schema$Event = {
      summary: title,
      description: description,
      start: {
        dateTime: startDate,
        timeZone: 'Europe/Vienna'
      },
      end: {
        dateTime: dueDate,
        timeZone: 'Europe/Vienna'
      },
    }

    let request = gapi.client['calendar'].events.insert({
      calendarId: 'primary',
      resource: event
    });

    request.execute(function(event) {
    });
  }

  listUpcomingEvents() {
    let events;
    const appendPre = this.appendPre.bind(this);
    gapi.client['calendar'].events
        .list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime',
        })
        .then((response) => {
          this.zone.run(() => {
            events = response.result.items;
            //appendPre('Upcoming events:');

            if (events.length > 0) {
              for (const event of events) {
                let when = event.start.dateTime;
                if (!when) {
                  when = event.start.date;
                }
                //appendPre(event.summary + ' (' + when + ')');
              }
            } else {
              //appendPre('No upcoming events found.');
            }
          });
        });
    //appendPre(gapi.client['calendar'].calendarId);
    return events;
  }

  appendPre(text) {
    this.pre += text + '\n';
  }

  loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    window.document.body.appendChild(script);
    return new Promise<void>((resolve, reject) => {
      script.addEventListener('error', (error) => reject(error));
      script.addEventListener('load', () => resolve());
    });
  }

  async ngOnInit() {
    await this.loadGapi();
    gapi.load('client:auth2', this.initClient.bind(this));
  }


}

