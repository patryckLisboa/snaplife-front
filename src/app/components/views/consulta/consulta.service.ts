import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consulta } from './consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _snack : MatSnackBar) { }

  findAllByCliente(id_cli: number): Observable<Consulta[]> {
    const url = `${this.baseUrl}/consultas?cliente=${id_cli}`;
    return this.http.get<Consulta[]>(url)    
  }
  
  findById(codigo: number) : Observable<Consulta>{
    const url = `${this.baseUrl}/consultas/${codigo}`;
    return this.http.get<Consulta>(url);
  }

  update(consulta: Consulta) : Observable<Consulta>{
    const url = `${this.baseUrl}/consultas/${consulta.codigo}`
    return this.http.put<Consulta>(url, consulta); //url e o corpo da requisição
  }
  create(consulta: Consulta, id_cli: number): Observable<Consulta[]> {
    const url = `${this.baseUrl}/consultas?cliente=${id_cli}`;
    return this.http.post<Consulta[]>(url, consulta)
  }
  delete(codigo: number) : Observable<void>{
    const url = `${this.baseUrl}/consultas/${codigo}`
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
