import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Refeicao } from './refeicao.model';

@Injectable({
  providedIn: 'root'
})
export class RefeicaoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _snack : MatSnackBar) { }

  findAllByPrescricao(id_pres: Number): Observable<Refeicao[]> {
    const url = `${this.baseUrl}/refeicoes?prescricao=${id_pres}`;
    return this.http.get<Refeicao[]>(url)    
  }
  
  findById(codigo: number) : Observable<Refeicao>{
    const url = `${this.baseUrl}/refeicoes/${codigo}`;
    return this.http.get<Refeicao>(url);
  }

  update(refeicao: Refeicao) : Observable<Refeicao>{
    const url = `${this.baseUrl}/refeicoes/${refeicao.codigo}`
    return this.http.put<Refeicao>(url, refeicao); //url e o corpo da requisição
  }

  create(refeicao: Refeicao, id_pres: number): Observable<Refeicao[]> {
    const url = `${this.baseUrl}/refeicoes?prescricao=${id_pres}`;
    return this.http.post<Refeicao[]>(url, refeicao)
  }
  delete(codigo: number) : Observable<void>{
    const url = `${this.baseUrl}/refeicoes/${codigo}`
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
