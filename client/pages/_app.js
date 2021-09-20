import '../styles/globals.css'
import {SocketContext, socket} from '../context/socket/SocketContext'
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {SSRProvider} from '@react-aria/ssr';

function MyApp({ Component, pageProps }) {
  
  return (
    <SSRProvider>
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </SSRProvider>
  )
}

export default MyApp
