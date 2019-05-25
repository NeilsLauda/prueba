import { UserService } from './../services/user.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation = 'login';
  email: string = null;
  password: string = null;
  emailfb: string = null;
  passwordfb: string = null;
  nick: string = null;
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then((data) => {
      alert('Loggeado correctamente');
      console.log(data);
      this.router.navigate(['home']);
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then((data) => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.userService.createUser(user).then((data2) => {
        alert(data2);
      }).catch((error2) => {
        alert(error2);
      });
      alert('Registrado correctamente');
      console.log(data);
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }

  loginWithFacebook() {
    this.authenticationService.loginWithFacebook(this.emailfb, this.passwordfb).then(data => {
      alert('Logeado con Facebook correctamente');
      console.log(data);
    }).catch(error => {
      alert('Ocurrió un error');
      console.log(error);
    });
  }

}
