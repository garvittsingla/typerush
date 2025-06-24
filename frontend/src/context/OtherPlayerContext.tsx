import { createContext, useContext, useState } from "react";



interface OtherPlayerContextInterface {
  connected: boolean;
  setisconnected: (connected: boolean) => void;
  wpm: number;
  setWpm: (wpm: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  currentposition: number;
  setCurrentPosition: (currentposition: number) => void;
  isgameover: boolean;
  setisgameover: (isgameover: boolean) => void;
  gameResult: boolean;
  setGameResult: (result: boolean) => void;
}

const OtherPlayerContext = createContext<OtherPlayerContextInterface | undefined>(undefined);

export const OtherPlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [connected, setisconnected] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [currentposition, setCurrentPosition] = useState<number>(0);
  const [isgameover, setisgameover] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<boolean>(false);

  const value = {
    connected,
    setisconnected,
    wpm,
    setWpm,
    progress,
    setProgress,
    currentposition,
    setCurrentPosition,
    isgameover,
    setisgameover,
    gameResult,
    setGameResult,
  };

  return <OtherPlayerContext.Provider value={value}>{children}</OtherPlayerContext.Provider>;
};

export const useotherplayer = () => {
  const context = useContext(OtherPlayerContext);
  if (!context) {
    throw new Error("useotherplayer must be used within a OtherPlayerContextProvider");
  }
  return context;
};