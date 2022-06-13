import {Component, NgZone, OnInit} from '@angular/core';
import {calendar_v3} from "@googleapis/calendar";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {AppComponent} from "../app.component";
import {CalendarviewComponent} from "../calendarview/calendarview.component";
import {ListviewComponent} from "../listview/listview.component";
import {AllTodosComponent} from "../all-todos/all-todos.component";
import {Todo} from "../todo/todo";
import {SearchResultComponent} from "../search-result/search-result.component";


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

  static events: Todo[] = [];

  static addEventToList(id, title, start, end,recurring, description,created) {
    GoogleCalendarIntegrationComponent.events.push({
      creationDate: created,
      recurrence: recurring,
      id: id,
      title: title,
      description: description,
      startDate: start,
      dueDate: end});
  }

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


  static addEvent(title,description,startDate,dueDate,recurrence) {
    startDate = startDate.toString() + ':00+02:00'
    dueDate = dueDate.toString() + ':00+02:00'
    let event: calendar_v3.Schema$Event
    if(recurrence.name === 'weekly'){
      event = {
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
        recurrence: ['RRULE:FREQ=WEEKLY']
      }
    }
    else if(recurrence.name === 'daily'){
      event = {
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
        recurrence: ['RRULE:FREQ=DAILY']
      }
    }
    else if(recurrence.name === 'monthly'){
      event = {
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
        recurrence: ['RRULE:FREQ=MONTHLY']
      }
    }
    else if(recurrence.name === 'yearly'){
      event = {
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
        recurrence: ['RRULE:FREQ=YEARLY']
      }
    }
    else{
      event = {
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
    }

    let request = gapi.client['calendar'].events.insert({
      calendarId: 'primary',
      resource: event
    });

    request.execute(function() {
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

  static deleteAll(groupId){
    let request = gapi.client['calendar'].events.delete({
      calendarId: 'primary',
      eventId: groupId
    });

    request.execute(function() {
    });
  }


  // /*sollte static sein*/
  // getEvent(){
  //   const appendPre = this.appendPre.bind(this);
  //   gapi.client['calendar'].events
  //       .get({
  //         calendarId: 'primary',
  //         eventId: 'akrqbtkph6jfv3n95l2nmvsp44'
  //       })
  //       .then((response) => {
  //         this.zone.run(() => {
  //           let e = response.result;
  //           appendPre(e.summary);
  //         });
  //       });
  // }


  // static editEvent() {
  //   let event = gapi.client['calendar'].events.get({
  //     calendarId: 'primary',
  //     eventId: 'akrqbtkph6jfv3n95l2nmvsp44'
  //   })
  //
  //   event.execute(function() {});
  //
  //   event.summary = 'exam change works'
  //
  //   let request =  gapi.client['calendar'].events.update({
  //     calendarId: 'primary',
  //     eventId: event.id,
  //     body: event
  //   })
  //
  //   request.execute(function() {
  //   });
  // }

  listUpcomingEvents() {
    let events;
    //const appendPre = this.appendPre.bind(this);
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
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  CalendarviewComponent.addEvent(event.id, event.summary, event.start.date, event.end.date,event.recurringEventId);
                }
                else {
                  CalendarviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  ListviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                else {
                  ListviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  AllTodosComponent.addEvent(event.id,event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                else {
                  AllTodosComponent.addEvent(event.id,event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  GoogleCalendarIntegrationComponent.addEventToList(event.id, event.summary, event.start.date, event.end.date,event.recurringEventId,event.description, event.created);
                }
                else {
                  GoogleCalendarIntegrationComponent.addEventToList(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId,event.description, event.created);
                }
                let when = event.start.dateTime;
                if (!when) {
                  when = event.start.date;
                }
                //appendPre(event.summary + ' (' + when + ')' + 'recID' + event.recurringEventId + ' norm ID' + event.id);
              }
            } else {
              //appendPre('No upcoming events found.');
            }
          });
        });
  }

  static searchEvents(keyword) {
    if (GoogleCalendarIntegrationComponent.events.length > 0) {
      for (const event of GoogleCalendarIntegrationComponent.events) {
        if (event.title.includes(keyword)) {
          SearchResultComponent.addEvent(event.id, event.title, event.startDate, event.dueDate,event.recurrence);
        }
      }
    }
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

