"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Transition from "@/components/utils/Transition";

export default function savedChatPage() {
  const searchParams = useSearchParams();

  const uniqueChatId = searchParams.get("cid");

  const { data: session, status } = useSession(); // destructure session and status

  if (uniqueChatId) {
    const [uniqueChat, setUniqueChat] = useState([]);

    const getUniqueChat = async () => {
      try {
        const response = await axios.post("/api/fetchSpecificChat", {
          uniqueChatId: uniqueChatId,
        });
        console.log("Unique Chat:", response.data);
        setUniqueChat(response.data.uniqueChat.content);
      } catch (error) {
        console.error("An error occurred while fetching the chats", error);
      }
    };

    useEffect(() => {
      getUniqueChat();
    }, [session]);

    console.log("Set Unique Chat State to: ", uniqueChat);

    return (
      <>
        <nav className="border__bottom border-neutral-900 flex items-center justify-between px-[2.5%] lg:py-[.5%] py-2">
          <div>
            <Link href={"/"}>
              <p className="text-lg">
                KXKDA |{" "}
                <span className="dark:text-neutral-400 text-neutral-600 text-sm">
                  chat
                </span>
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-around gap-5">
            {session && (
              <p className="dark:text-neutral-400 text-neutral-600 text-sm hidden lg:block">
                Account:{" "}
                <span className="text-neutral-500">{session?.user?.name} </span>
              </p>
            )}
            <p className="lg:block hidden">|</p>
            <Link href={"/ai"}>
              <button className="text-sm">AI CHAT</button>
            </Link>
          </div>
        </nav>
        <Transition>
          <main className="px-[2.5%] py-1 min-h-[92.5vh]">
            <div className="w-full min-h-[1px] dark:bg-[#fafafa] bg-[#070707] lg:mt-2"></div>
            <section className="mt-4">
            {uniqueChat.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="dark:bg-neutral-900 bg-neutral-100 py-2 px-4 rounded-lg flex items-start gap-5 mb-2">
                    <p className="min-w-[5%]">User:</p>
                    <p>{m.content}</p>
                  </div>
                ) : (
                  <div className="py-2 px-4 lg:flex lg:gap-5 items-start mb-2">
                    <p className="lg:min-w-[5%] lg:mb-0 mb-2">GPT-3.5:</p>
                    <p className="dark:text-neutral-400 text-neutral-600">
                      {m.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
            </section>
          </main>
        </Transition>
      </>
    );
  } else {
    return (
      <main className="px-[2.5%] py-1 min-h-[92.5vh] flex items-center justify-center">
        <div>
          <h1 className="">
            An error occured getting this chat.{" "}
            <Link href={"/ai"} className="underline">
              Back to chat page
            </Link>
          </h1>
        </div>
      </main>
    );
  }
}