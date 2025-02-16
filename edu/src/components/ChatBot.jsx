import React, { useState } from "react";
// Example icons from lucide-react; feel free to use any other icon library
import { MessageSquare, X, Paperclip } from "lucide-react";

/**
 * ChatBot Component
 * - Floating button to open/close chat
 * - A chat window with:
 *    - message list (user + bot)
 *    - text input
 *    - optional file attachment
 * - Sends data (query + file) to /api/chatbot/process
 */

const VITE_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";

function ChatBot() {
  // Whether the chat window is open
  const [isOpen, setIsOpen] = useState(false);

  // Current conversation messages
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);

  // Text input
  const [inputText, setInputText] = useState("");

  // Selected file (optional)
  const [selectedFile, setSelectedFile] = useState(null);

  // Loading state (optional, to show spinner or "typing" indicator)
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Toggle the chatbot window
   */
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * Handle file selection
   */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  /**
   * Handle sending message + optional file to the backend
   */
  const handleSend = async () => {
    // Don’t submit if user hasn’t entered text and no file is selected
    if (!inputText.trim() && !selectedFile) return;

    // Add user's message to the conversation
    if (inputText.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: inputText }]);
    }

    // Clear input
    setInputText("");
    setIsLoading(true);

    try {
      // Build multipart/form-data
      const formData = new FormData();
      // "query" is the field name for the user’s text query
      formData.append("query", inputText);
      // "file" is optional
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      console.log(formData);
      // Make API call
      const res = await fetch(`${VITE_BASE_URL}/chatbot/process`, {
        method: "POST",
        headers: {
          // Let the browser set the proper 'Content-Type' boundaries for multipart.
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to get chatbot response.");
      }

      const data = await res.json();

      // Bot’s reply: data.answer
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.answer || "No response." },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // In case of error, you can show a fallback message
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      // Reset file and loading state
      setSelectedFile(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating button (bottom-right) */}
      <button
        onClick={toggleChat}
        className="
          fixed bottom-4 right-4
          bg-primary text-white
          rounded-full p-3
          shadow-lg
          flex items-center justify-center
          hover:bg-primary-focus
        "
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageSquare className="w-9 h-9" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="
            fixed bottom-20 right-4
            w-80 md:w-96
            bg-base-100
            border border-base-300
            shadow-xl
            rounded-lg
            flex flex-col
            max-h-[70vh]
          "
        >
          {/* Header */}
          <div className="bg-base-200 px-4 py-2 flex items-center justify-between rounded-t-lg">
            <h2 className="font-bold">ChatBot</h2>
            <button onClick={toggleChat}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    rounded-lg p-2 max-w-xs
                    ${
                      msg.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-base-200"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-base-200 rounded-lg p-2 max-w-xs italic text-sm">
                  Bot is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input row */}
          <div className="p-2 border-t border-base-300 flex items-center gap-2">
            {/* File upload button */}
            <label
              htmlFor="file-upload"
              className="btn btn-ghost btn-square"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            {/* Show the file name if selected */}
            {selectedFile && (
              <span
                className="text-xs italic truncate w-16"
                title={selectedFile.name}
              >
                {selectedFile.name}
              </span>
            )}

            {/* Text input */}
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered w-full"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            {/* Send button */}
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
