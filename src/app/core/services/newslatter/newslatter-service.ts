import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environnement/environnement';
import { Observable } from 'rxjs';
import { Newslatter } from '../../models/newslatter';

@Injectable({
  providedIn: 'root',
})
export class NewslatterService {

  private http = inject(HttpClient);
  private apiUrl = environment.BASE_API+"/newslatter";

  // Récupérer tous les client
  getAll(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // Récupérer un newslatter unique par son ID
    getById(id: number): Observable<Newslatter>{
      return this.http.get<Newslatter>(`${this.apiUrl}/${id}`)
    }

}
