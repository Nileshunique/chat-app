import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime";
import useConvarsation from "../../zustand/useConvarsation";

const Message = (props) => {
  const { data } = props
  const { authUser } = useAuthContext();
  const { selectedConvarsation } = useConvarsation();
  const fromMe = data.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser?.profilePic : selectedConvarsation?.profilePic
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Profile Pic"
              src={profilePic}
            />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>
          {data.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {extractTime(data.createdAt)}
        </div>
      </div>
    </div>
  )
}

export default Message