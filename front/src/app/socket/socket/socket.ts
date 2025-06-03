import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../../service/web-socket-service';
import { CommonModule } from '@angular/common'; // 👈 nécessaire pour les *ngIf, *ngFor, etc.

@Component({
  selector: 'app-socket',
  templateUrl: './socket.html',
  styleUrls: ['./socket.scss']
})
export class Socket implements OnInit, OnDestroy {
  messages: any;

  constructor(public wsService: WebSocketService) {
   
  }
  ngOnInit(): void {
     this.wsService.stompClient.onConnect = (frame) => {
      console.log('Connecté dans composant');
      this.wsService.stompClient.subscribe('/topic/messages', (message) => { 
        this.messages=message.body ;
      });
    };


    this.wsService.connect();
  }



  ngOnDestroy() {
    this.wsService.disconnect();
  }

}
