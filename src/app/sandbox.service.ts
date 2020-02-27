import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:8080/sand-box';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SandboxService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieve list of City according the pagination parameter.
   * 
   * @param page the page number location
   * @param size the City elements by page
   */
  getCities(page: number, size: number): Observable<any> {
    return this.http.get(endpoint + '/cities/queryByPage?page=' + page + '&size=' + size, httpOptions);
  }
}
