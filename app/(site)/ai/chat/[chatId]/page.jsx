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
                <div className="items-center gap-2 lg:flex justify-center bg-neutral-50 dark:bg-neutral-950 lg:p-4 p-3 rounded-xl">
                  <div className="flex items-center gap-2 lg:mb-0">
                    <button
                      onClick={deleteChat}
                      className="text-sm text-[#070707] py-1 px-2 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded"
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
              <button className="text-sm text-[#070707] py-1 px-2 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded">Back</button>
            </Link>
          </div>
        </nav>
        <Transition>
          <main className="px-[2.5%] py-1 min-h-[92.5vh] lg:w-[45%] mx-auto">
            {/* <div className="w-full min-h-[1px] dark:bg-[#fafafa] bg-[#070707] lg:mt-2"></div> */}
            <section className="mt-4 lg:mb-10 mb-[5rem]">
              {uniqueChat.map((m) => (
                <div key={m.id}>
                  {m.role === "user" ? (
                    <div className="ml-[15%] w-[85%] lg:w-12/12">
                      <div className="my-4 text__msg_border_style text-sm text-[#070707] py-3 px-4 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded">
                        {/* <p className="min-w-[5%] lg:mb-0 mb-2">User:</p> */}
                        <p>{m.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[85%] lg:w-12/12"> 
                      <div className="my-4 text__msg_border_style_chat text-sm py-3 px-4 text-neutral-300 border-[#3842F5] bg-[#3842f5] dark:bg-[#3842f580] border dark:border-neutral-700 rounded">
                        <p className="lg:min-w-[5%] lg:mb-0 mb-2">AI:</p>
                        <p className="text-neutral-300">
                          {m.content}
                        </p>
                      </div>
                      
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
