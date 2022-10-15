import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key: string = "td7QVoSOG8nHjJHeFxEtNcxiIRFTSIXK";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]; //aca rompemos la referencia y evitamos modficar el original en caso de...
  }


  constructor( private http: HttpClient ) {
    // FORMA 1 DE HACERLO
    /*
    if(localStorage.getItem("historial")) {
      this._historial = JSON.parse(localStorage.getItem("historial")! )
    }
    */

    //FORMA 2 de hacerlo
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []; 
    this.resultados = JSON.parse(localStorage.getItem("ultimo_resultado")!) || [];
  }


  buscarGifs(query: string = "") {
    
    query = query.trim().toLocaleLowerCase();

    // comprobaremos si ya existe el valor en el array
    if ( !this._historial.includes(query) ) {
      this._historial.unshift( query );

      // para mantenernos en MAX 10 elementos
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem("historial", JSON.stringify(this._historial));
      
    }


    const misParams = new HttpParams()
      .set("api_key", this.api_key)
      .set("limit", "10")
      .set("q", query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: misParams })
      .subscribe( ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem("ultimo_resultado", JSON.stringify(this.resultados))
      } )


  }
  
}
