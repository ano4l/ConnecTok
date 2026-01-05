'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppHeader } from '@/components/layout/app-header'
import { 
  Truck,
  Package,
  Home,
  DollarSign,
  MessageSquare,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  Wallet,
  ChevronRight
} from 'lucide-react'

interface Transaction {
  id: string
  orderId: string
  customer: string
  amount: number
  method: 'ecocash' | 'cabs-pay' | 'paynow'
  status: 'completed' | 'pending' | 'processing'
  date: string
}

export default function IncomePage() {
  const [period, setPeriod] = useState<string>('month')
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null)

  // Different stats based on selected period
  const getStatsForPeriod = () => {
    switch (period) {
      case 'week':
        return {
          totalIncome: 2850,
          pendingPayouts: 340,
          thisMonth: 2850,
          lastMonth: 2450,
          growth: 16.3
        }
      case 'month':
        return {
          totalIncome: 12450,
          pendingPayouts: 2340,
          thisMonth: 12450,
          lastMonth: 10890,
          growth: 14.3
        }
      case 'quarter':
        return {
          totalIncome: 35200,
          pendingPayouts: 4500,
          thisMonth: 35200,
          lastMonth: 29800,
          growth: 18.1
        }
      case 'year':
        return {
          totalIncome: 148900,
          pendingPayouts: 12300,
          thisMonth: 148900,
          lastMonth: 125600,
          growth: 18.6
        }
      default:
        return {
          totalIncome: 12450,
          pendingPayouts: 2340,
          thisMonth: 12450,
          lastMonth: 10890,
          growth: 14.3
        }
    }
  }

  const stats = getStatsForPeriod()

  const transactions: Transaction[] = [
    {
      id: 'TXN-001',
      orderId: 'ORD-2024-001',
      customer: 'Sunrise Supermarket',
      amount: 125.00,
      method: 'ecocash',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 'TXN-002',
      orderId: 'ORD-2024-002',
      customer: 'Metro Groceries',
      amount: 340.50,
      method: 'cabs-pay',
      status: 'completed',
      date: '2024-01-14'
    },
    {
      id: 'TXN-003',
      orderId: 'ORD-2024-003',
      customer: 'City Fresh Foods',
      amount: 89.00,
      method: 'paynow',
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: 'TXN-004',
      orderId: 'ORD-2024-004',
      customer: 'Quick Mart',
      amount: 215.75,
      method: 'ecocash',
      status: 'processing',
      date: '2024-01-13'
    },
    {
      id: 'TXN-005',
      orderId: 'ORD-2024-005',
      customer: 'Fresh & Easy',
      amount: 178.00,
      method: 'ecocash',
      status: 'completed',
      date: '2024-01-12'
    },
    {
      id: 'TXN-006',
      orderId: 'ORD-2024-006',
      customer: 'Budget Foods',
      amount: 456.25,
      method: 'cabs-pay',
      status: 'completed',
      date: '2024-01-11'
    }
  ]

  const getMethodBadge = (method: Transaction['method']) => {
    switch (method) {
      case 'ecocash':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ecocash</Badge>
      case 'cabs-pay':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">CABS Pay</Badge>
      case 'paynow':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">PayNow</Badge>
    }
  }

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <span className="text-green-600 text-sm">✓ Received</span>
      case 'pending':
        return <span className="text-yellow-600 text-sm">Pending</span>
      case 'processing':
        return <span className="text-blue-600 text-sm">Processing</span>
    }
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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Link href="/dashboard/supplier">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Income</h1>
            </div>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          
          {/* Period Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {[
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
              { key: 'quarter', label: 'Quarter' },
              { key: 'year', label: 'Year' }
            ].map((item) => (
              <Button
                key={item.key}
                variant={period === item.key ? 'default' : 'outline'}
                size="sm"
                className="rounded-full whitespace-nowrap"
                onClick={() => setPeriod(item.key)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-4 space-y-4">
        {/* Income Summary Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <p className="text-sm opacity-80 mb-1">Total Income ({period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : period === 'quarter' ? 'This Quarter' : 'This Year'})</p>
              <p className="text-4xl font-bold">${stats.totalIncome.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-300" />
                <span className="text-sm text-green-300">+{stats.growth}% from last period</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
              <div className="text-center">
                <p className="text-2xl font-semibold">${stats.thisMonth.toLocaleString()}</p>
                <p className="text-xs opacity-80">Current Period</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">${stats.pendingPayouts.toLocaleString()}</p>
                <p className="text-xs opacity-80">Pending Payouts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Withdraw</p>
                <p className="text-xs text-muted-foreground">To Ecocash</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Bank Transfer</p>
                <p className="text-xs text-muted-foreground">To CABS</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Recent Transactions</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {transactions.map((txn) => (
              <Card key={txn.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{txn.customer}</p>
                        {getMethodBadge(txn.method)}
                      </div>
                      <p className="text-sm text-muted-foreground">{txn.orderId} • {txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+${txn.amount.toFixed(2)}</p>
                      {getStatusBadge(txn.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t safe-area-pb">
        <div className="grid grid-cols-5 h-16">
          <Link href="/dashboard/supplier" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/dashboard/supplier/deliveries" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Truck className="h-5 w-5" />
            <span className="text-xs">Deliveries</span>
          </Link>
          <Link href="/dashboard/supplier/products" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Package className="h-5 w-5" />
            <span className="text-xs">Products</span>
          </Link>
          <Link href="/dashboard/supplier/income" className="flex flex-col items-center justify-center gap-1 text-primary">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs font-medium">Income</span>
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
