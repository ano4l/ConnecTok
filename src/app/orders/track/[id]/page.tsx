'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppHeader } from '@/components/layout/app-header'
import { 
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Navigation
} from 'lucide-react'

interface TimelineStep {
  id: number
  title: string
  description: string
  time: string
  status: 'completed' | 'current' | 'pending'
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [order] = useState({
    id: params.id || 'ORD-2024-001',
    product: 'Fresh Tomatoes',
    quantity: '50kg',
    supplier: 'Green Farms Ltd',
    supplierPhone: '+263 771 234 567',
    status: 'in-transit',
    estimatedDelivery: '2024-01-15, 2:00 PM',
    totalAmount: 125.00,
    paymentMethod: 'Ecocash',
    paymentStatus: 'Paid',
    deliveryAddress: '123 Main Street, Harare, Zimbabwe'
  })

  const timeline: TimelineStep[] = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      time: 'Jan 14, 9:00 AM',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Processing',
      description: 'Supplier is preparing your order',
      time: 'Jan 14, 10:30 AM',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Picked Up',
      description: 'Order picked up for delivery',
      time: 'Jan 14, 2:00 PM',
      status: 'completed'
    },
    {
      id: 4,
      title: 'In Transit',
      description: 'On the way to your location',
      time: 'Jan 15, 10:00 AM',
      status: 'current'
    },
    {
      id: 5,
      title: 'Delivered',
      description: 'Order delivered successfully',
      time: 'Estimated: Jan 15, 2:00 PM',
      status: 'pending'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-transit':
        return <Badge className="bg-blue-100 text-blue-700">In Transit</Badge>
      case 'delivered':
        return <Badge className="bg-green-100 text-green-700">Delivered</Badge>
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-700">Processing</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <AppHeader 
        userRole="buyer" 
        userName="John Doe" 
        userInitials="JD"
        showSearch={false}
      />

      <div className="sticky top-14 z-40 bg-background border-b">
        <div className="container py-3">
          <div className="flex items-center gap-2">
            <Link href="/orders">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Track Order</h1>
              <p className="text-sm text-muted-foreground">{order.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 space-y-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{order.product}</p>
                  <p className="text-sm text-muted-foreground">{order.quantity} from {order.supplier}</p>
                </div>
              </div>
              {getStatusBadge(order.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment</p>
                <p className="font-semibold text-green-600">{order.paymentStatus} via {order.paymentMethod}</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Delivery Address</p>
                  <p className="text-sm">{order.deliveryAddress}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Estimated Delivery</p>
                <p className="text-xl font-bold">{order.estimatedDelivery}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Delivery Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.map((step, index) => (
                <div key={step.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : step.status === 'current'
                          ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600 ring-offset-2'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : step.status === 'current' ? (
                        <Navigation className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${
                        step.status === 'completed' ? 'bg-green-300' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`font-medium ${
                      step.status === 'current' ? 'text-blue-600' : ''
                    }`}>{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-3">Need help with your order?</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Phone className="mr-2 h-4 w-4" />
                Call Supplier
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
