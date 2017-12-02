import * as http from "http"
import * as socketIo from "socket.io"
import * as Koa from "koa"

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
            console.log('Running server on port %s', this.port);
        });
    }
}