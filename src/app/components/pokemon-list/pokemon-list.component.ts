import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon} from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent{
  @Input() pokemons: Pokemon[] = [];
  @Output() collectPokemon: EventEmitter<Pokemon> = new EventEmitter();

  constructor() {}
  pokemonImage = '';
  
  // After clicking the collect button we show the user that  he has collected the pokemon with given name
  onCollectClick(pokemon: Pokemon) {
    this.pokemonImage = pokemon.url;
    this.collectPokemon.emit(pokemon);
  }
}
