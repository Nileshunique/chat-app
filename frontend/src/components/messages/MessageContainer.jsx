import { useEffect } from "react";
import useConvarsation from "../../zustand/useConvarsation";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { TiMessages } from "react-icons/ti"
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConvarsation, setSelectedConvarsation } = useConvarsation();

  useEffect(() => {

    // cleanup function
    return () => setSelectedConvarsation(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelectedConvarsation])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConvarsation ? (
        <NotStartedChat />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">{selectedConvarsation?.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer;

const NotStartedChat = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-sl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  )
}