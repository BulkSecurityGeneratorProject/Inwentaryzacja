import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Inventarisation } from './inventarisation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Inventarisation>;

@Injectable()
export class InventarisationService {

    private resourceUrl =  SERVER_API_URL + 'api/inventarisations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(inventarisation: Inventarisation): Observable<EntityResponseType> {
        const copy = this.convert(inventarisation);
        return this.http.post<Inventarisation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inventarisation: Inventarisation): Observable<EntityResponseType> {
        const copy = this.convert(inventarisation);
        return this.http.put<Inventarisation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Inventarisation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Inventarisation[]>> {
        const options = createRequestOption(req);
        return this.http.get<Inventarisation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Inventarisation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Inventarisation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Inventarisation[]>): HttpResponse<Inventarisation[]> {
        const jsonResponse: Inventarisation[] = res.body;
        const body: Inventarisation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Inventarisation.
     */
    private convertItemFromServer(inventarisation: Inventarisation): Inventarisation {
        const copy: Inventarisation = Object.assign({}, inventarisation);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(inventarisation.date);
        return copy;
    }

    /**
     * Convert a Inventarisation to a JSON which can be sent to the server.
     */
    private convert(inventarisation: Inventarisation): Inventarisation {
        const copy: Inventarisation = Object.assign({}, inventarisation);
        copy.date = this.dateUtils
            .convertLocalDateToServer(inventarisation.date);
        return copy;
    }
}
