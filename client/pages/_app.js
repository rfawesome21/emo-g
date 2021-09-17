import '../styles/globals.css'
import {SocketContext, socket} from '../context/socket/SocketContext'

function MyApp({ Component, pageProps }) {
  
  return (
  <SocketContext.Provider value={socket}>
    <Component {...pageProps} />
  </SocketContext.Provider>
  )
}

export default MyApp
