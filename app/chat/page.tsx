"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, FileText, ArrowLeft, Loader2, Lightbulb, Scale, History, Shield } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

const suggestedQuestions = [
  "What are the key risks in this contract?",
  "Can I terminate this agreement early?",
  "What are my financial obligations?",
  "Are there any automatic renewal clauses?",
  "What happens if I breach this contract?",
  "Can the other party change the terms?",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI legal assistant. I've analyzed your document and I'm ready to answer any questions you have about it. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim()
    if (!content || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    // Simulate AI response
    setTimeout(
      () => {
        const aiResponse = generateAIResponse(content)
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        }

        setMessages((prev) => prev.filter((m) => m.id !== "typing").concat(assistantMessage))
        setIsLoading(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("risk") || lowerQuestion.includes("danger")) {
      return "Based on my analysis of your rental agreement, I've identified several key risks:\n\n1. **Automatic Renewal Clause** (High Risk): The lease automatically renews for another full term unless you provide 60 days written notice. This could lock you into another year unexpectedly.\n\n2. **Maintenance Costs**: You're responsible for all maintenance costs above $100, which could add up significantly.\n\n3. **Joint Liability**: If you have roommates, you're each responsible for the full rent amount, not just your portion.\n\nWould you like me to explain any of these risks in more detail?"
    }

    if (lowerQuestion.includes("terminate") || lowerQuestion.includes("end") || lowerQuestion.includes("break")) {
      return "Regarding early termination of your rental agreement:\n\n**Standard Termination**: You can terminate at the end of the lease term by providing 30 days written notice.\n\n**Early Termination**: The contract includes an early termination clause that allows you to break the lease with:\n- 60 days written notice\n- Payment of 2 months' rent as penalty\n- Forfeiture of security deposit\n\n**Military Clause**: If you're active military, you may have additional protections under the Servicemembers Civil Relief Act.\n\nWould you like me to review the specific termination language in your contract?"
    }

    if (lowerQuestion.includes("financial") || lowerQuestion.includes("money") || lowerQuestion.includes("cost")) {
      return "Here are your key financial obligations from the rental agreement:\n\n**Monthly Payments**:\n- Base rent: $2,500/month\n- Due on the 1st of each month\n- Late fee: $50 if paid after the 5th\n\n**Upfront Costs**:\n- Security deposit: $2,500 (refundable)\n- First month's rent: $2,500\n- Last month's rent: $2,500\n\n**Additional Costs**:\n- Utilities: Your responsibility\n- Maintenance over $100: Your responsibility\n- Pet deposit: $500 (if applicable)\n\n**Total move-in cost**: $7,500\n\nIs there a specific financial aspect you'd like me to clarify?"
    }

    if (lowerQuestion.includes("renewal") || lowerQuestion.includes("automatic")) {
      return "Yes, your contract contains an automatic renewal clause in Section 12.3:\n\n**How it works**:\n- The lease automatically extends for another full 12-month term\n- This happens unless either party gives 60 days written notice\n- The notice must be delivered before the current lease expires\n\n**Important dates for your lease**:\n- Current lease ends: December 31, 2024\n- Latest notice date: November 1, 2024\n- Notice must be in writing and delivered to the landlord\n\n**Recommendation**: Set a calendar reminder for October 15th to decide whether to renew or give notice. This gives you buffer time before the November 1st deadline.\n\nWould you like me to explain what happens if you miss the notice deadline?"
    }

    // Default response
    return "That's a great question about your legal document. Based on my analysis, I can provide some insights, but I'd recommend reviewing the specific clauses related to your question.\n\nCould you be more specific about which section or aspect of the contract you're asking about? For example:\n- A particular clause or section number\n- A specific situation you're concerned about\n- Terms or language you don't understand\n\nThis will help me give you a more detailed and accurate answer."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
                <Link href="/analysis">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Analysis
                </Link>
              </Button>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">LegalClarify AI</h1>
                  <p className="text-sm text-gray-500 -mt-1">Demystifying Legal Documents</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Shield className="w-4 h-4 mr-2" />
                Privacy
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-6 py-8 max-w-4xl flex flex-col">
        <Card className="mb-6 bg-white border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              Document Context
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Rental Agreement</p>
                <p className="text-xs text-gray-500">12-month lease • Analyzed 5 minutes ago</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Ready for Questions
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 flex flex-col bg-white border-gray-200 shadow-sm">
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="w-8 h-8 bg-gray-100 border border-gray-200">
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                      <div
                        className={`rounded-lg px-4 py-3 ${
                          message.role === "user"
                            ? "bg-black text-white ml-auto"
                            : "bg-gray-50 border border-gray-200 text-gray-900"
                        }`}
                      >
                        {message.isTyping ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        ) : (
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                        )}
                      </div>
                      <div
                        className={`text-xs text-gray-500 mt-1 ${message.role === "user" ? "text-right" : "text-left"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="w-8 h-8 bg-gray-100 border border-gray-200">
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {messages.length === 1 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Suggested Questions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto py-2 px-3 text-xs bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => handleSendMessage(question)}
                      disabled={isLoading}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question about your document..."
                  disabled={isLoading}
                  className="flex-1 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send • This AI provides general information and is not a substitute for legal advice
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
