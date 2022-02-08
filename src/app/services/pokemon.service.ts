import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?limit=400';
const PICTURE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _pokemons: Pokemon[] = [];

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  constructor(private http: HttpClient) {}
  //Here we get all the pokemons from the API
  findAllPokemons(): void {
    this.http
      .get<PokemonResponse>(POKEMON_URL)
      .pipe(
        map((response: PokemonResponse) => {
          return response.results;
        })
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          //change original url to image url
          pokemons.forEach((element) => {
            const id = element.url.slice(-8).replace(/[^0-9]+/g, ''); // Using Regex we get the image for each pokemon
            element.url = `${PICTURE_URL}${id}.png`;
          });
          this._pokemons = pokemons;
        },
        error: (error) => {
          console.log(error.message);
        },
      });
  }
}
