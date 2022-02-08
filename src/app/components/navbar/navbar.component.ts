import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  get user() {
    return sessionStorage.getItem('username');
  }
  constructor(private router: Router) {}

// After clicking the logout button we let the user chose if he really wants to logout, after confirming that, we clear the sessionStorage and sent the user to the login page.
  onLogout() {
    if (window.confirm('Are you sure you want to logout?')) {
      sessionStorage.clear();
      this.router.navigateByUrl('/');
    }
  }
}
