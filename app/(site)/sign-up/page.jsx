"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Transition from "@/components/utils/Transition";

export default function Register() {
  const router = useRouter();
  const session = useSession();

  const [processStatus, setProcessStatus] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordInputType(
      passwordInputType === "password" ? "text" : "password"
    );
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", data);
      router.push("/login");
      setProcessStatus("Success");
    } catch (error) {
      console.error(error);
      setProcessStatus(
        error.response?.data || "Unexpected error, please try again."
      );
    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(`/ai`);
    }
  });

  return (
    <>
      <nav className="border__bottom border-neutral-900 flex items-center justify-between px-[2.5%] lg:py-[.5%] py-2">
        <div>
          <Link href={"/"}>
            <p className="text-lg">
              KXKDA {" "}<span className="text-neutral-400 text-sm">chat</span>
            </p>
          </Link>
        </div>
        <div className="flex items-center justify-around gap-5">
          <Link href={"/login"}>
            <button className="text-sm text-[#070707] py-1 px-2 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded">Login</button>
          </Link>
        </div>
      </nav>
      <Transition>
        <main className="min-h-[80dvh] flex items-center justify-center">
          <section className="lg:py-10 lg:px-20 rounded-xl lg:min-w-[33.33%] min-w-[90%]">
            <p className="text-3xl text-center py-4">Sign Up</p>
            <div className="px-4 pb-4">
              <form method="POST" className="mb-2" onSubmit={registerUser}>
                <div>
                  <p className="text-sm mb-2">Name</p>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className="dark:bg-transparent px-2 py-1 rounded border border-neutral-900 mb-2 dark:border-neutral-200 w-full"
                    value={data.name}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </div>
                <p className="text-sm mb-2">Email</p>
                <div>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="dark:bg-transparent px-2 py-1 rounded border border-neutral-900 mb-2 dark:border-neutral-200 w-full"
                    value={data.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm">Password</p>
                  <button
                    type="button"
                    className="pl-2 text-xs dark:text-neutral-400 text-neutral-600"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordInputType === "password" ? "Show" : "Hide"}
                  </button>
                </div>
                <div>
                  <input
                    type={passwordInputType}
                    placeholder="password"
                    className="dark:bg-transparent px-2 py-1 rounded border border-neutral-900 dark:border-neutral-200 w-full"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 px-2 py-1 dark:text-neutral-300 bg-[transparent] border border-[#650605] rounded w-full text-center"
                >
                  Sign Up
                </button>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="w-full h-[1px] bg-white"></div>
                  <p className="mx-2">or</p>
                  <div className="w-full h-[1px] bg-white"></div>
                </div>
                <Link href={"/login?googleOnboarding=true"}>
                  <button
                    className="mt-2 py-1 px-2 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded mb-2 w-full text-center"
                  >
                    Continue With Google
                  </button>
                </Link>
              </form>
              <p
                className={
                  processStatus === "Success"
                    ? "text-green-500 text-center"
                    : "text-red-500 text-center"
                }
              >
                {processStatus}
              </p>
            </div>
          </section>
        </main>
      </Transition>
    </>
  );
}
