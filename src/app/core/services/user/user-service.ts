import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environnement/environnement';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = environment.BASE_API+"/user";

  // Récupérer tous les client
  getAll(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // Récupérer un newslatter unique par son ID
  getById(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

}
