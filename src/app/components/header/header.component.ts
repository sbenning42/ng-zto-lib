import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  AppHeaderRow,
  AppHeaderRowClickEvent,
  AppHeaderActionClickEvent,
  AppHeaderAction
} from '../../services/header.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() rows$: Observable<AppHeaderRow[]>;
  @Input() color?: string;
  @Output() rowClick: EventEmitter<AppHeaderRowClickEvent> = new EventEmitter;
  @Output() actionClick: EventEmitter<AppHeaderActionClickEvent> = new EventEmitter;

  size;
  id;

  sub: Subscription;

  constructor(public el: ViewContainerRef, public productService: ProductService) { }

  ngOnInit() {
    this.sub = this.productService.getAllManifestations().subscribe(
      (response: any[]) => {
        this.size = response ? response.length : -1;
        this.id = response[0].produit;
      },
      (error: Error) => {
        console.log(error);
      },
      () => {
        this.sub.unsubscribe();
      },
    );
  }

  rowClicked($event: Event, row: AppHeaderRow, index: number) {
    this.rowClick.emit({$event, row, index});
    this.ngOnInit();
    if (row.handler) {
      row.handler($event, row, index);
    }
  }

  actionClicked($event: Event, action: AppHeaderAction, index: number) {
    this.actionClick.emit({$event, action, index});
    if (action.handler) {
      action.handler($event, action, index);
    }
    const s = this.productService.getAllByEventInrange(['20181010']).subscribe(r => {
      console.log('Got: ', r);
    }, e => { console.log('Got Err: ', e); }, () => {
      s.unsubscribe();
    });
  }

}
