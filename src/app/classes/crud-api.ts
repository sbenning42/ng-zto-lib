import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CrudApi {

    remote: {
        readAll: () => Observable<any>,
        readByID: (id: number|string) => Observable<any>,
        create: (item: any) => Observable<any>,
        updateByID: (id: number|string, item: any) => Observable<any>,
        deleteByID: (id: number|string) => Observable<any>
    } = {readAll: undefined, readByID: undefined, create: undefined, updateByID: undefined, deleteByID: undefined};
    access: {
        readAll: (response: any) => any[],
        readByID: (response: any) => any,
        create: (response: any) => any,
        updateByID: (response: any) => any,
        deleteByID: (response: any) => any
    } = {readAll: undefined, readByID: undefined, create: undefined, updateByID: undefined, deleteByID: undefined};

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
        this.remote.readAll = () => remote.readAll().pipe(
            map((response: any) => access.readAll(response))
        );
        this.remote.readByID = (id: number|string) => remote.readByID(id).pipe(
            map((response: any) => access.readByID(response))
        );
        this.remote.create = (item: any) => remote.create(item).pipe(
            map((response: any) => access.create(response))
        );
        this.remote.updateByID = (id: number|string, item: any) => remote.updateByID(id, item).pipe(
            map((response: any) => access.updateByID(response))
        );
        this.remote.deleteByID = (id: number|string) => remote.deleteByID(id).pipe(
            map((response: any) => access.deleteByID(response))
        );
    }
}
