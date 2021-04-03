import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlimentoTaco } from './alimentoTaco.module';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _snack : MatSnackBar) { }

  findAll(): Observable<AlimentoTaco[]> {
    const url = `${this.baseUrl}/alimentos`;
    return this.http.get<AlimentoTaco[]>(url)    
  }
  
  findById(codigo: String) : Observable<AlimentoTaco>{
    const url = `${this.baseUrl}/alimentos/${codigo}`;
    return this.http.get<AlimentoTaco>(url);
  }

  create(alimento: AlimentoTaco): Observable<AlimentoTaco[]> {
    const url = `${this.baseUrl}/alimentos`;
    return this.http.post<AlimentoTaco[]>(url, alimento)
  }
  delete(codigo: String) : Observable<void>{
    const url = `${this.baseUrl}/alimentos/${codigo}`
    return this.http.delete<void>(url)
  }

  mensagem(str : String): void{
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
