import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';
import { RequestsService } from 'src/app/services/requests.service';
import { Router } from '@angular/router';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  shouldAdd: string = 'yes';
  currentRequest: any;
  constructor(public dialogService: DialogService, private userService: UserService,
    private router: Router, private requestsService: RequestsService) {
    super(dialogService);
  }
  accept() {
    if (this.shouldAdd == 'yes') {
      this.requestsService.setRequestsStatus(this.currentRequest, 'accepted').then((data) => {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud aceptada con exito');
        });
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd == 'no') {
      this.requestsService.setRequestsStatus(this.currentRequest, 'reject').then((data) => {
        console.log(data);
      }).catch((error2) => {
        console.log(error2);
      });
    } else if (this.shouldAdd == 'later') {
      this.requestsService.setRequestsStatus(this.currentRequest, 'decide_later').then((data) => {
        console.log(data);
      }).catch((error3) => {
        console.log(error3);
      });
    }
  }

}
