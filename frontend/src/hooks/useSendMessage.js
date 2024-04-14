import { useState } from "react";
import toast from "react-hot-toast";
import useConvarsation from "../zustand/useConvarsation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConvarsation, messages, setMessages } = useConvarsation();

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/send/${selectedConvarsation?._id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      })

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data])

    } catch (error) {
      setLoading(false)
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  return { loading, sendMessage }
}

export default useSendMessage