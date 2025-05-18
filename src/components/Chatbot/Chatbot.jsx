import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { BsChatDotsFill } from "react-icons/bs"

const Chatbot = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const fetchBotResponse = async (messageHistory) => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
      
      if (!apiKey) {
        throw new Error("API key is missing")
      }
      
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an event planning assistant that specializes in budget planning and vendor recommendations. Provide helpful and detailed responses for event planning questions. If the user asks for a budget-specific plan, make sure to tailor your suggestions to fit within their mentioned budget. Include vendor recommendations when appropriate, with estimated costs and contact information examples.",
            },
            ...messageHistory.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      )

      const botReply = response.data.choices[0]?.message?.content

      if (botReply) {
        setMessages([...messageHistory, { text: botReply, sender: "bot" }])
      } else {
        throw new Error("Empty response from API")
      }
    } catch (error) {
      console.error("Chatbot API Error:", error)
      
      let errorMessage = "Sorry, I couldn't process that request."
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Authentication error. Please check your API key."
        } else if (error.response.status === 429) {
          errorMessage = "Rate limit exceeded. Please try again later."
        } else if (error.response.status === 500) {
          errorMessage = "OpenAI service is currently unavailable. Please try again later."
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your internet connection."
      } else if (error.message === "API key is missing") {
        errorMessage =
          "API key configuration issue. Please make sure your OpenAI API key is set in your environment variables."
      }
      
      setMessages([...messageHistory, { text: errorMessage, sender: "bot" }])
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    const newMessages = [...messages, { text: userMessage, sender: "user" }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    await fetchBotResponse(newMessages)
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    setTimeout(() => {
      const userMessage = suggestion
      const newMessages = [...messages, { text: userMessage, sender: "user" }]
      setMessages(newMessages)
      setInput("")
      setIsLoading(true)
      
      fetchBotResponse(newMessages)
    }, 10)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <BsChatDotsFill className="text-xl md:text-2xl" />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 md:right-6 w-[calc(100%-2rem)] max-w-sm bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden z-40">
          {/* Header */}
          <div className="flex justify-between items-center bg-purple-600 text-white p-3">
            <h3 className="text-lg font-semibold">Evently Chatbot</h3>
            <button 
              className="text-white hover:text-gray-200" 
              onClick={() => setIsOpen(false)} 
              aria-label="Close chat"
            >
              ✖
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-64 sm:h-72 md:h-80 overflow-y-auto p-3 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-4 space-y-2">
                <p className="font-medium">How can I help you plan your event?</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {[
                    "Create a budget plan for my wedding",
                    "Recommend vendors for a corporate event",
                    "Help me plan a birthday party for 50 people",
                    "Budget breakdown for a $5000 event",
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm py-1 px-3 rounded-full transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white rounded-tr-none"
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Ask about event planning..."
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                className={`px-4 py-2 rounded-r-lg font-medium 
                  ${
                    isLoading || !input.trim()
                      ? "bg-purple-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } 
                  text-white transition-colors`}
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot