import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/Center'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

export default function Home() {
  
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>{`Just Listen`}</title>
        <link rel="icon" href="/JustListenLogo.png" />
      </Head>
      
      <main className="flex">
        {/* Sidebar */}
        <Sidebar/>
        {/* Center */}
        <Center/>
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>

    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}