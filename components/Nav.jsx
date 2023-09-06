// "use client"

import Link from "next/link"
// import { useEffect, useState } from "react"

const Nav = () => {

  // const [darkMode, setDarkMode] = useState(false);

  // function handleDarkClick() {
  //   setDarkMode(!darkMode);
  // }

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);
  
  return (
    <nav className='border__bottom border-neutral-900 flex items-center justify-between px-[2.5%] lg:py-[.5%] py-2'>
      <div>
        <Link href={"/"}>
          <p className="text-lg">KXKDA {" "}<span className="dark:text-neutral-400 text-neutral-600 text-sm">chat</span></p>
        </Link>
      </div>
      <div className="flex items-center justify-around gap-5">
        <Link href={"/sign-up"}>
        <button className="text-sm text-[#070707] py-1 px-2 bg-[#ef90ff] rounded-lg">
          Sign Up
        </button>
        </Link>
        <p>|</p>
        <Link href={"/login"}>
        <button className="text-sm text-[#070707] py-1 px-2 bg-[#02ffb3] rounded-lg">
          Login
        </button>
        </Link>
        {/* <div
            className="hover:cursor-pointer"
            onClick={handleDarkClick}
          >
            <span className="sr-only sr-only-focusable">
              Click to change colour theme
            </span>
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="fill-neutral-200"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
                  className="fill-neutral-200"
                ></path>{" "}
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="fill-black"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .625.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .509-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />{" "}
                <path d="M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.46 5.46 0 0 1 1.055.209A3.603 3.603 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.576 3.576 0 0 1-2.241.634c.162.317.295.652.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z" />{" "}
              </svg>
            )}
          </div> */}
      </div>
    </nav>
  )
}

export default Nav