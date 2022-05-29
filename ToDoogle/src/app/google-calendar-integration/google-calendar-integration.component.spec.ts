import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCalendarIntegrationComponent } from './google-calendar-integration.component';

describe('GoogleCalendarIntegrationComponent', () => {
  let component: GoogleCalendarIntegrationComponent;
  let fixture: ComponentFixture<GoogleCalendarIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleCalendarIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCalendarIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
