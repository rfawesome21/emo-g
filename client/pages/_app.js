import '../styles/globals.css'
import {SocketContext, socket} from '../context/socket/SocketContext'
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  
  return (
  <SocketContext.Provider value={socket}>
    <Component {...pageProps} />
  </SocketContext.Provider>
  )
}

export default MyApp
