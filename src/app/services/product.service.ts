import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map, take, takeUntil, switchMap, filter, retry } from 'rxjs/operators';
import { Bus } from '../classes/bus';

export class ProductApi {
  base: string;
  getAllUrl: string;
  getByIdUrl: string;

  constructor() {
    this.base = 'https://hubspectacles.zento.fr/api/v1';
    this.getAllUrl = `${this.base}/filter`;
    this.getByIdUrl = `${this.base}/product-details`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productApi = new ProductApi;
  _ready$: BehaviorSubject<boolean>;
  ready$: Observable<boolean>;
  products: any[];
  aggregat: {[key: string]: any} = {};

  constructor(public client: HttpClient) {
    this._ready$ = new BehaviorSubject(false);
    this.ready$ = this._ready$.asObservable().pipe(
      filter(ready => ready ? true : false)
    );
    this.init();
  }

  init() {
    const s = this.initAll().subscribe(
      response => {
        this.products = response;
      },
      error => {
        console.error(error);
        s.unsubscribe();
      },
      () => {
        this._ready$.next(true);
        s.unsubscribe();
      }
    );
  }

  initAll(): Observable<any[]> {
    return this.client.get<any[]>(this.productApi.getAllUrl).pipe(retry(5));
  }
  initById(id: string): Observable<any> {
    return this.client.get(`${this.productApi.getByIdUrl}/${id}`).pipe(
      tap((details: any) => this.aggregat[id] = { id, details, product: this.products.find(p => p.produit === id)}),
      switchMap(() => of(this.aggregat[id]))
    );
  }

  getAll(): Observable<any[]> {
    return this.ready$.pipe(switchMap(() => of(this.products)));
  }

  getById(id: string): Observable<any> {
    const stream$ = this.aggregat[id] ? of(this.aggregat[id]) : this.initById(id);
    return this.ready$.pipe(switchMap(() => stream$));
  }

  getAllByType(type: string): Observable<any[]> {
    return this.getAll().pipe(
      map((response: any[]) => response.filter(product => product.type === type))
    );
  }

  getAllManifestations(): Observable<any[]> {
    return this.getAllByType('manifestation');
  }

  getAllGroupes(): Observable<any[]> {
    return this.getAllByType('groupe');
  }

  getProductsForGroupe(id: string): Observable<any[]> {
    return this.getById(id).pipe(
      switchMap((aggregat) => of((aggregat.product.sousProduit
        ? aggregat.product.sousProduit
        : aggregat.product.sousProduits)
        .map(pid => this.products.find(p => p.produit === pid))
      ))
    );
  }

  getAllBySousThemes(sousThemes: string[]): Observable<any[]> {
    return this.getAll().pipe(
      map((response: any[]) => response.filter(
        product => sousThemes.some(
          sousTheme => product.flatCodeSoustheme.some(
            productSousTheme => productSousTheme === sousTheme
      ))))
    );
  }

  getAllByEvtTimestamp(evtTimestamps: string[]): Observable<any[]> {
    return this.getAll().pipe(
      map((response: any[]) => response.filter(
        product => evtTimestamps.some(
          evtTimestamp => product.evtTimestamps === evtTimestamp
      )))
    );
  }

  getAllByEventInrange(eventInranges: string[]): Observable<any[]> {
    return this.getAll().pipe(
      map((response: any[]) => response.filter(
        product => eventInranges.some(
          eventInrange => Object.keys(product.eventInrange ? product.eventInrange : []).some(
            productEventInrange => productEventInrange === eventInrange
      ))))
    );
  }

}
