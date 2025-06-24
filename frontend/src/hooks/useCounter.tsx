import  { useEffect, useState } from "react";


export function useCounter(){
    const [counter,setcounter] = useState<number>(30);

    useEffect(()=>{
        const timer = setInterval(() => {
            if(counter <= 0){
                clearInterval(timer)
                return
            }else{
                setcounter(prev => prev -1)
            }
        }, 1000);

        return () => clearInterval(timer)
    },[])

    return counter
}