import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './page';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    })
};

export abstract class CrudService<T, ID> {

    constructor(protected url: string, protected http: HttpClient) {
    }

    protected getUrl(): string {
        return this.url;
    }

    findAll(): Observable<T[]> {
        const url = `${this.getUrl()}`;
        return this.http.get<T[]>(url);
    }

    findPageable(page: number, size: number, order?: string, asc?: boolean): Observable<Page<T>> {
        let url =
            `${this.getUrl()}/page?page=${page}$size=${size}`;
        if (order) {
            url += `&order=${order}`;
        }
        if (asc !== undefined) {
            url += `&asc=${asc}`;
        }
        return this.http.get<Page<T>>(url);
    }

    getTotalRecords(): Observable<number> {
        const url = `${this.getUrl()}/count`;
        return this.http.get<number>(url);
    }

    save(t: T): Observable<T> {
        const url = `${this.getUrl()}`;
        return this.http.post<T>(url, JSON.stringify(t), httpOptions);
    }

    findOne(id: ID): Observable<T> {
        const url = `${this.getUrl()}/${id}`;
        return this.http.get<T>(url);
    }

    delete(id: ID): Observable<void> {
        const url = `${this.getUrl()}/${id}`;
        return this.http.delete<void>(url);
    }

    exists(id: ID): Observable<boolean> {
        const url = `${this.getUrl()}/${id}`;
        return this.http.get<boolean>(url);
    }
}
