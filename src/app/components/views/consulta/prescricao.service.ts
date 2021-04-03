import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrescricaoDietetica } from './prescricao.model';

@Injectable({
  providedIn: 'root'
})
export class PrescricaoService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _snack : MatSnackBar) { }

  findAllByConsulta(id_con: Number): Observable<PrescricaoDietetica[]> {
    const url = `${this.baseUrl}/prescricoes?consulta=${id_con}`;
    return this.http.get<PrescricaoDietetica[]>(url)    
  }
  
  findById(codigo: number) : Observable<PrescricaoDietetica>{
    const url = `${this.baseUrl}/prescricoes/${codigo}`;
    return this.http.get<PrescricaoDietetica>(url);
  }

  update(prescricao: PrescricaoDietetica) : Observable<PrescricaoDietetica>{
    const url = `${this.baseUrl}/prescricoes/${prescricao.codigo}`
    return this.http.put<PrescricaoDietetica>(url, prescricao); //url e o corpo da requisição
  }

  create(prescricao: PrescricaoDietetica, id_con: number): Observable<PrescricaoDietetica[]> {
    const url = `${this.baseUrl}/prescricoes?consulta=${id_con}`;
    return this.http.post<PrescricaoDietetica[]>(url, prescricao)
  }
  delete(codigo: number) : Observable<void>{
    const url = `${this.baseUrl}/prescricoes/${codigo}`
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
