import '../styles/globals.css'
import {SocketContext, socket} from '../context/socket/SocketContext'
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {SSRProvider} from '@react-aria/ssr';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    window.onbeforeunload = function() { return "Your work will be lost."; };
  }, [])
  
  return (
    <SSRProvider>
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </SSRProvider>
  )
}

export default MyApp
