import * as socketIo from 'socket.io-client'
import { SocketMessage } from '../models/socketMessage'

let SERVER_URL = 'http://localhost:5000'


export class SocketService {
  private socket:any;

  constructor() {
      this.initSocket();
  }

  private initSocket(): void {
      this.socket = socketIo(SERVER_URL);
  }

  public send(messageName:string, message: SocketMessage): void {
      this.socket.emit(messageName, message);
  }

  public get(messageName:string) {
    return new Promise((resolve, reject)=>{
      this.socket.on(messageName,(data:any)=>{
        resolve(data)
      })
    })
  }
}
