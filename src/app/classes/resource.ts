import { Bus } from './bus';
import { CrudApi } from './crud-api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class Resource {

    bus: Bus<{id: number|string, data: any}[]>;

    constructor(public api: CrudApi) {
        this.bus = new Bus([]);
    }

    readAll(): Observable<any> {
        return this.api.remote.readAll().pipe(tap((response: any[]) => {}));
    }

    readById(id: number|string): Observable<any> {
        return this.api.remote.readByID(id).pipe(tap((response: any) => {}));
    }

    create(item: any): Observable<any> {
        return this.api.remote.create(item).pipe(tap((response: any) => {}));
    }

    updateById(id: number|string, item: any): Observable<any> {
        return this.api.remote.updateByID(id, item).pipe(tap((response: any) => {}));
    }

    deleteById(id: number|string): Observable<any> {
        return this.api.remote.deleteByID(id).pipe(tap((response: any) => {}));
    }

}

export class ResourceFactory {
    constructor(
        remote: {
            readAll: () => Observable<any>,
            readByID: (id: number|string) => Observable<any>,
            create: (item: any) => Observable<any>,
            updateByID: (id: number|string, item: any) => Observable<any>,
            deleteByID: (id: number|string) => Observable<any>
        },
        access: {
            readAll: (response: any) => any[],
            readByID: (response: any) => any,
            create: (response: any) => any,
            updateByID: (response: any) => any,
            deleteByID: (response: any) => any
        }
    ) {
        const api = new CrudApi(remote, access);
        return new Resource(api);
    }
}
