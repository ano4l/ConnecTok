'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Bell,
  Menu,
  X,
  Search,
  MessageSquare,
  LogOut,
  User,
  Settings,
  ShoppingCart,
  Package,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'order' | 'message' | 'alert' | 'system'
}

interface AppHeaderProps {
  userRole: 'buyer' | 'supplier'
  userName?: string
  userInitials?: string
  showSearch?: boolean
  onMenuToggle?: () => void
  mobileMenuOpen?: boolean
}

export function AppHeader({
  userRole,
  userName = 'User',
  userInitials = 'U',
  showSearch = true,
  onMenuToggle,
  mobileMenuOpen = false
}: AppHeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #ORD-001 has been placed',
      time: '5 min ago',
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'Message from Green Farms',
      message: 'Your order is ready for pickup',
      time: '1 hour ago',
      read: false,
      type: 'message'
    },
    {
      id: '3',
      title: 'Low Stock Alert',
      message: 'Maize Flour is running low',
      time: '2 hours ago',
      read: true,
      type: 'alert'
    },
    {
      id: '4',
      title: 'Payment Confirmed',
      message: 'Ecocash payment of $125 received',
      time: '1 day ago',
      read: true,
      type: 'system'
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />
      case 'message':
        return <MessageSquare className="h-4 w-4" />
      case 'alert':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const handleLogout = () => {
    router.push('/auth/signin')
  }

  const dashboardLink = userRole === 'buyer' ? '/dashboard/buyer' : '/dashboard/supplier'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {onMenuToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={onMenuToggle}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
        
        <Link href={dashboardLink} className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CT</span>
          </div>
          <span className="font-bold hidden sm:inline-block">ConnecTok</span>
        </Link>

        {showSearch && (
          <div className="flex-1 px-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {!showSearch && <div className="flex-1" />}

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowUserMenu(false)
              }}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md border bg-popover p-0 shadow-lg">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 hover:bg-accent cursor-pointer ${
                        !notification.read ? 'bg-accent/50' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <Button variant="ghost" className="w-full" size="sm">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/messages">
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                setShowUserMenu(!showUserMenu)
                setShowNotifications(false)
              }}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-lg">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                </div>
                <Separator className="my-1" />
                <Link href="/profile">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm hover:bg-accent cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm hover:bg-accent cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Settings
                  </div>
                </Link>
                <Separator className="my-1" />
                <div 
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm hover:bg-accent cursor-pointer text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
