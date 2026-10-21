import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environnement/environnement';
import { Observable } from 'rxjs';
import { ServiceRea } from '../../models/serviceRea';

@Injectable({
  providedIn: 'root',
})
export class ServiceREAService {

  private http = inject(HttpClient);
  private apiUrl = environment.BASE_API+"/services";

  // Récupérer tous les client
  getAll(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  
  // Récupérer un Service unique par son ID
    getById(id: number): Observable<ServiceRea>{
      return this.http.get<ServiceRea>(`${this.apiUrl}/${id}`)
    }

}
