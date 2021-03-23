import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _snack : MatSnackBar) { }

  findAllByNutricionista(id_cat: number): Observable<Cliente[]> {
    const url = `${this.baseUrl}/clientes?nutricionista=${id_cat}`;
    return this.http.get<Cliente[]>(url)    
  }
  
  findById(codigo: number) : Observable<Cliente>{
    const url = `${this.baseUrl}/clientes/${codigo}`;
    return this.http.get<Cliente>(url);
  }

  update(cliente: Cliente) : Observable<Cliente>{
    const url = `${this.baseUrl}/clientes/${cliente.codigo}`
    return this.http.put<Cliente>(url, cliente); //url e o corpo da requisição
  }
  create(cliente: Cliente, id_nut: number): Observable<Cliente[]> {
    const url = `${this.baseUrl}/clientes?nutricionista=${id_nut}`;
    return this.http.post<Cliente[]>(url, cliente)
  }
  delete(codigo: number) : Observable<void>{
    const url = `${this.baseUrl}/clientes/${codigo}`
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
