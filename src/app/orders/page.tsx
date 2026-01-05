'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AppHeader } from '@/components/layout/app-header'
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  Eye,
  MessageSquare,
  RotateCcw,
  Home,
  ShoppingCart,
  Heart,
  User
} from 'lucide-react'

interface Order {
  id: string
  product: string
  supplier: string
  quantity: string
  amount: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  estimatedDelivery?: string
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const orders: Order[] = [
    {
      id: 'ORD-001',
      product: 'Fresh Tomatoes',
      supplier: 'Green Farms Ltd',
      quantity: '50kg',
      amount: '$125.00',
      status: 'shipped',
      date: '2024-01-14',
      estimatedDelivery: '2024-01-16'
    },
    {
      id: 'ORD-002',
      product: 'Cement Bags',
      supplier: 'BuildRight Supplies',
      quantity: '100 bags',
      amount: '$1,200.00',
      status: 'processing',
      date: '2024-01-13',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'ORD-003',
      product: 'Maize Flour',
      supplier: 'Millers Co-op',
      quantity: '200kg',
      amount: '$360.00',
      status: 'delivered',
      date: '2024-01-10'
    },
    {
      id: 'ORD-004',
      product: 'Steel Rods',
      supplier: 'MetalWorks Inc',
      quantity: '50 pieces',
      amount: '$2,250.00',
      status: 'pending',
      date: '2024-01-14',
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'ORD-005',
      product: 'Sugar',
      supplier: 'Sweet Supplies',
      quantity: '100kg',
      amount: '$180.00',
      status: 'cancelled',
      date: '2024-01-08'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'processing':
        return <Package className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'delivered':
        return 'secondary'
      case 'cancelled':
        return 'destructive'
      case 'shipped':
        return 'default'
      default:
        return 'outline'
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        userRole="buyer" 
        userName="John Doe" 
        userInitials="JD"
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className={`fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block`}>
          <div className="py-6 pr-6 lg:py-8">
            <nav className="flex flex-col gap-2">
              <Link href="/dashboard/buyer">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="ghost" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Explore
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="secondary" className="w-full justify-start">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  My Orders
                </Button>
              </Link>
              <Link href="/saved">
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="mr-2 h-4 w-4" />
                  Saved Items
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </Link>
              <Separator className="my-2" />
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your orders</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="flex-shrink-0"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <Badge variant="secondary" className="ml-2">
                  {statusCounts[status as keyof typeof statusCounts]}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'Try adjusting your search' : 'You haven\'t placed any orders yet'}
                  </p>
                  <Button asChild>
                    <Link href="/explore">Start Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{order.id}</span>
                            <Badge variant={getStatusVariant(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{order.product}</h3>
                          <p className="text-sm text-muted-foreground">{order.supplier}</p>
                          <p className="text-sm text-muted-foreground">{order.quantity}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <p className="text-lg font-bold">{order.amount}</p>
                        <p className="text-xs text-muted-foreground">Ordered: {order.date}</p>
                        {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <p className="text-xs text-muted-foreground">ETA: {order.estimatedDelivery}</p>
                        )}
                        <div className="flex gap-2">
                          {order.status !== 'cancelled' && order.status !== 'delivered' && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/track/${order.id}`}>
                                <Eye className="mr-1 h-3 w-3" />
                                Track
                              </Link>
                            </Button>
                          )}
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              <RotateCcw className="mr-1 h-3 w-3" />
                              Reorder
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-1 h-3 w-3" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
