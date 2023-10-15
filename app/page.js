import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
// import User from './components/user'
import Nav from "@/components/Nav";
import Transition from "@/components/utils/Transition";
import Canvas from "@/components/Canvas";
import Link from "next/link";
import AnimatedHeader from "@/components/AnimatedHeader";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Transition>
        <main className="">
          {/* <h1>Home</h1>
          <h1>Server Side Rendered</h1>
          <pre>{JSON.stringify(session)}</pre>
          <h1>Client Side Rendered</h1> */}
          {/* <User /> */}
          <div className="min-w-[90%] lg:min-h-0 mx-auto lg:mx-0">
            <Nav />
            {/* <Canvas /> */}
            < AnimatedHeader />
            <Footer />
          </div>
        </main>
      </Transition>
    </>
  );
}


