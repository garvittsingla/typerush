import { createContext, useContext, useState } from "react";

interface Ourplayercontextinterface{
    mywpm : number;
    setmyWpm : (wpm:number) => void;
    myprogress : number;
    setmyProgress :(progress:number) => void;
    mycurrentposition : number;
    setmyCurrentPosition : (setCurrentPosition:number) => void;
    text:string
    setText:(text:string) => void
}

const OurplayerContext = createContext<Ourplayercontextinterface|undefined>(undefined)

export const OurplayerContextprovider = ({children}:{children:React.ReactNode})=>{
    const [mywpm, setmyWpm] = useState<number>(0);
    const [myprogress, setmyProgress] = useState<number>(0);
    const [mycurrentposition, setmyCurrentPosition] = useState<number>(0);
    const [text, setText] = useState<string>("");

   

    return (
        <OurplayerContext.Provider value={{ mywpm,
        setmyWpm,
        myprogress,
        setmyProgress,
        mycurrentposition,
        setmyCurrentPosition,
        text,
        setText}}>
            {children}
        </OurplayerContext.Provider>
    );
}

export const useMyState =() =>{
    const context = useContext(OurplayerContext)
   if (!context) {
        throw new Error("useMyState must be used within an OurplayerContextprovider");
    }
    return context
}