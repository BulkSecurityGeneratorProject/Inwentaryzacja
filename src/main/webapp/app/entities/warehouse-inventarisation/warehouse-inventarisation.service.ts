import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WarehouseInventarisation } from './warehouse-inventarisation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WarehouseInventarisation>;

@Injectable()
export class WarehouseInventarisationService {

    private resourceUrl =  SERVER_API_URL + 'api/warehouse-inventarisations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(warehouseInventarisation: WarehouseInventarisation): Observable<EntityResponseType> {
        const copy = this.convert(warehouseInventarisation);
        return this.http.post<WarehouseInventarisation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(warehouseInventarisation: WarehouseInventarisation): Observable<EntityResponseType> {
        const copy = this.convert(warehouseInventarisation);
        return this.http.put<WarehouseInventarisation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WarehouseInventarisation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WarehouseInventarisation[]>> {
        const options = createRequestOption(req);
        return this.http.get<WarehouseInventarisation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WarehouseInventarisation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WarehouseInventarisation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WarehouseInventarisation[]>): HttpResponse<WarehouseInventarisation[]> {
        const jsonResponse: WarehouseInventarisation[] = res.body;
        const body: WarehouseInventarisation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WarehouseInventarisation.
     */
    private convertItemFromServer(warehouseInventarisation: WarehouseInventarisation): WarehouseInventarisation {
        const copy: WarehouseInventarisation = Object.assign({}, warehouseInventarisation);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(warehouseInventarisation.date);
        return copy;
    }

    /**
     * Convert a WarehouseInventarisation to a JSON which can be sent to the server.
     */
    private convert(warehouseInventarisation: WarehouseInventarisation): WarehouseInventarisation {
        const copy: WarehouseInventarisation = Object.assign({}, warehouseInventarisation);
        copy.date = this.dateUtils
            .convertLocalDateToServer(warehouseInventarisation.date);
        return copy;
    }
}
