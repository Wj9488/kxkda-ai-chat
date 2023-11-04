"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Transition from "@/components/utils/Transition";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "ai/react";
import { motion } from "framer-motion";

const Ai = () => {
  const { data: session, status } = useSession(); // destructure session and status
  const router = useRouter();
  const searchParams = useSearchParams();

  const chatDeletedBool = searchParams.get("chatDeleted");

  console.log("chat deleted?", chatDeletedBool);

  const [menuVisibility, setMenuVisibility] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    function detectDeletedChatQueryParam() {
      if (chatDeletedBool === true) {
        setResponseStatus("Chat Deleted");
      } else {
        setResponseStatus("");
      }
    }
    detectDeletedChatQueryParam();
  }, [responseStatus]);

  // Setting Saved Chats List

  const [savedChats, setSavedChats] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (responseStatus === "Chat saved") {
      const timer = setTimeout(() => {
        setResponseStatus("");
      }, 3000);

      // Clear the timeout if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [responseStatus]);

  const saveChatClassname =
    responseStatus === "Chat saved" ? "text-green-400" : "text-red-400";

  console.log("Message Log", messages.length);

  const saveChat = async () => {
    if (messages.length < 1) {
      setResponseStatus("No messages to save");
      console.log("No messages  to save");
      return;
    }

    try {
      const response = await axios.post("/api/saveChat", {
        chatContent: messages,
        userEmail: session?.user?.email, // using email instead of user ID
      });
      console.log(response.data);
      setResponseStatus("Chat saved");
      fetchChats();
    } catch (error) {
      console.error("An error occurred while saving the chat", error);
      setResponseStatus("Error saving chat, please try again");
    }
  };

  // Get all saved chats for a particular user from the Db

  const userSessionEmail = session?.user?.email;

  const fetchChats = async () => {
    try {
      const response = await axios.post("/api/fetchChats", {
        userEmail: userSessionEmail,
      });
      console.log("Fetch Chats Response:", response);
      setSavedChats(response.data.chats);
      console.log("Saved Chats State Set to", savedChats);
    } catch (error) {
      console.error("An error occurred while fetching the chats", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [session]);

  if (status === "loading") return <Loader />;

  return (
    <>
      <section className="fixed bottom-0 lg:right-10 lg:left-10 right-5 left-5 z-10">
        <div id="chatSection" className="bg-neutral-50 dark:bg-neutral-950 lg:p-4 p-3 rounded-xl">
          <div className="items-center gap-2 lg:flex justify-center">
            <div className="flex items-center gap-2 mb-2 lg:mb-0">
              <button
                onClick={() => setMenuVisibility(!menuVisibility)}
                className="border dark:border-neutral-700 border-neutral-300 bg-neutral-100 dark:text-white mt-0 px-2 py-1 rounded-lg dark:bg-neutral-800 text-center"
              >
                {menuVisibility ? "Close" : "Menu"}
              </button>
              <button
                onClick={saveChat}
                className="border dark:border-neutral-700 border-neutral-300 bg-neutral-100 dark:text-white mt-0 px-2 py-1 rounded-lg dark:bg-neutral-800 text-center"
              >
                Save Chat
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="lg:flex items-center gap-2 lg:min-w-[85%] min-w-[90%]"
            >
              <TextareaAutosize
                rows={2}
                maxRows={4}
                autoFocus
                value={input}
                onChange={handleInputChange}
                placeholder="Write a message"
                className="px-2 py-1 rounded-lg border dark:border-neutral-700 border-neutral-300 w-full dark:bg-neutral-900 bg-neutral-100 z-10"
              />
              <button
                className="bg-[#3842F5] text-white border border-[#3842F5] dark:text-neutral-300 mt-0 px-2 py-1 rounded w-full lg:w-auto text-center"
                type="submit"
              >
                Send
              </button>
            </form>
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
        <div>
          <p className={`${saveChatClassname} text-sm rounded-lg`}>
            {responseStatus}
          </p>
        </div>
        <div className="flex items-center justify-around gap-5">
          {session && (
            <p className="dark:text-neutral-400 text-neutral-600 text-sm hidden lg:block">
              Account:{" "}
              <span className="text-neutral-500">{session.user.name} </span>
            </p>
          )}
          {/* <p className="lg:block hidden">|</p> */}
          <button
            onClick={() => signOut()}
            className="text-sm text-[#070707] py-1 px-2 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded"
          >
            Sign out
          </button>
        </div>
      </nav>

      <Transition>
        <main className="px-[2.5%] py-1 min-h-[92.5vh] lg:w-[45%] mx-auto">
          {/* <div className="w-full min-h-[1px] dark:bg-[#fafafa] bg-[#070707] lg:mt-2"></div> */}
          <section className="mt-4 lg:mb-10 mb-[10rem]">
            {messages.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="ml-[15%] w-[85%] lg:w-12/12">
                    <div className="my-4 text__msg_border_style text-sm lg:text-base text-[#070707] py-3 px-4 dark:text-neutral-300 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700 rounded">
                      {/* <p className="min-w-[5%] lg:mb-0 mb-2">User:</p> */}
                      <p>{m.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-[85%] lg:w-12/12">
                    <div className="my-4 text__msg_border_style_chat text-sm lg:text-base text-[#070707] py-3 px-4 dark:text-neutral-300 border-[#3842F5] bg-[#3842f544] dark:bg-[#3842f580] border dark:border-neutral-700 rounded">
                      <p className="lg:min-w-[5%] lg:mb-0 mb-2">AI:</p>
                      <p className="text-black dark:text-neutral-100">{m.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        </main>
      </Transition>

      {/* Hidden Elements */}
      <motion.section
        className="fixed lg:bottom-20 bottom-40 rounded-lg lg:right-20 lg:left-20 right-5 left-5 dark:bg-neutral-900 bg-neutral-100 min-h-[40vh] min-w-[full]"
        initial={{ opacity: 0, zIndex: -10 }} // Initial state (hidden)
        animate={{
          opacity: menuVisibility ? 1 : 0,
          zIndex: menuVisibility ? 10 : -10,
        }} // Animate to visible if menuVisibility is true, else animate to hidden
        exit={{ opacity: 0, zIndex: -10 }} // Exit state (hidden)
        transition={{ duration: 0.33 }} // Animation duration
      >
        <div className="p-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
            Saved Chats
          </p>
          <div className="flex items-start gap-2 flex-wrap justify-start">
            {savedChats.map((chat, index) => {
              // Check if chat.content and chat.content[0] are defined before accessing chat.content[0].content
              const rawQuestion =
                chat.content && chat.content[0] && chat.content[0].content
                  ? chat.content[0].content
                  : null;

              // Check if the question length is greater than 60 characters
              const question =
                rawQuestion && rawQuestion.length > 60
                  ? rawQuestion.substring(0, 60) + "..."
                  : rawQuestion;

              return (
                question && (
                  <Link href={`/ai/chat/${chat.id}?cid=${chat.id}`}>
                    <button
                      key={index}
                      className="text-xs hover:scale-[1.01] transition-all py-1 px-2 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 text-neutral-800 rounded-lg flex gap-2 items-center"
                    >
                      {question}
                    </button>
                  </Link>
                )
              );
            })}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Ai;
