import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConvarsation from "../zustand/useConvarsation"
import notification from "./../assets/audios/notification.wav";

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useConvarsation()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessages([...messages, newMessage])
    })
    return () => socket.off("newMessage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, setMessages, messages]);

}

export default useListenMessages