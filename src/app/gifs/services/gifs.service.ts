import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key: string = "td7QVoSOG8nHjJHeFxEtNcxiIRFTSIXK";
  private _historial: string[] = [];

  // TODO: cambiar any por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]; //aca rompemos la referencia y evitamos modficar el original en caso de...
  }


  constructor( private http: HttpClient ) {}


  buscarGifs(query: string = "") {
    
    query = query.trim().toLocaleLowerCase();

    // comprobaremos si ya existe el valor en el array
    if ( !this._historial.includes(query) ) {
      this._historial.unshift( query );

      // para mantenernos en MAX 10 elementos
      this._historial = this._historial.splice(0, 10);
      console.log(this._historial);
    }


    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=td7QVoSOG8nHjJHeFxEtNcxiIRFTSIXK&q=${query}&limit=10`)
      .subscribe( ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
      } )


  }
  
}
