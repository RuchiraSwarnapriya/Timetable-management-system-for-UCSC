import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import * as Chartist from 'chartist';
import { extend } from '@syncfusion/ej2-base';
import {Internationalization} from '@syncfusion/ej2-base';
import {eventsData1Y,eventsData2Y,eventsData3Y,eventsData4Y} from '../datasource';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


import {
  EventSettingsModel, ScheduleComponent, WorkWeekService, PopupOpenEventArgs, ResizeService, DragAndDropService,EJ2Instance,CellClickEventArgs,EventClickArgs, 
} from '@syncfusion/ej2-angular-schedule';
import { TimeTableCRUDService } from 'app/shared/time-table-crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [WorkWeekService,DragAndDropService,ResizeService]
  
})
export class DashboardComponent implements OnInit {

  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings1Y: EventSettingsModel = { dataSource: <Object[]>extend([], eventsData1Y, null, true) };
  public eventSettings2Y: EventSettingsModel = { dataSource: <Object[]>extend([], eventsData2Y, null, true) };
  public eventSettings3Y: EventSettingsModel = { dataSource: <Object[]>extend([], eventsData3Y, null, true) };
  public eventSettings4Y: EventSettingsModel = { dataSource: <Object[]>extend([], eventsData4Y, null, true) };
  public showHederBar: Boolean = false;
  public views: Array<String> = ['WorkWeek'];
  public showTimeIndicator: boolean = false;
  public showQuickInfo: boolean = false;
  public eventSettings: EventSettingsModel = {
    dataSource: eventsData1Y,
    fields: {
        id: 'Id',
        subject: { name: 'Subject', title: 'Event Name' },
        location: { name: 'Location', title: 'Event Location'},
        description: { name: 'Description', title: 'Event Description' },
        startTime: { name: 'StartTime', title: 'Start Duration' },
        endTime: { name: 'EndTime', title: 'End Duration'  }
    }
};

  

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public instance: Internationalization = new Internationalization();

  onCellClick(args: CellClickEventArgs): void {
    this.scheduleObj.openEditor(args, 'Add');
  }
  onEventClick(args: EventClickArgs): void {
    if (!(args.event as any).RecurrenceRule) {
      this.scheduleObj.openEditor(args.event, 'Save');
    }
    else {
      this.scheduleObj.quickPopup.openRecurrenceAlert();
    }
  }

  getDateHeaderText(value: Date): string {
    return this.instance.formatDate(value, { skeleton: 'E' });
  }
  onPopupOpen(args: PopupOpenEventArgs): void {

    if (args.type === 'Editor') {

            let start: DateTimePicker = (args.element.querySelector('.e-start') as EJ2Instance).ej2_instances[0] as DateTimePicker;
            start.format = "EEEE, h:mm";
            start.dataBind();
            let end: DateTimePicker = (args.element.querySelector('.e-end') as EJ2Instance).ej2_instances[0] as DateTimePicker;
            end.format = "EEEE, h:mm";
            end.dataBind();
            args.element.querySelectorAll('.e-round').forEach((node: HTMLElement, index: number) => {
            if (index === 0 || index === 6) {
            node.style.display = 'none';
        }
      });

      
}
    }
  

  constructor(private ttcs:TimeTableCRUDService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  onDataBound1Y(){
    let json1Y = JSON.stringify(this.eventSettings1Y.dataSource);
    console.log(json1Y);
    this.ttcs.insertobject(json1Y)
  }

  onDataBound2Y(){
    let json2Y = JSON.stringify(this.eventSettings2Y.dataSource);
    console.log(json2Y);
  }

  onDataBound3Y(){
    let json3Y = JSON.stringify(this.eventSettings3Y.dataSource);
    console.log(json3Y);
  }

  onDataBound4Y(){
    let json4Y = JSON.stringify(this.eventSettings4Y.dataSource);
    console.log(json4Y);
  }

  ngOnInit() {}
}
