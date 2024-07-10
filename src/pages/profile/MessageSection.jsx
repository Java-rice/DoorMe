import React, { useState, useRef, useEffect } from 'react';

const MessageSection = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [typing, setTyping] = useState(false);

  const currentUser = {
    id: 0,
    name: "Current User",
    avatar: "https://placehold.co/50x50"
  };

  const initialMessages = [
    { id: 1, name: "Nichole Alpapara", message: "Pwede niyo po ma-visit yung room set lang po kayo ng schedule sa amin", time: "Today | 04:45 PM", avatar: "https://placehold.co/50x50" },
    { id: 2, name: "John Mark", message: "Is the apartment still available?", time: "Today | 05:30 PM", avatar: "https://placehold.co/50x50" },
    { id: 3, name: "Adrian Rafael", message: "Hello po! gusto ko lang po itanong kung kelan po pwede makita apartment", time: "Today | 05:30 PM", avatar: "https://placehold.co/50x50" },
    { id: 4, name: "Kurt Denver", message: "Hi ate open for lease pa rin po ba yung nakapost na apartment niyo dito??", time: "Today | 05:30 PM", avatar: "https://placehold.co/50x50" },
    { id: 5, name: "John Patrick", message: "Is the apartment still available?", time: "Today | 05:30 PM", avatar: "https://placehold.co/50x50" },
  ];

  const initialChatMessages = {
    1: [
      { text: "Hi po! Ask ko lang kung meron po bang heater yung shower niyo po", senderId: 1, time: "04:45 PM" },
      { text: "Hello! Yes po meron po :)", senderId: 0, time: "04:46 PM" }
    ],
    2: [],
    3: [],
    4: [],
    5: []
  };

  const [chatMessages, setChatMessages] = useState(initialChatMessages);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, activeChat]);

  const handleChatClick = (id) => {
    setActiveChat(id);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;

    const newMessage = {
      text: messageInput,
      senderId: currentUser.id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prevChatMessages => {
      const updatedMessages = { ...prevChatMessages };
      if (!updatedMessages[activeChat]) {
        updatedMessages[activeChat] = [];
      }
      updatedMessages[activeChat].push(newMessage);
      return updatedMessages;
    });

    setMessageInput("");
    setTyping(false);
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    setTyping(true);
  };

  const filteredChats = initialMessages.filter(chat =>
    chat.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-gray-300 p-4">
        <input 
          type="text" 
          placeholder="Search or start a new chat" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {filteredChats.map((chat) => (
          <div 
            key={chat.id} 
            className={`flex items-center p-2 mb-2 cursor-pointer ${activeChat === chat.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => handleChatClick(chat.id)}
          >
            <img 
              src={chat.avatar} 
              alt={chat.name} 
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{chat.name}</span>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        {activeChat ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">{initialMessages.find(chat => chat.id === activeChat).name}</h2>
            <div className="flex-1 overflow-auto mb-4" ref={chatContainerRef}>
              <div className="flex flex-col space-y-4">
                {chatMessages[activeChat].map((message, index) => (
                  <div key={index} className={`flex ${message.senderId === currentUser.id ? "justify-end" : "justify-start"}`}>
                    <div className={`p-2 ${message.senderId === currentUser.id ? "bg-blue-500 text-white" : "bg-gray-200"} rounded-lg`}>
                      {message.text}
                      <div className="text-xs text-gray-500 mt-1">{message.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {typing && <div className="text-sm text-gray-500 mb-2">Typing...</div>}
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type your message here..." 
                className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                value={messageInput}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                    e.preventDefault();
                  }
                }}
              />
              <button 
                className="p-2 bg-blue-500 text-white rounded-r-lg"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-500 flex items-center justify-center flex-1">Select a chat to view messages</div>
        )}
      </div>
    </div>
  );
};

export default MessageSection;
