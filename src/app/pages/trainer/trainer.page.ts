import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage {
  //We import the storage services so we can get the User/Trainer
  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  //get the user from session storage
  get user() {
    return JSON.parse(sessionStorage.getItem('user') || '');
  }
  //Here we get the pokemon from the storage service
  get pokemons() {
    return this.storageService.pokemons;
  }
  //Here we iterate trough all the user pokemons and find the image link from the actual stored pokemon in storageService using the name of pokemon we get from the user
  get userPokemons() {
    let pokeWithPics: Pokemon[] = [];
    this.user.pokemon.forEach((poke: string) => {
      let pokemon = this.pokemons.find((x) => x.name == poke);
      if (pokemon) {
        pokeWithPics.push(pokemon);
      }
    });
    return pokeWithPics; // here we get the image of the pokemon
  }

  onThrowAway(pokemon: Pokemon) {
    if (window.confirm(`Are you sure you want to throw ${pokemon.name} away?`)) {
      //save user in new variable
      let newUser = this.user;

      //find index of selected pokemon and remove it
      let index = newUser.pokemon.indexOf(pokemon.name);
      newUser.pokemon.splice(index, 1);

      //save user with updated pokemons
      sessionStorage.setItem('user', JSON.stringify(newUser));
      //We call the deleteUserPokemons from userService and pass user and the new array of pokemons to update in API
      this.userService.deleteUserPokemons(this.user, newUser.pokemon);
    }
  }
}
