# todoogle
ToDo Applikation mit Google Kalender Synchronisierung

Voraussetzungen für die Ausführung der Applikation:
- Node.js installieren
- Angular Cli installieren - dies erfordert die Ausführung von **npm install -g @angular/cli** im Terminal.

Danach kann die Applikation immer mit ng serve gestartet werden:
1. Zum ToDoogle Projektordner (innerhalb der todoogle Hauptordner) navigieren, um die Anwendung auf einem Entwicklungsserver auszuführen
2. Im Terminal den Befehl **ng serve** ausführen
3. Zu http://localhost:4200/ navigieren, um die laufende Anwendung zu sehen

Die Applikation kann mit dem Google Konto getestet werden, das wir für dieses Projekt erstellt haben:

Email: todoogle94@gmail.com
Passwort: todoogletest321

**Refresh-Bugs in der Applikation:**
- Nach dem Einloggen muss man erst unter Übersicht auf Kalenderansicht klicken, damit die Termine auch in der Heute-Ansicht sichtbar sind, da die Termine aus dem Google-Kalender irgendwie erst nach dem Anklicken auf die Kalenderansicht geladen werden.
- Nach dem Löschen und Hinzufügen von Events muss man den Browser refreshen, damit die Events aus dem Google Calendar wieder in den unterschiedlichen Fullcalendar Ansichten (Alle Einträge, Kalenderansicht, Heute) angezeigt werden.
 
Leider konnten wir diese Reload Probleme aus Zeitgründen nicht im Code finden und lösen, aber die Funktionen funktionieren trotzdem, es muss nur refreshed werden.
