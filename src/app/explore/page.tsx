'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AppHeader } from '@/components/layout/app-header'
import {
  Search,
  Package,
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  Home,
  MessageSquare,
  User,
  Filter,
  Grid,
  List,
  Building,
  Truck,
  ChevronRight
} from 'lucide-react'

interface Product {
  id: string
  name: string
  supplier: string
  price: number
  unit: string
  rating: number
  reviews: number
  location: string
  inStock: boolean
  minOrder: number
  category: string
}

interface Supplier {
  id: string
  name: string
  rating: number
  reviews: number
  location: string
  products: number
  verified: boolean
  categories: string[]
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<'products' | 'suppliers'>('products')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const categories = [
    { id: 'all', name: 'All', icon: Package },
    { id: 'agriculture', name: 'Agriculture', icon: Package },
    { id: 'construction', name: 'Construction', icon: Building },
    { id: 'groceries', name: 'Groceries', icon: ShoppingCart },
    { id: 'tuckshop', name: 'Tuckshop', icon: Package },
  ]

  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      supplier: 'Green Farms Ltd',
      price: 2.50,
      unit: 'kg',
      rating: 4.8,
      reviews: 124,
      location: 'Harare',
      inStock: true,
      minOrder: 10,
      category: 'agriculture'
    },
    {
      id: '2',
      name: 'Cement Bags',
      supplier: 'BuildRight Supplies',
      price: 12.00,
      unit: 'bag',
      rating: 4.6,
      reviews: 89,
      location: 'Bulawayo',
      inStock: true,
      minOrder: 50,
      category: 'construction'
    },
    {
      id: '3',
      name: 'Maize Flour',
      supplier: 'Millers Co-op',
      price: 1.80,
      unit: 'kg',
      rating: 4.9,
      reviews: 201,
      location: 'Mutare',
      inStock: true,
      minOrder: 25,
      category: 'groceries'
    },
    {
      id: '4',
      name: 'Steel Rods',
      supplier: 'MetalWorks Inc',
      price: 45.00,
      unit: 'piece',
      rating: 4.7,
      reviews: 67,
      location: 'Harare',
      inStock: false,
      minOrder: 100,
      category: 'construction'
    },
    {
      id: '5',
      name: 'Sugar',
      supplier: 'Sweet Supplies',
      price: 1.50,
      unit: 'kg',
      rating: 4.5,
      reviews: 156,
      location: 'Harare',
      inStock: true,
      minOrder: 50,
      category: 'groceries'
    },
    {
      id: '6',
      name: 'Potatoes',
      supplier: 'Farm Fresh Co',
      price: 1.20,
      unit: 'kg',
      rating: 4.6,
      reviews: 98,
      location: 'Masvingo',
      inStock: true,
      minOrder: 20,
      category: 'agriculture'
    },
    {
      id: '7',
      name: 'Bricks',
      supplier: 'BuildRight Supplies',
      price: 0.50,
      unit: 'piece',
      rating: 4.4,
      reviews: 45,
      location: 'Bulawayo',
      inStock: true,
      minOrder: 500,
      category: 'construction'
    },
    {
      id: '8',
      name: 'Cooking Oil',
      supplier: 'Oil Masters',
      price: 3.50,
      unit: 'litre',
      rating: 4.7,
      reviews: 178,
      location: 'Harare',
      inStock: true,
      minOrder: 20,
      category: 'groceries'
    }
  ]

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Green Farms Ltd',
      rating: 4.8,
      reviews: 324,
      location: 'Harare',
      products: 45,
      verified: true,
      categories: ['Agriculture']
    },
    {
      id: '2',
      name: 'BuildRight Supplies',
      rating: 4.6,
      reviews: 189,
      location: 'Bulawayo',
      products: 78,
      verified: true,
      categories: ['Construction']
    },
    {
      id: '3',
      name: 'Millers Co-op',
      rating: 4.9,
      reviews: 456,
      location: 'Mutare',
      products: 23,
      verified: true,
      categories: ['Groceries']
    },
    {
      id: '4',
      name: 'MetalWorks Inc',
      rating: 4.7,
      reviews: 167,
      location: 'Harare',
      products: 34,
      verified: true,
      categories: ['Construction']
    },
    {
      id: '5',
      name: 'Sweet Supplies',
      rating: 4.5,
      reviews: 234,
      location: 'Harare',
      products: 56,
      verified: false,
      categories: ['Groceries', 'Tuckshop']
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                <Button variant="secondary" className="w-full justify-start">
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
            <p className="text-muted-foreground">Discover products and suppliers</p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, suppliers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'products' ? 'default' : 'outline'}
              onClick={() => setActiveTab('products')}
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
            <Button
              variant={activeTab === 'suppliers' ? 'default' : 'outline'}
              onClick={() => setActiveTab('suppliers')}
            >
              <Building className="mr-2 h-4 w-4" />
              Suppliers
            </Button>
          </div>

          {activeTab === 'products' && (
            <>
              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex-shrink-0"
                  >
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              <div className={viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className={viewMode === 'grid' ? 'p-4' : 'p-4 flex gap-4'}>
                      <div className={viewMode === 'grid' ? 'h-32 bg-muted rounded-md flex items-center justify-center mb-4' : 'h-24 w-24 bg-muted rounded-md flex items-center justify-center flex-shrink-0'}>
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{product.supplier}</p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {product.location}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">${product.price}</span>
                            <span className="text-sm text-muted-foreground">/{product.unit}</span>
                          </div>
                          <Badge variant={product.inStock ? 'secondary' : 'destructive'}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === 'suppliers' && (
            <div className="space-y-4">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                          <Building className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{supplier.name}</h3>
                            {supplier.verified && (
                              <Badge variant="secondary">Verified</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span className="ml-1">{supplier.rating}</span>
                            </div>
                            <span>({supplier.reviews} reviews)</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {supplier.location}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{supplier.products} products</span>
                            <span className="text-muted-foreground">•</span>
                            <div className="flex gap-1">
                              {supplier.categories.map((cat) => (
                                <Badge key={cat} variant="outline" className="text-xs">
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Contact
                        </Button>
                        <Button size="sm">
                          View Products
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
