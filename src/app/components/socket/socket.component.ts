import { Component, OnInit } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {

  lista: any[] = [];

  noti:any={
    nombre:''
  }

  constructor(public service:WebsocketService) { }

  ngOnInit(): void {
    this.service.conectar();
    this.service.conectando();
    this.noti = this.service.noti;
    this.lista = this.service.lista;
    console.log(this.noti);
    console.log(this.lista);
  }

  enviarMensaje(){
    this.service.enviarMensaje();
    this.lista = this.service.lista;
  }

  

}
