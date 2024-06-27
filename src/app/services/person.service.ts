import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/personas/'
  }

  getListPerson(): Observable<Person[]> {
   return this.http.get<Person[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  savePerson(person: Person): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,person)
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updatePerson(id: number, person: Person): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, person);
  }
}
