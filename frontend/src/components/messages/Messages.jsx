import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, 100);
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages?.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
      {loading && (
        <>
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </>
      )}
      {messages?.map((item, index) => (
        <div ref={lastMessageRef} key={index}>
          <Message data={item} />
        </div>
      ))}
    </div>
  )
}

export default Messages