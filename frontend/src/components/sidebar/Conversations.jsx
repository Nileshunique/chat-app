import useGetConvarsations from "../../hooks/useGetConvarsations"
import getRandomEmoji from "../../utils/emojis";
import Conversation from "./Conversation"

const Conversations = () => {
  const { loading, conversations } = useGetConvarsations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? <span className="loading loading-spinner" /> : null}
      {conversations?.map((item, index) => (
        <Conversation
          key={index}
          data={item}
          emoji={getRandomEmoji()}
          lastIndex={index === conversations.length - 1}
        />
      ))}
    </div>
  )
}

export default Conversations