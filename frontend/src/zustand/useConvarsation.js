import { create } from "zustand";

const useConvarsation = create((set) => {
  return {
    selectedConvarsation: null,
    setSelectedConvarsation: (selectedConvarsation) => {
      return set({ selectedConvarsation: selectedConvarsation })
    },
    messages: [],
    setMessages: (messages) => {
      return set({ messages: messages })
    }
  }
})

export default useConvarsation;