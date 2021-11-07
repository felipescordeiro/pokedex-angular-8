import { AppConfig } from './../../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private _http: HttpClient) { }

  getPokemons(offset, limit, search = '') {
    if (search) {
      search = '/' + search;
    }
    return this._http.get(AppConfig.ENDPOINT + 'pokemon'  + search + '?offset=' + offset + '&limit=' + limit);
  }

  getPokemon(pokemon: string) {
    return this._http.get(AppConfig.ENDPOINT + 'pokemon/' + pokemon);
  }

  getUrl(url: string) {
    return this._http.get(url);
  }

  getPokemonSpecies(id: number) {
    return this._http.get(AppConfig.ENDPOINT + 'pokemon-species/' + id);
  }

  getGender(id: number) {
    return this._http.get(AppConfig.ENDPOINT + 'gender/' + id);
  }

  getType(name: string) {
    return this._http.get(AppConfig.ENDPOINT + 'type/' + name);
  }

  getEvolution(id) {
    return this._http.get(AppConfig.ENDPOINT + 'evolution-chain/' + id);
  }
}
