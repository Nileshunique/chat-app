import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
  try {

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }


    const newMessage = new Message({ senderId, receiverId, message })
    if (!newMessage) {
      return res.status(404).json({ message: "Error in creating Message" })
    }

    conversation.messages.push(newMessage._id);

    // await conversation.save();
    // await newMessage.save();
    // this will run in parallel
    Promise.all([conversation.save(), newMessage.save()])

    // Soxket IO implemantation

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific clients
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error sending message: ", error.message);
    return res.status(404).json({ message: "Internal Server Error" })
  }
}

export const getMessage = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    return res.status(201).json(conversation.messages);

  } catch (error) {
    console.log("Error geting message: ", error.message);
    return res.status(404).json({ message: "Internal Server Error" })
  }
};