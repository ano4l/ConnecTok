'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppHeader } from '@/components/layout/app-header'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Truck,
  Package,
  Home,
  DollarSign,
  MessageSquare,
  Settings,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  ArrowLeft,
  Navigation,
  AlertCircle
} from 'lucide-react'

interface Delivery {
  id: string
  orderId: string
  customer: string
  product: string
  quantity: string
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered'
  address: string
  scheduledDate: string
  phone: string
}

export default function DeliveriesPage() {
  const [filter, setFilter] = useState<string>('all')
  const [expandedDelivery, setExpandedDelivery] = useState<string | null>(null)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 'DEL-001',
      orderId: 'ORD-2024-001',
      customer: 'Sunrise Supermarket',
      product: 'Fresh Tomatoes',
      quantity: '50kg',
      status: 'pending',
      address: '123 Main St, Harare',
      scheduledDate: '2024-01-15',
      phone: '+263 771 234 567'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-2024-002',
      customer: 'Metro Groceries',
      product: 'Maize Flour',
      quantity: '100kg',
      status: 'picked-up',
      address: '456 Market Ave, Bulawayo',
      scheduledDate: '2024-01-15',
      phone: '+263 772 345 678'
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-2024-003',
      customer: 'City Fresh Foods',
      product: 'Onions',
      quantity: '30kg',
      status: 'in-transit',
      address: '789 Commerce Rd, Mutare',
      scheduledDate: '2024-01-14',
      phone: '+263 773 456 789'
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-2024-004',
      customer: 'Quick Mart',
      product: 'Potatoes',
      quantity: '75kg',
      status: 'delivered',
      address: '321 Trade St, Gweru',
      scheduledDate: '2024-01-13',
      phone: '+263 774 567 890'
    }
  ])

  const handleStatusUpdate = (delivery: Delivery, newStatus: Delivery['status']) => {
    setDeliveries(deliveries.map(d => 
      d.id === delivery.id ? { ...d, status: newStatus } : d
    ))
    setShowStatusDialog(false)
    setSelectedDelivery(null)
  }

  const getNextStatus = (currentStatus: Delivery['status']): Delivery['status'] | null => {
    switch (currentStatus) {
      case 'pending':
        return 'picked-up'
      case 'picked-up':
        return 'in-transit'
      case 'in-transit':
        return 'delivered'
      default:
        return null
    }
  }

  const getStatusAction = (status: Delivery['status']) => {
    switch (status) {
      case 'pending':
        return 'Start Delivery'
      case 'picked-up':
        return 'Mark In Transit'
      case 'in-transit':
        return 'Mark Delivered'
      default:
        return null
    }
  }

  const getStatusBadge = (status: Delivery['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'picked-up':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Picked Up</Badge>
      case 'in-transit':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Transit</Badge>
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>
    }
  }

  const filteredDeliveries = filter === 'all' 
    ? deliveries 
    : deliveries.filter(d => d.status === filter)

  const statusCounts = {
    all: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    'in-transit': deliveries.filter(d => d.status === 'picked-up' || d.status === 'in-transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        userRole="supplier" 
        userName="Green Farms" 
        userInitials="GF"
        showSearch={false}
      />

      {/* Mobile Sub Header */}
      <div className="sticky top-14 z-40 bg-background border-b">
        <div className="container py-3">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/dashboard/supplier">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Deliveries</h1>
          </div>
          
          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {[
              { key: 'all', label: 'All', count: statusCounts.all },
              { key: 'pending', label: 'Pending', count: statusCounts.pending },
              { key: 'in-transit', label: 'Active', count: statusCounts['in-transit'] },
              { key: 'delivered', label: 'Completed', count: statusCounts.delivered }
            ].map((item) => (
              <Button
                key={item.key}
                variant={filter === item.key ? 'default' : 'outline'}
                size="sm"
                className="rounded-full whitespace-nowrap"
                onClick={() => setFilter(item.key)}
              >
                {item.label}
                <span className="ml-1.5 text-xs opacity-70">({item.count})</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="container py-4 space-y-3">
        {filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium">{delivery.customer}</p>
                  <p className="text-sm text-muted-foreground">{delivery.orderId}</p>
                </div>
                {getStatusBadge(delivery.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>{delivery.product} - {delivery.quantity}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{delivery.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{delivery.scheduledDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {getStatusAction(delivery.status) && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      const nextStatus = getNextStatus(delivery.status)
                      if (nextStatus) {
                        setSelectedDelivery(delivery)
                        setShowStatusDialog(true)
                      }
                    }}
                  >
                    {getStatusAction(delivery.status)}
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setExpandedDelivery(expandedDelivery === delivery.id ? null : delivery.id)}
                >
                  <ChevronRight className={`mr-2 h-4 w-4 transition-transform ${expandedDelivery === delivery.id ? 'rotate-90' : ''}`} />
                  Details
                </Button>
              </div>

              {/* Expanded Details */}
              {expandedDelivery === delivery.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Customer Contact</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Customer
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone Number</p>
                        <p className="text-sm font-medium">{delivery.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Delivery Address</p>
                        <p className="text-sm font-medium">{delivery.address}</p>
                      </div>
                    </div>
                  </div>
                  {delivery.status !== 'delivered' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedDelivery(delivery)
                        setShowStatusDialog(true)
                      }}
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Update Status
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Delivery Status</DialogTitle>
            <DialogDescription>
              Update the status for {selectedDelivery?.customer}'s delivery
            </DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">{selectedDelivery.product}</p>
                <p className="text-xs text-muted-foreground">{selectedDelivery.orderId}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Current Status:</p>
                {getStatusBadge(selectedDelivery.status)}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Update to:</p>
                <div className="flex flex-col gap-2">
                  {selectedDelivery.status === 'pending' && (
                    <Button 
                      onClick={() => handleStatusUpdate(selectedDelivery, 'picked-up')}
                      className="w-full justify-start"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Picked Up
                    </Button>
                  )}
                  {selectedDelivery.status === 'picked-up' && (
                    <Button 
                      onClick={() => handleStatusUpdate(selectedDelivery, 'in-transit')}
                      className="w-full justify-start"
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Mark as In Transit
                    </Button>
                  )}
                  {selectedDelivery.status === 'in-transit' && (
                    <Button 
                      onClick={() => handleStatusUpdate(selectedDelivery, 'delivered')}
                      className="w-full justify-start"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Delivered
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t safe-area-pb">
        <div className="grid grid-cols-5 h-16">
          <Link href="/dashboard/supplier" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/dashboard/supplier/deliveries" className="flex flex-col items-center justify-center gap-1 text-primary">
            <Truck className="h-5 w-5" />
            <span className="text-xs font-medium">Deliveries</span>
          </Link>
          <Link href="/dashboard/supplier/products" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Package className="h-5 w-5" />
            <span className="text-xs">Products</span>
          </Link>
          <Link href="/dashboard/supplier/income" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs">Income</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Messages</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
