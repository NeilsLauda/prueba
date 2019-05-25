import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  // inyectamos el angularfireDatabase
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  // creamos la conversacion y los parametros donde se guardaran
  createConversation(conversation) {
    return this.angularFireDatabase.object('conversation/' + conversation.uid
      + '/' + conversation.timestamp).set(conversation);
  }

  // recuperamos mediante el uid
  getConversation(uid) {
    return this.angularFireDatabase.list('conversation/' + uid);
  }

  //
  editConversation(conversation) {
    return this.angularFireDatabase.object('conversation/' + conversation.uid
      + '/' + conversation.timestamp).set(conversation);
  }
}
