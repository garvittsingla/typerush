import { Route,BrowserRouter,Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Game from './pages/Game'
import { useIsMobile } from './hooks/useIsMobile'
import Mobilepage from './components/Mobilepage'
import { RoomIdProvider } from './context/RoomIdContext'
import { OtherPlayerContextProvider } from './context/OtherPlayerContext'
import { OurplayerContextprovider } from './context/OurContext'
const App = () => {
   const ismobile = useIsMobile()

   if (ismobile){
    return <Mobilepage/>
   }
  return (
    <>
    <OurplayerContextprovider>
    <OtherPlayerContextProvider>
    <RoomIdProvider>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/game/:roomId' element={<Game/>} />
     </Routes>
    </BrowserRouter>
   </RoomIdProvider>
   </OtherPlayerContextProvider>
   </OurplayerContextprovider>
   </>
  )
}

export default App