import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Place } from './place.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Place>;

@Injectable()
export class PlaceService {

    private resourceUrl =  SERVER_API_URL + 'api/places';

    constructor(private http: HttpClient) { }

    create(place: Place): Observable<EntityResponseType> {
        const copy = this.convert(place);
        return this.http.post<Place>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(place: Place): Observable<EntityResponseType> {
        const copy = this.convert(place);
        return this.http.put<Place>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Place>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Place[]>> {
        const options = createRequestOption(req);
        return this.http.get<Place[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Place[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Place = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Place[]>): HttpResponse<Place[]> {
        const jsonResponse: Place[] = res.body;
        const body: Place[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Place.
     */
    private convertItemFromServer(place: Place): Place {
        const copy: Place = Object.assign({}, place);
        return copy;
    }

    /**
     * Convert a Place to a JSON which can be sent to the server.
     */
    private convert(place: Place): Place {
        const copy: Place = Object.assign({}, place);
        return copy;
    }
}
