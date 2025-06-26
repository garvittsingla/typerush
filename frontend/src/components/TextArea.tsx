import {  useEffect, useRef, useState } from "react"
import  {useMyState}  from "../context/OurContext"
import { PROGRESS } from "../lib/conf"
import { useotherplayer } from "../context/OtherPlayerContext"

const TextArea = ({sendmessage}:{sendmessage:(message:any)=>void}) => {
    
    const [words,setWords] = useState<string>("")
    const inpref = useRef<HTMLTextAreaElement>(null)
    const divref = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    const {setmyWpm, setmyProgress, setmyCurrentPosition,text} = useMyState();
    const {currentposition} = useotherplayer()
    
    
    useEffect(() => {
        audioRef.current = new Audio('/sound.wav');
        audioRef.current.load(); 

       
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
        
        return () => {
           
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);
    
   
    const prevWordsLengthRef = useRef(0);

    
    function typing():string{
        let result = "";
        const cursor = words.length;
        const wordsPerMinute = Math.round((words.length / 5) * (60 / 60));
        const progress = Math.floor((words.length / text.length) * 100);
    
        setmyWpm(wordsPerMinute);
        setmyProgress(progress);
        setmyCurrentPosition(cursor);

        const content  = {
            wpm:wordsPerMinute,
            progress:progress,
            currentposition:cursor
        }
        sendmessage({type:PROGRESS,payload:content})

        for (let i = 0; i < text.length; i++) {
            if (i === cursor) {
                result += `<span class="bg-white/60 animate-pulse relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-white/30 before:animate-[travel_1s_ease-in-out_infinite]" style="width: 4px; height: 1em; display: inline-block;"></span>`;
            }
            if (i === currentposition) {
                result += `<span class="bg-green-400 animate-pulse relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-green-400/40 before:animate-[travel_1s_ease-in-out_infinite]" style="width: 4px; height: 1em; display: inline-block;"></span>`;
            }
            if (!words[i]) {
                result += `<span class="text-[#CF6BDD]/70">${text[i]}</span>`;
            } else if (text[i] === words[i]) {
                result += `<span style="color:white">${text[i]}</span>`;
            } else {
                result += `<span style="color:red">${text[i]}</span>`;
            }
        }

        return result
    }

    useEffect(() => {
        
        
        if (inpref.current) {
            inpref.current.focus()
        }
    }, [])

    useEffect(() => {
        if (divref.current) {
            divref.current.innerHTML = typing();
        }
        
      
        if (words.length > prevWordsLengthRef.current && audioRef.current) {
            try {
               
                const soundClone = audioRef.current.cloneNode() as HTMLAudioElement;
                soundClone.volume = 0.3; 
                
                
                soundClone.play();
                
            } catch (error) {
                console.error('Error playing sound:', error);
            }
        }
        
        
        prevWordsLengthRef.current = words.length;

    }, [words, currentposition]);

    return (
        <div className=" bg--900 w-4/5 h-3/5 mt-10 mx-auto overflow-hidden p-2 text-6xl font-[oswald] leading-none relative">
            <div 
                className="w-full tracking-[0.2rem] h-2/3 mt-4  bg outline-none resize-none text-6xl font-[oswald] leading-17 overflow-hidden box-border"
                ref={divref}
            >
            </div>
            <textarea 
                spellCheck={false} 
                ref={inpref} 
                onChange={e => setWords(e.target.value)}  
                className="absolute h-full w-full bg--900 inset-0 outline-none text-transparent"
            ></textarea>
        </div>
    )
}

export default TextArea