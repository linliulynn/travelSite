import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from '../models/message';
import { Chat } from '../models/chat';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  // TODO: html template modification
  // TODO: messages design change, not only one list, there is a list for each conversation

  private message;
  public messages: Message[] = [];
  typingMessage: String;
  private userName;
  private chatsList: Chat[] = [];
  private activeChat;
  private openPopUp: boolean;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // TODO: replace the username define part after testing
    // this.userName = JSON.parse(localStorage.getItem('currentUser')).username || '';
    this.userName = '';
    this.chatService.initSocket();
    this.chatService.getMessage('message').subscribe((data) => {
      this.messages.push(data);
    });
    this.chatService.getMessage('typing').subscribe((data) => {
      this.typingMessage = data;
    });
    this.chatService.getMessage('unTyping').subscribe((data) => {
      this.typingMessage = '';
    });
    // TODO: get chats from backend, hard coded for convenience right now
    this.chatsList = [
      {'id': 1, 'names': ['Mary', 'Bob', 'Jane'], 'messages': [new Message('Bob', 'hello'), new Message('Mary', 'hello')]},
      {'id': 2, 'names': ['Mary', 'Bob'], 'messages': []},
      {'id': 3, 'names': ['Mary', 'Jane'], 'messages': []}
    ];
    this.activeChat = (this.chatsList.length > 0) ? this.chatsList[0] : null;
    this.chatsList.forEach((chat) => {
      this.chatService.initChannel(chat);
      this.chatService.getMessage('' + chat.id).subscribe((data) => {
        console.log(data);
        this.chatsList.find(item => data[0] === item.id).messages.push(data[1]);
      });
    });

    // determin if open pop up
    this.openPopUp = false;
  }

  onBlur() {
    this.chatService.getMessage(this.userName).subscribe((data) => {
      console.log(data);
      if (data[0] === 'joinRoom') {
        this.findChatByConvId(data[1]);
        this.chatService.sendMessage('joinRoom', data[1]);
      }
    });
  }
  send() {
    let mesData = new Message(this.userName, this.message);
    this.messages.push(mesData);
    this.activeChat.messages.push(mesData);
    this.chatService.sendMessageToRoom('sendMessageToRoom', [this.activeChat.id, mesData]);
    // this.chatService.sendMessage('message', this.mesData);
    this.message = '';
  }

  typing() {
    this.chatService.sendMessage('typing', 'typing test...');
  }

  unTyping() {
    this.chatService.sendMessage('unTyping', 'user not typing');
  }

  // new a chat
  onNew(friends: string[]) {
    this.openPopUp = false;
    this.createChat(this.userName, friends);
    if (this.activeChat != null) {
      this.chatService.initChannel(this.activeChat);
    }
  }

  createChat(username: string, chatUserList: string[]) {
    const value = chatUserList.concat(username).sort();
    this.chatsList.forEach((chat) => {
      chat.names = chat.names.sort();
      if (JSON.stringify(chat.names) === JSON.stringify(value))  {
        this.activeChat = chat;
        return;
      }
    });
    let newChat = new Chat(this.chatsList[this.chatsList.length - 1].id + 1, value, []);
    this.chatsList.push(newChat);
    this.activeChat = newChat;
  }

  findChatByConvId(id: number) {
    this.chatsList.forEach((chat) => {
      if (chat.id === id) {
        this.activeChat = chat;
      }
    });
  }

  activate(chat: Chat) {
    this.activeChat = chat;
  }

  // add new chat
  addChat() {
    this.openPopUp = true;
  }

  onClose(close: boolean) {
    this.openPopUp = !close;
  }
}
