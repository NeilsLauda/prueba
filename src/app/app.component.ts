import { DialogService } from 'ng2-bootstrap-modal';
import { User } from './Interfaces/user';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from './services/requests.service';
import { RequestComponent } from './modals/request/request.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Laudzzinger';
  user: User;
  requests: any[] = [];
  mailsShown: any[] = [];
  constructor(public router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private requesService: RequestsService, private dialogService: DialogService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        this.requesService.getRequestsForEmail(this.user.email).valueChanges().subscribe((requests: any) => {
          this.requests = requests;
          // filter() para filtrar información
          this.requests = this.requests.filter((r) => {
            return r.status !== 'accepted' && r.status !== 'rejected';
          });
          this.requests.forEach((r) => {
            // indexOf()  hace una busqueda de elemto
            if (this.mailsShown.indexOf(r.sender) === -1) {
              this.mailsShown.push((r.sender));
              // scope set de informacion de variables parametros funciones
              this.dialogService.addDialog(RequestComponent, { scope: this, currentRequest: r });
            }
          });
        }, (error) => {
          console.log(error);
        });
      });
    });
  }
}
