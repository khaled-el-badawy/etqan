import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./Chat.css";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";

/* =========================
   Mock Data
========================= */
const mockConversations = [
  {
    id: 1,
    name: "فاروق كامل",
    lastMessage: "هخلص بكرا الساعة 10",
    unread: 0,
    online: false,
    time: "11:27",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 2,
    name: "حسين مصطفي",
    lastMessage: "ابعتلي اللوكيشن",
    unread: 3,
    online: false,
    time: "11:27",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "علي السيد",
    lastMessage: "وصلت عند البيت",
    unread: 1,
    online: false,
    time: "11:27",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "محمد مؤمن",
    lastMessage: "هكون عندك في خلال ساعه",
    unread: 0,
    online: true,
    time: "11:27",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 5,
    name: "كمال محسن",
    lastMessage: "المشكلة اتحلت الحمد لله",
    unread: 0,
    online: false,
    time: "11:27",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    id: 6,
    name: "سالم محمد",
    lastMessage: "شكرًا جدا علي الشغل",
    unread: 0,
    online: false,
    time: "11:27",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    id: 7,
    name: "علاء السيد",
    lastMessage: "تمام فين العنوان؟",
    unread: 0,
    online: false,
    time: "11:27",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
];

const mockMessages = [
  { id: 1, text: "السلام عليكم", mine: false },
  { id: 2, text: "وعليكم السلام ورحمة الله", mine: true },
  { id: 3, text: "عامل ايه يا محمد؟", mine: false },
  { id: 4, text: "الحمد لله، تمام\nانت ايه الاخبار؟", mine: true },
  { id: 5, text: "كويس الحمدلله", mine: false },
  { id: 6, text: "هكون هناك في خلال ساعة", mine: true },
  { id: 7, text: "تمام هستناك", mine: false },
  { id: 8, text: "ان شاء الله", mine: true },
];

/* =========================
   Sub Components
========================= */

const Sidebar = ({ conversations, selectedChat, onSelect }) => {
  return (
    <div className="chat-sidebar">
      <h2 className="chat-sidebar__title">Messages</h2>

      <div className="chat-sidebar__search">
        <FaSearch className="chat-sidebar__search-icon" />
        <input
          type="text"
          className="chat-sidebar__search-input"
          placeholder="Search"
        />
      </div>

      <div className="chat-sidebar__list">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`chat-sidebar__item ${selectedChat?.id === conv.id ? "chat-sidebar__item--active" : ""
              }`}
            onClick={() => onSelect(conv)}
          >
            <div className="chat-sidebar__avatar-wrap">
              <img
                src={conv.avatar}
                alt={conv.name}
                className="chat-sidebar__avatar"
              />
              {conv.online && (
                <span className="chat-sidebar__online-dot"></span>
              )}
            </div>

            <div className="chat-sidebar__info">
              <div className="chat-sidebar__row">
                <span className="chat-sidebar__name">{conv.name}</span>
                <span className="chat-sidebar__time">{conv.time}</span>
              </div>

              <div className="chat-sidebar__row">
                <span className="chat-sidebar__last-msg">
                  {conv.lastMessage}
                </span>
                {conv.unread > 0 && (
                  <span className="chat-sidebar__badge">{conv.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatHeader = ({ user }) => {
  if (!user) return null;

  return (
    <div className="chat-header">
      <div className="chat-header__user">
        <img
          src={user.avatar}
          alt={user.name}
          className="chat-header__avatar"
        />
        <div className="chat-header__details">
          <div className="chat-header__name">{user.name}</div>
          <div className="chat-header__status">
            {user.online ? "online" : "offline"}
          </div>
        </div>
      </div>

      {/* <button className="chat-header__call-btn" aria-label="Call">
        <FaPhoneAlt />
      </button> */}
    </div>
  );
};

const MessagesList = ({ messages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll only within the messages container, not the page
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-messages" ref={containerRef}>
      {/* Today divider */}
      <div className="chat-messages__divider">
        <span>Today</span>
      </div>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-messages__bubble ${
            msg.mine ? "chat-messages__bubble--mine" : "chat-messages__bubble--other"
          }`}
        >
          {msg.text && <span>{msg.text}</span>}
          {msg.image && (
            <img src={msg.image} alt="" className="chat-messages__img" />
          )}
        </div>
      ))}
    </div>
  );
};

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-input">
      <div className="chat-input__wrapper">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a messages"
          className="chat-input__field"
        />
        <input type="file" id="fileInput" style={{ display: "none" }} />
        <label htmlFor="fileInput" className="chat-input__attach">
          <GrAttachment />
        </label>
        <button onClick={handleSend} className="chat-input__send" aria-label="Send" type="button">
          <IoSend />
        </button>
      </div>
    </div>
  );
};

const ChatArea = ({ selectedChat, messages, onSend }) => {
  if (!selectedChat)
    return <div className="chat-area chat-area--empty">اختر محادثة</div>;

  return (
    <div className="chat-area">
      <ChatHeader user={selectedChat} />
      <MessagesList messages={messages} />
      <MessageInput onSend={onSend} />
    </div>
  );
};

/* =========================
   Main Page
========================= */

const Chat = () => {
  // Fix: force scroll to top on mount - multiple attempts to handle AOS
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Multiple timed resets to counteract AOS and deferred layout shifts
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    const t1 = setTimeout(scrollToTop, 0);
    const t2 = setTimeout(scrollToTop, 50);
    const t3 = setTimeout(scrollToTop, 100);
    const t4 = setTimeout(scrollToTop, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const [conversations] = useState(mockConversations);
  const [selectedChat, setSelectedChat] = useState(
    mockConversations.find((c) => c.id === 0) //  default
  );
  const [messages, setMessages] = useState(mockMessages);

  // لما يضغط Esc → يقفل الشات المفتوح
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedChat(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSend = (text) => {
    const newMsg = {
      id: Date.now(),
      text,
      mine: true,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="chat-page">
      <div className="chat-layout">
        <Sidebar
          conversations={conversations}
          selectedChat={selectedChat}
          onSelect={setSelectedChat}
        />
        <ChatArea
          selectedChat={selectedChat}
          messages={messages}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
