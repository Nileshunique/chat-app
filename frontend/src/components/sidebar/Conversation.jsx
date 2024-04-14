import { useSocketContext } from "../../context/SocketContext";
import useConvarsation from "../../zustand/useConvarsation";

const Conversation = (props) => {
  const { data, emoji, lastIndex } = props;
  const { selectedConvarsation, setSelectedConvarsation } = useConvarsation();

  const isSelected = selectedConvarsation?._id === data._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(data._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConvarsation(data)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={data.profilePic}
              alt="user Avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold tact-gray-200 ">{data.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {lastIndex ? null : <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default Conversation