import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httCliente: HttpClient
  ) { }

  get<T>(url:string, options: Options): Observable<T> {
    return this.httCliente.get<T>(url, options) as Observable<T>;
  }
}
