  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './itens.model';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _snack : MatSnackBar) { }

  findAllByRefeicao(id_ref: Number): Observable<Item[]> {
    const url = `${this.baseUrl}/itens?refeicao=${id_ref}`;
    return this.http.get<Item[]>(url)    
  }
  
  findById(codigo: number) : Observable<Item>{
    const url = `${this.baseUrl}/itens/${codigo}`;
    return this.http.get<Item>(url);
  }

  update(item: Item) : Observable<Item>{
    const url = `${this.baseUrl}/itens/${item.codigo}`
    return this.http.put<Item>(url, item); //url e o corpo da requisição
  }

  create(item: Item, id_ref: number): Observable<Item[]> {
    const url = `${this.baseUrl}/itens?refeicao=${id_ref}`;
    return this.http.post<Item[]>(url, item)
  }
  delete(codigo: number) : Observable<void>{
    const url = `${this.baseUrl}/itens/${codigo}`
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
