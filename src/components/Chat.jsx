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
    online: true,
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.trim().toLowerCase();
    return (
      conv.name.toLowerCase().includes(term) ||
      conv.lastMessage.toLowerCase().includes(term)
    );
  });

  return (
    <div className="chat-sidebar">
      <h2 className="chat-sidebar__title">Messages</h2>

      <div className="chat-sidebar__search">
        <FaSearch className="chat-sidebar__search-icon" />
        <input
          type="text"
          className="chat-sidebar__search-input"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="chat-sidebar__list">
        {filteredConversations.length === 0 ? (
          <div className="chat-sidebar__empty">لا توجد نتائج</div>
        ) : (
          filteredConversations.map((conv) => (
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
          ))
        )}
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
  const [imagePreview, setImagePreview] = useState(null); // data URL
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  /* ---------- helpers ---------- */
  const readFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  /* ---------- file input ---------- */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    readFile(file);
    // reset so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------- drag & drop ---------- */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    dragCounter.current = 0;
    const file = e.dataTransfer.files?.[0];
    readFile(file);
  };

  /* ---------- send ---------- */
  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;
    onSend(input.trim(), imagePreview);
    setInput("");
    setImagePreview(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className={`chat-input ${dragging ? "chat-input--drag-over" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Image preview */}
      {imagePreview && (
        <div className="chat-input__preview">
          <div className="chat-input__preview-item">
            <img src={imagePreview} alt="preview" className="chat-input__preview-img" />
            <button
              className="chat-input__preview-close"
              onClick={() => setImagePreview(null)}
              aria-label="Remove image"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="chat-input__wrapper">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="chat-input__field"
        />
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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

  const handleSend = (text, image) => {
    const newMsg = {
      id: Date.now(),
      text: text || "",
      image: image || null,
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
