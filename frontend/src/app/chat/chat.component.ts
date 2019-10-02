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
  private chatUsernames: String[] = [];
  private chatUserList: String[];
  private chatsList: Chat[] = [];
  private activeChat;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // TODO: replace the username define part after testing
    // this.userName = JSON.parse(localStorage.getItem('currentUser')).username || '';
    this.userName = '';
    // TODO: get friends name from backend, hard coded for convenience right now
    this.chatUsernames = ['Mary', 'Bob', 'Jane'];
    this.chatUserList = [];
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
    this.chatsList = [
      {'convId': 1, 'names': ['Mary', 'Bob', 'Jane'], 'messages': [new Message('Bob', 'hello')]},
      {'convId': 2, 'names': ['Mary', 'Bob'], 'messages': []},
      {'convId': 3, 'names': ['Mary', 'Jane'], 'messages': []}
    ];
    this.activeChat = new Chat(0, [], []);
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
    this.chatService.sendMessageToRoom('sendMessageToRoom', [this.activeChat.convId, mesData]);
    // this.chatService.sendMessage('message', this.mesData);
    this.message = '';
  }

  typing() {
    this.chatService.sendMessage('typing', 'typing test...');
  }

  unTyping() {
    this.chatService.sendMessage('unTyping', 'user not typing');
  }

  // select a user to chat
  select() {
    this.findChatId(this.userName, this.chatUserList);
    if (this.activeChat != null) {
      this.chatService.sendMessage('createChannel', this.activeChat);
      this.chatService.sendMessage('joinRoom', this.activeChat.convId);
    }
  }

  findChatId(username: string, chatUserList: String[]) {
    this.chatsList.forEach((chat) => {
      chat.names = chat.names.sort();
      let value = chatUserList.concat(username).sort();
      if (JSON.stringify(chat.names) === JSON.stringify(value))  {
        this.activeChat = chat;
      }
    });
  }

  findChatByConvId(id: number) {
    this.chatsList.forEach((chat) => {
      if (chat.convId === id) {
        this.activeChat = chat;
      }
    });
  }

  activate(chat: Chat) {
    this.activeChat = chat;
  }
}
