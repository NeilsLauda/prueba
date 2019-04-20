import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  friendId: any;
  friend: User;
  constructor(private userService: UserService) {

    this.friends = this.userService.getFriends();
    this.friend = this.friends.find((record) => {
      return record.uid == this.friendId;
    });



  }

  ngOnInit() {
  }

}
