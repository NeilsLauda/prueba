import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDataBase: AngularFireDatabase) { }
  getUsers() {
    return this.angularFireDataBase.list('/users');
  }
  getUserById(uid) {
    return this.angularFireDataBase.object('/users/' + uid);
  }
  createUser(user) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
  editUser(user) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
  setAvatar(avatar, uid) {
    return this.angularFireDataBase.object('/users/' + uid + '/avatar').set(avatar);
  }
  addFriend(userId, friendId) {
    this.angularFireDataBase.object('users/' + userId + '/friends/' + friendId).set(friendId);
    return this.angularFireDataBase.object('users/' + friendId + '/friends/' + userId).set(userId);
  }
}
