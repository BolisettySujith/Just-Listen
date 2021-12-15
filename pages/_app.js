import "../styles/globals.css";
import {SessionProvider} from 'next-auth/react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps : {sessions, ...pageProps} }) {
  return(
    <SessionProvider sessions={sessions}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
