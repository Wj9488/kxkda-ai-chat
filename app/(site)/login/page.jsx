"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Transition from "@/components/utils/Transition";

export default function Login() {
  const [loginStatus, setLoginStatus] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");

  const searchParams = useSearchParams();

  const googleOnboarding = searchParams.get("googleOnboarding")

  const [withGoogleOnboarding, setWithGoogleOnboarding] = useState(false);

  useEffect(() => {
    if (googleOnboarding === "true") {
      // signIn("google")
      setWithGoogleOnboarding(true)
    }
  }, [googleOnboarding]);

  const togglePasswordVisibility = () => {
    setPasswordInputType(
      passwordInputType === "password" ? "text" : "password"
    );
  };

  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(`/ai`);
    }
  });

  console.log(session?.status);

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error === "Incorrect password" || callback?.error === "Please enter an email and password") {
        // toast.error(callback.error);
        console.log(`Error: ${callback.error}`)
        setLoginStatus(callback?.error);
      } 
      if(callback?.error === "No user found") {
        setLoginStatus("Invalid email or password");
      }
      else {
        console.log(`Error: ${callback.error}`)
        setLoginStatus("Unexpected error, please try again.");
      }
      if (callback?.ok && !callback?.error) {
        // toast.success("Logged in!");
        setLoginStatus("Success");
      }
    });
  };

  return (
    <>
      <nav className="border__bottom border-neutral-900 flex items-center justify-between px-[2.5%] lg:py-[.5%] py-2">
        <div>
          <Link href={"/"}>
            <p className="text-lg">
              KXKDA {" "}
              <span className="dark:text-neutral-400 text-neutral-600 text-sm">
                chat
              </span>
            </p>
          </Link>
        </div>
        <div className="flex items-center justify-around gap-5">
          <Link href={"/sign-up"}>
            <button className="text-sm text-[#070707] py-1 px-2 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded">Sign Up</button>
          </Link>
        </div>
      </nav>
      <Transition>
        <main className="min-h-[80dvh] flex items-center justify-center">
          <section className="lg:py-10 lg:px-20 rounded-xl lg:min-w-[33.33%] min-w-[90%]">
            <p className="text-4xl text-center py-8">Welcome Back</p>
            <div className="px-4 pb-4">
              <form method="POST" onSubmit={loginUser} className="">
                <p className="text-sm mb-2">Email</p>
                <div className="mt-2">
                  <input
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    type="email"
                    placeholder="email@example.com"
                    className="dark:bg-transparent py-1 px-2 rounded border border-neutral-900 mb-2 dark:border-neutral-200 w-full"
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
                    className="dark:bg-transparent py-1 px-2 rounded  border border-neutral-900 dark:border-neutral-200 w-full"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 px-2 py-1 dark:text-neutral-300 bg-[#3842F5] border border-[#3842F5] text-white rounded w-full text-center"
                >
                  Login
                </button>
              </form>
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="w-full h-[1px] bg-white"></div>
                <p className="mx-2">or</p>
                <div className="w-full h-[1px] bg-white"></div>
              </div>
              <button
                onClick={() => signIn("google")}
                className={withGoogleOnboarding === true ? "bg-neutral-900 text-white mt-2 py-1 px-2 rounded dark:bg-neutral-200 dark:text-[#070707] mb-2 w-full text-center" : "mt-2 py-1 px-2 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded mb-2 w-full text-center"}
              >
                Google Sign In
              </button>
              <p
                
                className={
                  loginStatus === "Success" ? "text-green-500 text-center" : "text-red-500 text-center"
                }
              >
                {loginStatus}
              </p>
            </div>
          </section>
        </main>
      </Transition>
    </>
  );
}
