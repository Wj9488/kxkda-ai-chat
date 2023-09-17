import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
// import User from './components/user'
import Nav from '@/components/Nav'
import Transition from '@/components/utils/Transition'
import Canvas from '@/components/Canvas'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Transition>
        <main className='flex items-center justify-center min-h-[100dvh]'>
          {/* <h1>Home</h1>
          <h1>Server Side Rendered</h1>
          <pre>{JSON.stringify(session)}</pre>
          <h1>Client Side Rendered</h1> */}
          {/* <User /> */}
          <div className='flex-col lg:flex items-center justify-center min-w-[90%] lg:min-h-0 mx-auto lg:mx-0'>
            <Nav />
            <Canvas />
          </div>
        </main>
      </Transition>
    </>
  )
}
