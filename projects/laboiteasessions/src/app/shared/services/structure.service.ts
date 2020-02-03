import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Structure } from '../interfaces/structure';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  private secureStructureUrl = `${environment.middleware}/v1/restricted/structures`;

  constructor(private http: HttpClient) {
  }

  getUserStructures(): Observable<Structure> {
    return this.http.get<Structure>(this.secureStructureUrl);
  }

  patch(id: string, structure: Structure): Observable<Response> {
    const url = `${this.secureStructureUrl}/${id}`;
    return this.http.patch<Response>(url, JSON.stringify(structure));
  }
}
