'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AppHeader } from '@/components/layout/app-header'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Search, 
  ShoppingCart, 
  Package,
  Truck,
  Star,
  User,
  Home,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  Heart
} from 'lucide-react'

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [orderQuantity, setOrderQuantity] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')

  const categories = [
    { id: 'all', name: 'All', icon: Package },
    { id: 'agriculture', name: 'Agriculture', icon: Package },
    { id: 'construction', name: 'Construction', icon: Truck },
    { id: 'groceries', name: 'Groceries', icon: ShoppingCart },
    { id: 'tuckshop', name: 'Tuckshop', icon: Package },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      supplier: 'Green Farms Ltd',
      price: 2.50,
      unit: 'kg',
      rating: 4.8,
      reviews: 124,
      location: 'Harare',
      inStock: true,
      minOrder: 10
    },
    {
      id: 2,
      name: 'Cement Bags',
      supplier: 'BuildRight Supplies',
      price: 12.00,
      unit: 'bag',
      rating: 4.6,
      reviews: 89,
      location: 'Bulawayo',
      inStock: true,
      minOrder: 50
    },
    {
      id: 3,
      name: 'Maize Flour',
      supplier: 'Millers Co-op',
      price: 1.80,
      unit: 'kg',
      rating: 4.9,
      reviews: 201,
      location: 'Mutare',
      inStock: true,
      minOrder: 25
    },
    {
      id: 4,
      name: 'Steel Rods',
      supplier: 'MetalWorks Inc',
      price: 45.00,
      unit: 'piece',
      rating: 4.7,
      reviews: 67,
      location: 'Harare',
      inStock: false,
      minOrder: 100
    }
  ]

  const activeOrders = [
    {
      id: 'ORD-001',
      product: 'Fresh Tomatoes',
      supplier: 'Green Farms Ltd',
      quantity: '50kg',
      status: 'in-transit',
      estimatedDelivery: '2024-01-15',
      progress: 75
    },
    {
      id: 'ORD-002',
      product: 'Cement Bags',
      supplier: 'BuildRight Supplies',
      quantity: '100 bags',
      status: 'processing',
      estimatedDelivery: '2024-01-18',
      progress: 25
    }
  ]

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <AppHeader 
        userRole="buyer" 
        userName="John Doe" 
        userInitials="JD"
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar Navigation */}
        <aside className={`fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block`}>
          <div className="py-6 pr-6 lg:py-8">
            <nav className="flex flex-col gap-2">
              <Link href="/dashboard/buyer">
                <Button variant="secondary" className="w-full justify-start">
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
                <Button variant="ghost" className="w-full justify-start">
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
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
            <p className="text-muted-foreground">
              Find the best products from verified suppliers
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,450</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">View wishlist</p>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0"
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Featured Products</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/explore">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">{product.name}</h3>
                              <p className="text-sm text-muted-foreground truncate">{product.supplier}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span className="text-sm ml-1">{product.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <span className="text-lg font-bold">${product.price}</span>
                              <span className="text-sm text-muted-foreground">/{product.unit}</span>
                            </div>
                            <Badge variant={product.inStock ? "secondary" : "destructive"}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </div>
                          <Button 
                            className="w-full mt-3" 
                            size="sm"
                            disabled={!product.inStock}
                            onClick={() => {
                              setSelectedProduct(product)
                              setOrderDialogOpen(true)
                            }}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Order Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-4">
              {/* Active Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Active Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{order.id}</span>
                        <Badge variant="outline" className="text-xs">
                          {order.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{order.quantity}</span>
                          <span>{order.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div 
                            className="h-2 rounded-full bg-primary" 
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ETA: {order.estimatedDelivery}
                      </p>
                      <Separator />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" size="sm" asChild>
                    <Link href="/orders">
                      View All Orders
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Package className="mr-2 h-4 w-4" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Delivery
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Supplier
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link href="/dashboard/buyer" className="flex flex-col items-center justify-center gap-1 text-primary">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Search className="h-5 w-5" />
            <span className="text-xs">Explore</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Link>
          <Link href="/saved" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Heart className="h-5 w-5" />
            <span className="text-xs">Saved</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Messages</span>
          </Link>
        </div>
      </nav>

      {/* Order Now Dialog */}
      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Place Order</DialogTitle>
            <DialogDescription>
              {selectedProduct && (
                <span>Order {selectedProduct.name} from {selectedProduct.supplier}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity ({selectedProduct?.unit})</Label>
              <Input
                id="quantity"
                type="number"
                placeholder={`Min. ${selectedProduct?.minOrder || 1}`}
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(e.target.value)}
                min={selectedProduct?.minOrder || 1}
              />
              <p className="text-xs text-muted-foreground">
                Minimum order: {selectedProduct?.minOrder} {selectedProduct?.unit}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                placeholder="Enter delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
            {selectedProduct && orderQuantity && (
              <div className="rounded-lg bg-muted p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">
                    ${(selectedProduct.price * parseFloat(orderQuantity || '0')).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOrderDialogOpen(false)
                setOrderQuantity('')
                setDeliveryAddress('')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOrderDialogOpen(false)
                setOrderQuantity('')
                setDeliveryAddress('')
              }}
              disabled={!orderQuantity || !deliveryAddress || parseFloat(orderQuantity) < (selectedProduct?.minOrder || 1)}
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
