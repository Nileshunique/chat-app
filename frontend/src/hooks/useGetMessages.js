import { useEffect, useState } from "react";
import useConvarsation from "../zustand/useConvarsation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConvarsation, setMessages } = useConvarsation();

  const getMessages = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/messages/${selectedConvarsation?._id}`)
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(data);

    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedConvarsation?._id) {
      getMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConvarsation?._id]);

  return { loading, messages };
}

export default useGetMessages