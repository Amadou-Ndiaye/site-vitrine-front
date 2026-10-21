import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environnement/environnement';
import { Observable } from 'rxjs';
import { Faq } from '../../models/faq';

@Injectable({
  providedIn: 'root',
})
export class FaqService {

  private http = inject(HttpClient);
  private apiUrl = environment.BASE_API+"/faq";

  // Récupérer tous les client
  getAll(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // Récupérer un faq unique par son ID
    getById(id: number): Observable<Faq>{
      return this.http.get<Faq>(`${this.apiUrl}/${id}`)
    }

}
