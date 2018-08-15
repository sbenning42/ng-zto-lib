import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-side-menu-nav',
  templateUrl: './side-menu-nav.component.html',
  styleUrls: ['./side-menu-nav.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ]),
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
        }))
      ])
    ])
  ],
})
export class SideMenuNavComponent implements OnInit {

  opened = true;
  events: string[] = [];

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  _menu: NgTemplateOutlet;
  @Input()
    get menu(): NgTemplateOutlet {
      return this._menu;
    }
    set menu(menu: NgTemplateOutlet) {
      let wasOpen = false;
      if (this.sidenav.opened) {
        this.sidenav.close();
        wasOpen = true;
      }
      if (wasOpen) {
        setTimeout(() => {
          this._menu = menu;
          this.sidenav.open();
        }, 100);
      }
    }

  _content: NgTemplateOutlet;
  @Input()
    get content(): NgTemplateOutlet {
      return this._content;
    }
    set content(content: NgTemplateOutlet) {
      let wasOpen = false;
      if (this.sidenav.opened) {
        this.sidenav.close();
        wasOpen = true;
      }
      if (wasOpen) {
        setTimeout(() => {
          this._content = content;
          this.sidenav.open();
        }, 100);
      }
    }

  constructor() {}

  ngOnInit() {
  }

}
