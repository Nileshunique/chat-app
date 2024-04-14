import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(message.trim())) return;
    await sendMessage(message)
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={loading}>
          {loading ? <span className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput