import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { HeaderService, AppHeaderRow } from './services/header.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  headerColor = 'primary';
  rows$: Observable<AppHeaderRow[]>;

  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  messages: any[] = [
    {
      from: 'Photos',
      subject: '1/28/16',
      content: 'Kitchen Remodel',
      src: 'assets/imgs/favicon.ico'
    },
    {
      from: 'Photos',
      subject: '1/28/16',
      content: 'Kitchen Remodel',
      src: 'assets/imgs/favicon.ico'
    },
    {
      from: 'Photos',
      subject: '1/28/16',
      content: 'Kitchen Remodel',
      src: 'assets/imgs/favicon.ico'
    },
    {
      from: 'Photos',
      subject: '1/28/16',
      content: 'Kitchen Remodel',
      src: 'assets/imgs/favicon.ico'
    }
  ];

  @ViewChild('menuFolders') menuFolders: ElementRef;
  @ViewChild('menuAvatars') menuAvatars: ElementRef;
  menu: ElementRef;

  productSubscription: Subscription;

  constructor(public headerService: HeaderService, public productService: ProductService) {
  }

  ngOnInit() {
    this.rows$ = this.headerService.headerRows.data$;
    this.menu = this.menuFolders;

    this.productSubscription = this.productService.getAll().subscribe(
      (response: any) => {
        console.log('Got Product Response: ', response);
      },
      (error: Error) => {
        console.log('Got Product Error: ', error);
      },
      () => {
        console.log('Got Product completion');
      }
    );

  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  rowClicked($event) {
    console.log('Row clicked: ', $event);
  }

  actionClicked($event) {
    console.log('Action clicked: ', $event);
    this.menu = this.menu === this.menuFolders ? this.menuAvatars : this.menuFolders;
  }

}
