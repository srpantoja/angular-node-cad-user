import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public baseURL: string;
    public headersOptions: HttpHeaders;
    constructor(private http: HttpClient) {
        this.headersOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers':
                'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        });
        this.baseURL = 'http://localhost:3333';
    }

    create(user: User): Observable<Object> {
        const response = this.http.post(this.baseURL + '/users', user, {
            headers: this.headersOptions,
        });

        return response;
    }

    getAll(): Observable<Object> {
        const response = this.http.get(this.baseURL + '/users');

        return response;
    }

    getCep(cep: string): Observable<Object> {
        const response = this.http.get(`https://cep.awesomeapi.com.br/json/${cep}`);

        return response;
    }
}
