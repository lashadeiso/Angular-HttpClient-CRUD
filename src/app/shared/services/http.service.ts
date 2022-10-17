import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student.model';
import { map } from 'rxjs/operators';
import { DataComunicationService } from './data-comunication.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private dataComunication: DataComunicationService
  ) {}

  get(): Observable<any> {
    return this.httpClient.get(`${environment.jsonBaseUrl}`);
  }

  post(studentItem: NgForm): Observable<any> {
    let itemHeader = new HttpHeaders({ 'content-type': 'application/json' });
    return this.httpClient.post(environment.jsonBaseUrl, studentItem.value, {
      headers: itemHeader,
    });
  }

  update(studentItem: Student): Observable<any> {
    let itemHeader = new HttpHeaders({ 'content-type': 'application/json' });
    return this.httpClient
      .put<any>(`${environment.jsonBaseUrl}/${studentItem.id}`, studentItem, {
        headers: itemHeader,
      })
      .pipe(
        map((res) => {
          this.dataComunication.updateStudentEmitter.emit();
          return res;
        })
      );
  }

  delete(id: number): Observable<any> {
    let itemHeader = new HttpHeaders({ 'content-type': 'application/json' });
    return this.httpClient
      .delete(`${environment.jsonBaseUrl}/${id}`, { headers: itemHeader })
      .pipe(
        map((res) => {
          this.dataComunication.deleteEmitter.emit();
          return res;
        })
      );
  }
}
