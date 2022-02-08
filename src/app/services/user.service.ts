import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';

const URL = 'https://mytriviaapp.herokuapp.com/trainers';
const API_KEY = 'y1/enk+AhkiaoHlX4ICtQg==';
const headers = { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: User[] = [];
  private _user: any;

  //getters - read only
  get users(): User[] {
    return this._users;
  }

  get user(): any {
    return this._user;
  }

  constructor(private http: HttpClient) {}
  //here we fetch the users and assign them in the _users array of type User array
  findAllUsers(): void {
    this.http.get<User[]>(URL).subscribe({
      next: (users: User[]) => {
        this._users = users;
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
  //Here we search in the API for the user and save it to _user
  findUser(username: string): any {
    this.http.get<any>(`${URL}?username=${username}`).subscribe({
      next: (users: any) => {
        this._user = users[0];
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
  //Here we check if the user is in the API and if not we create the user and push it to the API and also store the user in sessionStorage
  checkIfUserExists(newUsername: string) {
    if (!this._users.find((user) => user.username == newUsername)) {
      const body = { username: newUsername, pokemon: [] };
      this.http.post<any>(URL, body, { headers: headers }).subscribe({
        next: (user: User) => {
          this._users.push(user);
          this._user = user;
          sessionStorage.setItem('user', JSON.stringify(user));
        },
        error: (error) => {
          console.log(error.message);
        },
      });
    } else {
      sessionStorage.setItem(
        'user',
        JSON.stringify(this._users.find((user) => user.username == newUsername))
      );
    }
  }
  //Here we update the user's pokemon array with the new collected pokemon
  updateUserPokemons(user: User | undefined, pokemonName: string) {
    if (user) {
      const body = { pokemon: user.pokemon.concat(pokemonName) };
      this.http
        .patch<any>(`${URL}/${user?.id}`, body, { headers: headers })
        .subscribe({
          next: (user: User) => {
            this._user = user;
            sessionStorage.setItem('user', JSON.stringify(user));
          },
          error: (error) => {
            console.log(error.message);
          },
        });
    }
  }
  //Here we check if the user has pokemon and  delete the pokemon from the API after we click on the "Throw pokemon" button from trainers.page.html
  deleteUserPokemons(user: User, pokemons: Pokemon[]) {
    if (user) {
      const body = { pokemon: pokemons };
      this.http
        .patch<any>(`${URL}/${user?.id}`, body, { headers: headers })
        .subscribe({
          next: (user: User) => {
            this._user = user;
            sessionStorage.setItem('user', JSON.stringify(user));
          },
          error: (error) => {
            console.log(error.message);
          },
        });
    }
  }
}
