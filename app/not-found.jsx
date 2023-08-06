import Link from "next/link"
import Transition from "@/components/utils/Transition"

const NotFound = () => {
  return (
    <Transition>
        <main className='min-h-[100dvh] flex items-center justify-center'>
            <section className="text-center font-mono">
                <h1 className="text-6xl mb-2">404</h1>
                <p>Page Not Found | <Link className="underline" href={"/?"}>Home</Link></p>
            </section>
        </main>
    </Transition>
  )
}

export default NotFound