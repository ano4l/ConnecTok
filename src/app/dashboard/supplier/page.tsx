'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppHeader } from '@/components/layout/app-header'
import { 
  Plus, 
  Package,
  Truck,
  TrendingUp,
  Star,
  MessageSquare,
  Home,
  Settings,
  Edit,
  BarChart3,
  DollarSign,
  Search,
  Eye,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ArrowUpRight,
  ArrowDownRight
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
}

interface StockItem {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  unit: string
  price: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export default function SupplierDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const stats = [
    {
      title: 'Total Income',
      value: '$12,450',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'This month'
    },
    {
      title: 'Pending Deliveries',
      value: '8',
      change: '-2',
      changeType: 'positive',
      icon: Truck,
      description: 'Awaiting dispatch'
    },
    {
      title: 'Low Stock Items',
      value: '3',
      change: '+1',
      changeType: 'negative',
      icon: AlertTriangle,
      description: 'Need restocking'
    },
    {
      title: 'Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      description: 'Customer rating'
    }
  ]

  const deliveries: Delivery[] = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      customer: 'John Distributors',
      product: 'Fresh Tomatoes',
      quantity: '50kg',
      status: 'pending',
      address: '123 Enterprise Road, Harare',
      scheduledDate: '2024-01-15'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      customer: 'BuildRight Co',
      product: 'Cement Bags',
      quantity: '100 bags',
      status: 'in-transit',
      address: '456 Industrial Ave, Bulawayo',
      scheduledDate: '2024-01-15'
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      customer: 'FoodMart Ltd',
      product: 'Maize Flour',
      quantity: '200kg',
      status: 'picked-up',
      address: '789 Market Street, Mutare',
      scheduledDate: '2024-01-14'
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-004',
      customer: 'Metro Supplies',
      product: 'Sugar',
      quantity: '150kg',
      status: 'delivered',
      address: '321 Commerce Rd, Harare',
      scheduledDate: '2024-01-13'
    }
  ]

  const stockItems: StockItem[] = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      category: 'Agriculture',
      stock: 500,
      minStock: 100,
      unit: 'kg',
      price: 2.50,
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Maize Flour',
      category: 'Groceries',
      stock: 50,
      minStock: 100,
      unit: 'kg',
      price: 1.80,
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Cement Bags',
      category: 'Construction',
      stock: 200,
      minStock: 50,
      unit: 'bag',
      price: 12.00,
      status: 'in-stock'
    },
    {
      id: '4',
      name: 'Sugar',
      category: 'Groceries',
      stock: 0,
      minStock: 50,
      unit: 'kg',
      price: 1.50,
      status: 'out-of-stock'
    },
    {
      id: '5',
      name: 'Steel Rods',
      category: 'Construction',
      stock: 30,
      minStock: 50,
      unit: 'piece',
      price: 45.00,
      status: 'low-stock'
    }
  ]

  const incomeData = [
    { month: 'Jan', income: 8500, orders: 45 },
    { month: 'Feb', income: 9200, orders: 52 },
    { month: 'Mar', income: 10100, orders: 58 },
    { month: 'Apr', income: 11300, orders: 63 },
    { month: 'May', income: 12450, orders: 71 }
  ]

  const getDeliveryStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'delivered':
        return 'secondary'
      case 'in-transit':
        return 'default'
      case 'picked-up':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getStockStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'in-stock':
        return 'secondary'
      case 'low-stock':
        return 'outline'
      case 'out-of-stock':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    console.log(`Updating delivery ${deliveryId} to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <AppHeader 
        userRole="supplier" 
        userName="Green Farms Ltd" 
        userInitials="GF"
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className={`fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block`}>
          <div className="py-6 pr-6 lg:py-8">
            <nav className="flex flex-col gap-2">
              <Link href="/dashboard/supplier">
                <Button variant="secondary" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/supplier/deliveries">
                <Button variant="ghost" className="w-full justify-start">
                  <Truck className="mr-2 h-4 w-4" />
                  Deliveries
                </Button>
              </Link>
              <Link href="/dashboard/supplier/products">
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </Button>
              </Link>
              <Link href="/dashboard/supplier/income">
                <Button variant="ghost" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Income
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
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Supplier Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your deliveries, stock, and income
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                    <span className="ml-1">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="deliveries" className="space-y-4">
            <TabsList>
              <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
              <TabsTrigger value="stock">Stock Management</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
            </TabsList>

            {/* Deliveries Tab */}
            <TabsContent value="deliveries" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pending & Active Deliveries</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deliveries.map((delivery) => (
                      <div key={delivery.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                            <Truck className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{delivery.id}</span>
                              <Badge variant={getDeliveryStatusColor(delivery.status)}>
                                {delivery.status.replace('-', ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{delivery.product} - {delivery.quantity}</p>
                            <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              {delivery.address}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <p className="text-sm text-muted-foreground">
                            Scheduled: {delivery.scheduledDate}
                          </p>
                          <div className="flex gap-2">
                            {delivery.status === 'pending' && (
                              <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, 'picked-up')}>
                                Mark Picked Up
                              </Button>
                            )}
                            {delivery.status === 'picked-up' && (
                              <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, 'in-transit')}>
                                Start Delivery
                              </Button>
                            )}
                            {delivery.status === 'in-transit' && (
                              <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}>
                                Mark Delivered
                              </Button>
                            )}
                            {delivery.status === 'delivered' && (
                              <Badge variant="secondary">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                            <Button variant="outline" size="sm">
                              <Phone className="h-3 w-3 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stock Management Tab */}
            <TabsContent value="stock" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Stock Levels</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search products..." className="pl-8 w-[200px]" />
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Stock
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stockItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{item.name}</p>
                              <Badge variant={getStockStatusColor(item.status)}>
                                {item.status.replace('-', ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">${item.price}/{item.unit}</p>
                            <p className="text-xs text-muted-foreground">Price</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${item.stock <= item.minStock ? 'text-destructive' : ''}`}>
                              {item.stock} {item.unit}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Min: {item.minStock} {item.unit}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              Restock
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Low Stock Alert */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Low Stock Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stockItems.filter(item => item.status !== 'in-stock').map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Current: {item.stock} {item.unit} | Minimum: {item.minStock} {item.unit}
                          </p>
                        </div>
                        <Button size="sm" variant="destructive">
                          Restock Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Income Tab */}
            <TabsContent value="income" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,450</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12.5%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">71</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+8</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$175.35</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+$12.50</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Income Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incomeData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="w-12 text-sm font-medium">{data.month}</span>
                          <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden w-48">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(data.income / 15000) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${data.income.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{data.orders} orders</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Ecocash Payout</p>
                        <p className="text-sm text-muted-foreground">Jan 14, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+$3,250.00</p>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">CABS Pay Transfer</p>
                        <p className="text-sm text-muted-foreground">Jan 10, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+$2,800.00</p>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">PayNow International</p>
                        <p className="text-sm text-muted-foreground">Jan 5, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+$1,500.00</p>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link href="/dashboard/supplier" className="flex flex-col items-center justify-center gap-1 text-primary">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/dashboard/supplier/deliveries" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Truck className="h-5 w-5" />
            <span className="text-xs">Deliveries</span>
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
