import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConvarsations = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([]);

  const getConversations = async () => {

    try {
      setLoading(true)
      const res = await fetch("/api/users")

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setConversations(data);

    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getConversations();
  }, [])

  return { loading, conversations }
}

export default useGetConvarsations