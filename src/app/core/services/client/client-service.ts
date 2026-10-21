import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environnement/environnement';
import { Observable } from 'rxjs';
import { Client } from '../../../pages/sections/client/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private http = inject(HttpClient);
  private apiUrl = environment.BASE_API+"/client";

  // Récupérer tous les client
  getAll(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // Récupérer un client unique par son ID
  getById(id: number): Observable<Client>{
    return this.http.get<Client>(`${this.apiUrl}/${id}`)
  }

}
