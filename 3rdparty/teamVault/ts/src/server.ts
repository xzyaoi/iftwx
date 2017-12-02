import * as http from "http"
import * as socketIo from "socket.io"
import * as Koa from "koa"
import { Message } from "./model";

export class Server {
    public static readonly PORT: number = 8080
    public app: any
    private server: any
    private io: any
    private port: string | number
    constructor() {
        this.createApp()
        this.config()
        this.createServer()
        this.sockets()
        this.listen()
    }  
    private createApp(): void {
        this.app = new Koa();
    }
    private config(): void {
        this.port = process.env.PORT || Server.PORT;        
    }
    private createServer(): void {
        this.server = http.createServer(this.app.callback());        
    }
    private sockets(): void {
        this.io = socketIo(this.server);        
    }
    private listen():void {
        this.server.listen(this.port, () => {
            console.log('Running Server on port %s', this.port);
        });
        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            console.log('With socket:')
            console.log(socket)
            socket.on('message', (m: Message) => {
                console.log('[Server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
            socket.on('requireAuth',(m, Message) => {
                console.log('[Auth Required]')                
                console.log('[Auth](message): %s', JSON.stringify(m));
                
            });
            socket.on('authComplete',(m, Message) => {
                console.log('[Auth Completed]')
                console.log('[Auth](message): %s')
            })
            socket.on('disconnect', () => {
                console.log('Client Disconnected');
            });
        });
        
        this.io.on('')
    }
}