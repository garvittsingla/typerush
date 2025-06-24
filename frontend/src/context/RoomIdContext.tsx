import { createContext, useContext, useState } from "react";

interface RoomIdContextType {
    currentRoomId: string;
    setCurrentRoomId: (id: string) => void;
}
const roomIdContext = createContext<RoomIdContextType|undefined>(undefined)


export const RoomIdProvider = ({ children }: {children:React.ReactNode}) => {
    const [currentRoomId, setCurrentRoomId] = useState<string>('');

    return (
        <roomIdContext.Provider value={{ currentRoomId, setCurrentRoomId }}>
            {children}
        </roomIdContext.Provider>
    );
};

export const useRoomId = () => {
    const context = useContext(roomIdContext);
    if (!context) {
        throw new Error('useRoomId must be used within a RoomIdProvider');
    }
    return context;
};
