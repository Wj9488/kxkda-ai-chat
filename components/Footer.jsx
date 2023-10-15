import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex items-center justify-between gap-20 px-[2.5%] lg:py-[1%] py-2">
    <div>
      <p>Pay as you go GPT-3.5</p>
      <div className="dark:text-neutral-400 text-neutral-600 text-sm flex items-center justify-start">
        <div className="h-[5px] w-[5px] bg-green-600 mx-2"></div>
        <p>Operational</p>
      </div>
    </div>
    <div>
      <p className="lg:text-left text-right">
        Made by{" "}
        <Link
          href={"https://willjonesdev.co.uk"}
          className="text-neutral-600 dark:text-neutral-400 hover:text-[#3842F5] transition-colors duration-300"
        >
          Will Jones
        </Link>
      </p>
      <p className="dark:text-neutral-400 text-neutral-600 text-sm text-right">
        v-1.002 BETA
      </p>
    </div>
  </footer>
  )
}

export default Footer