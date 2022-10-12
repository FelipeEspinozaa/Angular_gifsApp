import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    return [...this._historial]; //aca rompemos la referencia y evitamos modficar el original en caso de...
  }

  buscarGifs(query: string) {
    this._historial.unshift( query );
  }
  
}
