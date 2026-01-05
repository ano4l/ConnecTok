'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { AppHeader } from '@/components/layout/app-header'
import { 
  Search, 
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  ArrowLeft,
  Smile,
  Image as ImageIcon,
  Home,
  ShoppingCart,
  Heart,
  User
} from 'lucide-react'

interface Message {
  id: string
  sender: 'me' | 'other'
  content: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}

interface Conversation {
  id: string
  name: string
  role: 'supplier' | 'buyer'
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  rating?: number
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>('1')
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileShowChat, setMobileShowChat] = useState(false)

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Green Farms Ltd',
      role: 'supplier',
      lastMessage: 'Yes, we can deliver by tomorrow',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      rating: 4.8
    },
    {
      id: '2',
      name: 'BuildRight Supplies',
      role: 'supplier',
      lastMessage: 'The cement bags are ready for pickup',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      rating: 4.6
    },
    {
      id: '3',
      name: 'John Distributors',
      role: 'buyer',
      lastMessage: 'Can you provide a bulk discount?',
      timestamp: '3 hours ago',
      unread: 1,
      online: true,
      rating: 4.9
    },
    {
      id: '4',
      name: 'FoodMart Ltd',
      role: 'buyer',
      lastMessage: 'Thank you for the quick delivery',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      rating: 4.7
    }
  ]

  const messages: Message[] = [
    {
      id: '1',
      sender: 'other',
      content: 'Hello! I\'m interested in ordering fresh tomatoes',
      timestamp: '10:30 AM',
      status: 'read'
    },
    {
      id: '2',
      sender: 'me',
      content: 'Great! We have fresh tomatoes available. How much do you need?',
      timestamp: '10:32 AM',
      status: 'read'
    },
    {
      id: '3',
      sender: 'other',
      content: 'I need about 50kg. What\'s your best price?',
      timestamp: '10:35 AM',
      status: 'read'
    },
    {
      id: '4',
      sender: 'me',
      content: 'For 50kg, I can offer $2.30 per kg. That\'s $115 total.',
      timestamp: '10:36 AM',
      status: 'read'
    },
    {
      id: '5',
      sender: 'other',
      content: 'That sounds good. Can you deliver by tomorrow?',
      timestamp: '10:40 AM',
      status: 'read'
    },
    {
      id: '6',
      sender: 'me',
      content: 'Yes, we can deliver by tomorrow',
      timestamp: '10:42 AM',
      status: 'delivered'
    }
  ]

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('')
    }
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <AppHeader 
          userRole="buyer" 
          userName="John Doe" 
          userInitials="JD"
          showSearch={false}
        />
      </div>
      
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="container flex h-14 items-center">
          <Link href="/dashboard/buyer">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="font-semibold ml-2">Messages</span>
        </div>
      </header>

      <div className="container h-[calc(100vh-3.5rem)] flex">
        {/* Conversations List */}
        <div className={`${mobileShowChat ? 'hidden' : 'flex'} lg:flex flex-col w-full lg:w-80 border-r`}>
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation.id)
                  setMobileShowChat(true)
                }}
                className={`w-full p-4 flex items-start gap-3 hover:bg-accent transition-colors ${
                  selectedConversation === conversation.id ? 'bg-accent' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium truncate">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {conversation.role}
                    </Badge>
                    {conversation.unread > 0 && (
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${mobileShowChat ? 'flex' : 'hidden'} lg:flex flex-col flex-1`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setMobileShowChat(false)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{selectedConv.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConv.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConv.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className={`text-xs ${
                          message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp}
                        </span>
                        {message.sender === 'me' && (
                          <CheckCheck className={`h-3 w-3 ${
                            message.status === 'read' ? 'text-blue-400' : 'text-primary-foreground/70'
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 md:p-4 border-t bg-background">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 flex flex-col gap-2">
                    <textarea
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="flex-1 min-h-[44px] max-h-32 px-4 py-3 text-base rounded-lg border border-input bg-background resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      rows={1}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    size="icon" 
                    className="h-10 w-10 flex-shrink-0"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">No conversation selected</p>
                <p className="text-sm">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
