import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Interfaces/user';

import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  today: any = Date.now();
  textMessage: string;
  conversation: any[];
  shake: boolean = false;
  // tslint:disable-next-line:variable-name
  conversation_id: string;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
    private conversationService: ConversationService, private authenticationService: AuthenticationService) {

    this.friendId = this.activatedRoute.snapshot.params['uid'];

    console.log(this.friendId);

    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data;
          // sort() ordena el arreglo para obtener los ids en el mismo orden del arreglo
          const ids = [this.user.uid, this.friend.uid].sort();
          // join() en arreglo concatena los dos arreglos en un string separando por un elemnto que le pasemos
          this.conversation_id = ids.join('|');
          this.getConversation();
        }, (error) => {
          console.log(error);
        });
      });
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    // resolvemos la promesa para cuando es enviado el mensaje automaticamente se limpie la caja donde se envio
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }

  sendZumbido() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    // resolvemos la promesa para cuando es enviado el mensaje automaticamente se limpie la caja donde se envio
    this.conversationService.createConversation(message).then(() => { });
    this.doZumbido();
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;

    // window.setTimeOut espera cantidad de milisegundos q pasemos por parametro, para cambiar la variable dentro
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data) => {
      this.conversation = data;
      // foreach hace un ciclo for
      this.conversation.forEach((message) => {
        if (!message.seen) {
          if (message.type === 'text') {
            message.seen = true;
            this.conversationService.editConversation(message);

            // Audio() es de html 5
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          } else if (message.type === 'zumbido') {
            this.doZumbido();
          }
        }
      });
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }
  getuserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }
}
