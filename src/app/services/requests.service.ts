import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createRequests(request) {

    // replace(a,b) b reemplaza el primer parametro
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' +
      request.sender).set(request);
  }

  setRequestsStatus(request, status) {

    // replace(a,b) b reemplaza el primer parametro
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' +
      request.sender + '/status').set(status);
  }
  getRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.list('requests/' + cleanEmail);
  }

  getRequestsForMessage(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.list('requests/' + cleanEmail);
  }
}
