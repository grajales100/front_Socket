import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client!: Client;
  conectado: boolean = false;
  lista: any[] = [];

  noti:any={
    nombre:''
  }

  constructor() {
    this.client = new Client();
    this.client.webSocketFactory = ():any => {
      return new SockJS("http://localhost:8080/alerta-back");
    } 

    this.client.activate();
    this.conectando();
  }

  conectando(){
    this.client.onConnect = (frame) => {
      console.log("Desonectados: " + !this.client.connected + " : " + frame);
      this.conectado = true;
      console.log(this.lista);
      this.client.subscribe('/topic/alerta',e=>{
        const historial = JSON.parse(e.body) as any[];
        this.lista = historial;
      });

      this.client.publish({ destination: '/app/alerta', body: JSON.stringify(this.noti)});
    };

    this.client.onDisconnect = (frame) => {
      console.log("Desonectados: " + !this.client.connected + " : " + frame);

      this.conectado = false;

      this.lista = [];
    }
  }

  conectar() {
    this.client.activate();
  }
  desconectar() {
    this.client.deactivate();
  }

  enviarMensaje(): void {
    this.client.publish({ destination: '/app/alerta', body: JSON.stringify(this.noti) });
    this.noti.nombre = '';
  }

}
