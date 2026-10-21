import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environnement/environnement';
import { Observable } from 'rxjs';
import { Contact } from '../../../pages/sections/contact/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private http = inject(HttpClient);
  private apiUrl = environment.BASE_API+"/contact";

  // Récupérer tous les contacts
  getAll(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // Récupérer un contact unique par son ID
  getById(id: number): Observable<Contact>{
    return this.http.get<Contact>(`${this.apiUrl}/${id}`)
  }

}
