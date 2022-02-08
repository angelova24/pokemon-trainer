import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  get pokemons(): Pokemon[] {
    return this.storageService.pokemons;
  }
// using a constructor to get our services so we can pass collected data
  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
  }
  //After clicking on collect button we collect the pokemon name and url and store it locally also we store it for the logged user only 
  onCollect(pokemon: Pokemon) {
    alert(`Pokemon ${pokemon.name} collected!`);
    let user = JSON.parse(sessionStorage.getItem('user') || '');
    this.userService.updateUserPokemons(user, pokemon.name);
  }
}
