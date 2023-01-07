import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {UserService} from '../../../../core/store/_services/user.service';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {environment} from '../../../../../environments/environment';

const currentYear = new Date().getFullYear();
const parseAdjust = (eventDate: string): Date => {
  const date = new Date(eventDate);
  date.setFullYear(currentYear);
  return date;
};

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-appointment-calender',
  templateUrl: './appointment-calender.component.html',
  styleUrls: ['./appointment-calender.component.css']
})
export class AppointmentCalenderComponent implements OnInit {
  baseURL = `${environment.baseUrl}`;
  userID = '';
  iURL = '';
  userData: any;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  @ViewChild('myNewModel') content: any;
  @ViewChild('myNewModel') openModal: ElementRef;

  appointmentTitle = '';
  appointmentDescription = '';
  appointmentTime = '';
  userName = '';
  userEmail = '';
  userPhone = '';
  userAddress = '';
  userState = '';
  userCity = '';

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '',
      a11yLabel: 'View',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    // {
    //   label: '<i class="fas fa-fw fa-trash-alt"></i>',
    //   a11yLabel: 'Delete',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter((iEvent) => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   },
    // },
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;

  constructor(private userService: UserService) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    if (this.userData !== null){
      this.userID = this.userData.id;
    }
    this.iURL = this.baseURL + 'public/js/appForm.js?dv=' + this.userID;
    this.getAllAppointments();
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // console.log(event);
    this.openModal.nativeElement.click();
    this.getAppointmentData(event);
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  getAppointmentData(event){
    this.userService.getAppointmentDetail(event.id).subscribe(res => {
      if (res.appointments !== ''){
        this.appointmentTitle = res.appointments.appointment_name;
        this.appointmentDescription = res.appointments.appointment_description;
        this.appointmentTime = res.appointments.appointment_time;
        this.userName = res.appointments.user_info.first_name;
        this.userEmail = res.appointments.user_info.email;
        this.userPhone = res.appointments.user_info.phone_number;
        this.userAddress = res.appointments.user_info.street_address;
        this.userState = res.appointments.user_info.state;
        this.userCity = res.appointments.user_info.city;
      }
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  getAllAppointments(){
    this.userService.getAppointments().subscribe(res => {
      if (res.appointments.length > 0){
        let i;
        for (i = 0; i < res.appointments.length; i++){
          res.appointments[i].id = res.appointments[i].id;
          res.appointments[i].title = res.appointments[i].appointment_name;
          // res.appointments[i].Description = res.appointments[i].appointment_description;
          res.appointments[i].start = parseAdjust(res.appointments[i].appointment_date);
          res.appointments[i].end = parseAdjust(res.appointments[i].appointment_date);
          res.appointments[i].color = colors.red;
          res.appointments[i].resizeable = {beforeStart: true, afterEnd: true};
          res.appointments[i].draggable = false;
          res.appointments[i].actions = this.actions;
          delete res.appointments[i].user_id;
          delete res.appointments.appointment_name;
          delete res.appointments.appointment_description;
          delete res.appointments.appointment_date;
          delete res.appointments.appointment_date;
        }
        this.events = res.appointments;
      }
      // console.log(this.events);
    });
  }

}
