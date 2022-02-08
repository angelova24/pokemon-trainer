import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private pokemonService: PokemonService
  ) {}
//First thing is to get from sessionStorage our username and if there is a logged user to sent him to the catalogue / Landing page
  ngOnInit(): void {
    if (sessionStorage.getItem('username') != '') {
      this.router.navigateByUrl('/catalogue');
    }
    this.userService.findAllUsers(); //We call the findAllUsers from userService
    this.pokemonService.findAllPokemons();// And also all the pokemon for the user to select
  }
// After clicking on login we get the username and if it is a valid one we first deconstruct the form and get the username only
  onLoginSubmit(form: NgForm) {
    if (form.valid) {
      const { username } = form.value;
      this.userService.checkIfUserExists(username);//Here we check if the user exists in API if not we create one
      sessionStorage.setItem('username', username);//We also store him locally 
      this.storageService.pokemons = this.pokemonService.pokemons;
      this.router.navigateByUrl('/catalogue');
    }
  }
}
