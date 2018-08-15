import { Injectable } from '@angular/core';
import { Bus } from '../classes/bus';

export class AppHeaderAction {
  name?: string;
  icon?: string;
  color?: string;
  handler?: ($event: Event, action: AppHeaderAction, index: number) => void;
}

export class AppHeaderRow {
  title?: string;
  leftActions?: AppHeaderAction[];
  rightActions?: AppHeaderAction[];
  color?: string;
  handler?: ($event: Event, row: AppHeaderRow, index: number) => void;
}

export class AppHeaderRowClickEvent {
  $event: Event;
  row: AppHeaderRow;
  index: number;
}

export class AppHeaderActionClickEvent {
  $event: Event;
  action: AppHeaderAction;
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerRows: AppHeaderRow[] = [
    {
      title: 'Zen\'to',
      handler: ($event, row, index) => console.log('Hello ', row.title),
      leftActions: [
        {
          name: 'Components',
          icon: 'code',
          handler: ($event, action, index) => console.log('Hello ', action.name),
        },
        {
          name: 'Services',
          icon: 'build',
          handler: ($event, action, index) => console.log('Hello ', action.name),
        }
      ],
      rightActions: [
        {
          name: 'About',
          icon: 'home',
          handler: ($event, action, index) => console.log('Hello ', action.name),
        },
        {
          name: 'Contact',
          icon: 'share',
          handler: ($event, action, index) => console.log('Hello ', action.name),
        }
      ]
    },
  ];
  headerRows: Bus<AppHeaderRow[]>;
  constructor() {
    this.headerRows = new Bus(this._headerRows);
  }
}
