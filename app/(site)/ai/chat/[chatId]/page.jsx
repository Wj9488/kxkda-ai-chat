"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Transition from "@/components/utils/Transition";

export default function savedChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

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

    const deleteChat = async () => {
      try {
        const response = await axios.post("/api/deleteSpecificChat", {
          uniqueChatId: uniqueChatId,
        });
        console.log("Deleted Chat API response", response);
        router.push("/ai?chatDeleted=true");
      } catch (error) {
        console.error("An error occurred while fetching the chats", error);
      }
    };

    return (
      <>
      <section className="fixed bottom-0 lg:right-10 lg:left-10 right-5 left-5 z-10 flex items-center justify-center">
              <div
                id="chatSection"
                className="bg-transparent lg:p-4 p-2 rounded-lg"
              >
                <div className="items-center gap-2 lg:flex justify-center">
                  <div className="flex items-center gap-2 mb-2 lg:mb-0">
                    <button
                      onClick={deleteChat}
                      className="bg-[#02ffb3] text-[#070707] mt-0 px-2 py-1 rounded-lg text-center"
                    >
                      Delete Chat
                    </button>
                  </div>
                </div>
              </div>
      </section>
        <nav className="border__bottom border-neutral-900 flex items-center justify-between px-[2.5%] lg:py-[.5%] py-2">
          <div>
            <Link href={"/"}>
              <p className="text-lg">
                KXKDA{" "}
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
              <button className="text-sm text-[#070707] py-1 px-2 bg-[#ef90ff] rounded-lg">Back</button>
            </Link>
          </div>
        </nav>
        <Transition>
          <main className="px-[2.5%] py-1 min-h-[92.5vh]">
            <div className="w-full min-h-[1px] dark:bg-[#fafafa] bg-[#070707] lg:mt-2"></div>
            <section className="mt-4 lg:mb-10 mb-[5rem]">
              {uniqueChat.map((m) => (
                <div key={m.id}>
                  {m.role === "user" ? (
                    <div className="dark:bg-[#fafafa] bg-[#edede9] text-[#070707] p-4 rounded-2xl lg:flex items-start gap-5 mb-2">
                      <p className="min-w-[5%] lg:mb-0 mb-2">User:</p>
                      <p>{m.content}</p>
                    </div>
                  ) : (
                    <div className="lg:flex lg:gap-5 items-start mb-2 bg-[#ef90ff] rounded-2xl px-4 py-4 xl:py-8 text-black">
                      <p className="lg:min-w-[5%] lg:mb-0 mb-2">GPT-3.5:</p>
                      <p className="text-black">
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
