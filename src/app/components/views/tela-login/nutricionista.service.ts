import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nutricionista } from './nutricionista.model';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

  baseUrl: String = environment.baseUrl; //url padrão do heroku

  constructor(private http: HttpClient, private _snack : MatSnackBar) { }

  findAll():Observable<Nutricionista[]> {//observable é o retorno
    const url = `${this.baseUrl}/nutricionistas`
    return this.http.get<Nutricionista[]>(url)
  } // 'https://bookstore-api-patryck.herokuapp.com/categorias'

  mensagem(str : String): void{
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 10000
    })
  }
}
