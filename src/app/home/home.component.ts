import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  user: User;
  friendEmail: string = '';
  message: string = '';

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private router: Router, private modalService: NgbModal, private requestsService: RequestsService) {

    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(error);
    });

    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        if (this.user.friends) {
          // OBJECT values() acceder los valores de un objeto que le pasemos
          this.user.friends = Object.values(this.user.friends);
          console.log(this.user);
        }
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      message_sender: this.message,
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      name_sender: this.user.nick,
      status: 'pending'
    };
    this.requestsService.createRequests(request).then(() => {
      alert('Solicitud enviada');
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }
  ngOnInit() {
  }
}
