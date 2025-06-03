import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
 public stompClient: Client;

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connecté au serveur WebSocket');
      },
      onStompError: (frame) => {
        console.error('Erreur STOMP:', frame);
      }
    });
  }

  connect() {
    this.stompClient.activate();
  }

  disconnect() {
    this.stompClient.deactivate();
    console.log('Déconnecté du serveur WebSocket');
  }

  // 👇 Ajoute un getter public
  public get client(): Client {
    return this.stompClient;
  }
}
