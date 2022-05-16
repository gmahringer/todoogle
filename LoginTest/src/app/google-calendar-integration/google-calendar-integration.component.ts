import {Component, NgZone, OnInit} from '@angular/core';
import {calendar_v3} from "@googleapis/calendar";
import {CalendarOptions, FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import * as myGlobals from 'globals';
import {AppComponent} from "../app.component";
import {CalendarviewComponent} from "../calendarview/calendarview.component";
import {ListviewComponent} from "../listview/listview.component";
import {AllTodosComponent} from "../all-todos/all-todos.component";


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
    this.listUpcomingEvents();
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
    this.listUpcomingEvents();
  }

  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }


  static addEvent(title,description,startDate, dueDate) {
    startDate = startDate.toString() + ':00+02:00'
    dueDate = dueDate.toString() + ':00+02:00'
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

  static deleteEvent(id){
    let request = gapi.client['calendar'].events.delete({
      calendarId: 'primary',
      eventId: id
    });

    request.execute(function() {
    });
  }

  // editEvent() {
  //   let event: calendar_v3.Schema$Event = gapi.client['calendar'].events.get({
  //     calendarId: 'primary',
  //     eventId: 'u9obmihs83jf0dfb5iot0j2cf0'
  //   })
  //
  //   let request = gapi.client['calendar'].events.update({
  //     calendarId: 'primary',
  //     eventId: 'u9obmihs83jf0dfb5iot0j2cf0',
  //     summary: 'new edit test'
  //   })
  //
  //   request.execute(function() {
  //   });
  // }

  listUpcomingEvents() {
    let events;
    const appendPre = this.appendPre.bind(this);
    gapi.client['calendar'].events
        .list({
          calendarId: 'primary',
          showDeleted: false,
          singleEvents: true,
          orderBy: 'startTime',
        })
        .then((response) => {
          this.zone.run(() => {
            events = response.result.items;
            //appendPre('Upcoming events:');

            if (events.length > 0) {
              for (const event of events) {
                CalendarviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime);
                ListviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime);
                AllTodosComponent.addEvent(event.id,event.summary, event.start.dateTime, event.end.dateTime);
                let when = event.start.dateTime;
                if (!when) {
                  when = event.start.date;
                }
                //appendPre(event.summary + ' (' + when + ')' + event.end.dateTime);
              }
            } else {
              //appendPre('No upcoming events found.');
            }
          });
        });
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

