import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export class Bus<T> {

    private _data$: Observable<T>;
    private _source: BehaviorSubject<T>;

    constructor(public lastData: T) {
        this._source = new BehaviorSubject(lastData);
        this._data$ = this._source.asObservable().pipe(tap(data => this.lastData = data));
    }

    get data$(): Observable<T> {
        return this._data$;
    }

    set source(data: T) {
        this._source.next(data);
    }
}
