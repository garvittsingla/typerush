import { WebSocket } from "ws";
import { Room } from "./Room";
import { INIT, PROGRESS } from "./types";

interface UsersInWaitingRoom{
    ws:WebSocket
    room:string

}

export class RoomManager{
    public rooms:Room[];
    public usersinwaitingroom:UsersInWaitingRoom[]


    constructor(){
        this.rooms = [];
        this.usersinwaitingroom = [];

        
    }

    addUser(socket:WebSocket) {
        this.addHandler(socket);

    }
    removeuser(socket:WebSocket){
        this.usersinwaitingroom = this.usersinwaitingroom.filter(r => r.ws !== socket);
        this.rooms = this.rooms.filter(r => (r.player1 !== socket && r.player2 !== socket))
        console.log("player is waiting room" , this.usersinwaitingroom)
        console.log("player is room" , this.rooms)

    }

    private addHandler(socket:WebSocket){
        socket.on("message",async(data)=>{
            const message = JSON.parse(data.toString());
            

            if(message.type === INIT){
            const room = this.usersinwaitingroom.find(x => x.room === message.room)
            if(!room){
                this.usersinwaitingroom.push({ws:socket,room:message.room})
                console.log("plawers in waiting room " , this.usersinwaitingroom)
                console.log("plawers in  room " , this.rooms)
                
            }else{
                const waitingplayer = room.ws;
                const game = new Room(waitingplayer,socket)
                this.rooms.push(game)
                this.usersinwaitingroom = this.usersinwaitingroom.filter(x => x.ws !== waitingplayer)
                console.log("plawers in waiting room " , this.usersinwaitingroom)
                console.log("plawers in  room " , this.rooms)

            }
            }
            else if (message.type === PROGRESS){
                const game = this.rooms.find(x=> x.player1 === socket || x.player2 === socket )

                if (game){
                    game.sendTyping(socket,parseInt(message.wpm),parseInt(message.progress),parseInt(message.currentposition))
                }
            }   
            

        })
        socket.on("close",()=>{
            this.removeuser(socket)
        })
    }

}