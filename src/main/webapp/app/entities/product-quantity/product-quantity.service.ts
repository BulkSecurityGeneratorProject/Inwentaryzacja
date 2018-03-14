import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductQuantity } from './product-quantity.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductQuantity>;

@Injectable()
export class ProductQuantityService {

    private resourceUrl =  SERVER_API_URL + 'api/product-quantities';

    constructor(private http: HttpClient) { }

    create(productQuantity: ProductQuantity): Observable<EntityResponseType> {
        const copy = this.convert(productQuantity);
        return this.http.post<ProductQuantity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productQuantity: ProductQuantity): Observable<EntityResponseType> {
        const copy = this.convert(productQuantity);
        return this.http.put<ProductQuantity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductQuantity>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductQuantity[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductQuantity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductQuantity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductQuantity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductQuantity[]>): HttpResponse<ProductQuantity[]> {
        const jsonResponse: ProductQuantity[] = res.body;
        const body: ProductQuantity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductQuantity.
     */
    private convertItemFromServer(productQuantity: ProductQuantity): ProductQuantity {
        const copy: ProductQuantity = Object.assign({}, productQuantity);
        return copy;
    }

    /**
     * Convert a ProductQuantity to a JSON which can be sent to the server.
     */
    private convert(productQuantity: ProductQuantity): ProductQuantity {
        const copy: ProductQuantity = Object.assign({}, productQuantity);
        return copy;
    }
}
