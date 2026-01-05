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
  Trash2,
  ShoppingCart,
  MapPin,
  Home,
  MessageSquare,
  User
} from 'lucide-react'

interface SavedItem {
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
  savedDate: string
}

export default function SavedItemsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [savedItems, setSavedItems] = useState<SavedItem[]>([
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
      savedDate: '2024-01-12'
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
      savedDate: '2024-01-10'
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
      savedDate: '2024-01-08'
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
      savedDate: '2024-01-05'
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
      savedDate: '2024-01-03'
    }
  ])

  const removeItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id))
  }

  const filteredItems = savedItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
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
                <Button variant="secondary" className="w-full justify-start">
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
              <h1 className="text-3xl font-bold tracking-tight">Saved Items</h1>
              <p className="text-muted-foreground">{savedItems.length} items in your wishlist</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Saved Items Grid */}
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved items</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'No items match your search' : 'Start saving items you\'re interested in'}
                </p>
                <Button asChild>
                  <Link href="/explore">Explore Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col h-full">
                      <div className="h-32 bg-muted rounded-md flex items-center justify-center mb-4">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{item.supplier}</p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-sm ml-1">{item.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-lg font-bold">${item.price}</span>
                            <span className="text-sm text-muted-foreground">/{item.unit}</span>
                          </div>
                          <Badge variant={item.inStock ? 'secondary' : 'destructive'}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-3">
                          Min. order: {item.minOrder} {item.unit}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" disabled={!item.inStock}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Order Now
                        </Button>
                        <Button variant="outline" size="icon">
                          <MessageSquare className="h-4 w-4" />
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
