import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  user: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {

    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(error);
    });

    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      });
    });

  }
  logout() {
    this.authenticationService.logOut().then(data => {
      alert('Sesion cerrada');
      this.router.navigate(['login']);
    }, (error) => {
      console.log(error);
    });
  }
  ngOnInit() {
  }
}
