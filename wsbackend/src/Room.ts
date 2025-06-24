import { WebSocket } from "ws";
import { generateRandomString } from "./lib/generatetext";
import { GAMEOVER, INIT, PROGRESS } from "./types";


interface playerstatus{
    progress:number
    currentposition:number
    wpm:number
}


export class Room{
    public player1 : WebSocket;
    public player2 : WebSocket;
    private player1status:playerstatus;
    private player2status:playerstatus;
    public startTime:Date;
    private text:string;
    
    constructor(player1:WebSocket,player2 :WebSocket){
        this.player1=player1
        this.player2=player2
        this.player1status = {progress:0,currentposition:0,wpm:0}
        this.player2status = {progress:0,currentposition:0,wpm:0}
        this.startTime = new Date()
        this.text = generateRandomString()
        this.player1.send(JSON.stringify({
            type:INIT,
            payload:{
                role:"player1",
                text:this.text
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT,
            payload:{
                role:"player2",
                text:this.text
            }
        }))
    }
    checkwin(player1wpm:number,player2wpm:number){
        const time = Date.now();
        if (time - this.startTime.getTime() < 30000){
            return null;
        }
        const winner = player1wpm > player2wpm ? this.player1 : this.player2;

        if ( winner == this.player1){
            this.player1.send(JSON.stringify({
            type: GAMEOVER,
            payload: {
                status:"WON",
                player1wpm,
                player2wpm
            }

            
        }));

         this.player2.send(JSON.stringify({
            type: GAMEOVER,
            payload: {
                status:"LOOSE",
                player1wpm,
                player2wpm
            }
        }));
        }else{
             this.player2.send(JSON.stringify({
            type: GAMEOVER,
            payload: {
                status:"WON",
                player1wpm,
                player2wpm
            }
        }));
        this.player1.send(JSON.stringify({
            type: GAMEOVER,
            payload: {
                status:"LOOSE",
                player1wpm,
                player2wpm
            }

            
        }));
        }
        

       

        return winner;
    }
    sendTyping(socket:WebSocket,currentposition:number,wpm:number,progress:number){
        this.checkwin(this.player1status.wpm,this.player2status.wpm)
        if(socket === this.player1){
            this.player1status = {currentposition,wpm,progress}
            this.player2.send(JSON.stringify({
                type:PROGRESS,
                payload:{
                    opponentProgress: progress,
                    opponentWpm: wpm,
                    currentposition:currentposition
                }

            }))

            

            console.log("player 1 status",this.player1status)

        }else{
            this.player2status = {currentposition,wpm,progress}
            this.player1.send(JSON.stringify({
                type:PROGRESS,
                payload:{
                    opponentProgress: progress,
                    opponentWpm: wpm,
                    currentposition:currentposition
                }
            }))
            console.log("player 2 status",this.player2status)
        }
    }   

}