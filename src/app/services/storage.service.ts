import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _pokemons: any;

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }
  //Here we store the pokemons locally
  set pokemons(pokemons: Pokemon[]) {
    sessionStorage.setItem('pokemons', JSON.stringify(pokemons));
    this._pokemons = pokemons;
  }

  constructor() {
    if (sessionStorage.getItem('pokemons') != null) {
      this._pokemons = JSON.parse(sessionStorage.getItem('pokemons') || '');
    }
  }
}
