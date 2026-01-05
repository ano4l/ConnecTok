'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  Plus,
  Search,
  Edit,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  MoreVertical,
  Trash2,
  ChevronRight,
  Minus
} from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  unit: string
  price: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'PRD-001',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      stock: 250,
      minStock: 50,
      unit: 'kg',
      price: 2.50,
      status: 'in-stock'
    },
    {
      id: 'PRD-002',
      name: 'Maize Flour',
      category: 'Grains',
      stock: 30,
      minStock: 100,
      unit: 'kg',
      price: 1.80,
      status: 'low-stock'
    },
    {
      id: 'PRD-003',
      name: 'Onions',
      category: 'Vegetables',
      stock: 180,
      minStock: 40,
      unit: 'kg',
      price: 1.50,
      status: 'in-stock'
    },
    {
      id: 'PRD-004',
      name: 'Potatoes',
      category: 'Vegetables',
      stock: 0,
      minStock: 60,
      unit: 'kg',
      price: 2.00,
      status: 'out-of-stock'
    },
    {
      id: 'PRD-005',
      name: 'Cabbage',
      category: 'Vegetables',
      stock: 15,
      minStock: 30,
      unit: 'heads',
      price: 1.20,
      status: 'low-stock'
    },
    {
      id: 'PRD-006',
      name: 'Carrots',
      category: 'Vegetables',
      stock: 120,
      minStock: 25,
      unit: 'kg',
      price: 1.80,
      status: 'in-stock'
    }
  ])

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
    setShowEditDialog(true)
  }

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p))
      setShowEditDialog(false)
      setEditingProduct(null)
    }
  }

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id))
      setShowDeleteDialog(false)
      setProductToDelete(null)
    }
  }

  const handleStockAdjustment = (productId: string, adjustment: number) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock + adjustment)
        return {
          ...p,
          stock: newStock,
          status: newStock === 0 ? 'out-of-stock' : newStock < p.minStock ? 'low-stock' : 'in-stock'
        }
      }
      return p
    }))
  }

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">In Stock</Badge>
      case 'low-stock':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Low Stock</Badge>
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>
    }
  }

  const getStatusIcon = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'low-stock':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'out-of-stock':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || p.status === filter
    return matchesSearch && matchesFilter
  })

  const statusCounts = {
    all: products.length,
    'in-stock': products.filter(p => p.status === 'in-stock').length,
    'low-stock': products.filter(p => p.status === 'low-stock').length,
    'out-of-stock': products.filter(p => p.status === 'out-of-stock').length
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
              <h1 className="text-lg font-semibold">Products</h1>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {[
              { key: 'all', label: 'All', count: statusCounts.all },
              { key: 'in-stock', label: 'In Stock', count: statusCounts['in-stock'] },
              { key: 'low-stock', label: 'Low Stock', count: statusCounts['low-stock'] },
              { key: 'out-of-stock', label: 'Out', count: statusCounts['out-of-stock'] }
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

      {/* Products List */}
      <div className="container py-4 space-y-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 py-3 border-t border-b my-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Stock Level</p>
                    <p className="text-xl font-bold">{product.stock} <span className="text-sm font-normal text-muted-foreground">{product.unit}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Price per {product.unit}</p>
                    <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(product.status)}
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          product.status === 'in-stock' ? 'bg-green-500' : 
                          product.status === 'low-stock' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((product.stock / product.minStock) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Min: {product.minStock} {product.unit}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEditProduct(product)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                >
                  <ChevronRight className={`mr-2 h-4 w-4 transition-transform ${expandedProduct === product.id ? 'rotate-90' : ''}`} />
                  Details
                </Button>
              </div>

              {/* Expanded Details */}
              {expandedProduct === product.id && (
                <div className="mt-3 pt-3 border-t space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Stock Adjustment</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStockAdjustment(product.id, -10)}
                      >
                        <Minus className="h-4 w-4 mr-1" />
                        -10
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStockAdjustment(product.id, -50)}
                      >
                        <Minus className="h-4 w-4 mr-1" />
                        -50
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStockAdjustment(product.id, 50)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        +50
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStockAdjustment(product.id, 100)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        +100
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Product
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
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
          <Link href="/dashboard/supplier/products" className="flex flex-col items-center justify-center gap-1 text-primary">
            <Package className="h-5 w-5" />
            <span className="text-xs font-medium">Products</span>
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

      {/* Edit Product Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information and pricing
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  placeholder="Category"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Price (${editingProduct.unit})</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Unit</label>
                  <Input
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    placeholder="kg, bag, etc"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Current Stock</label>
                  <Input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Min Stock</label>
                  <Input
                    type="number"
                    value={editingProduct.minStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, minStock: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {productToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
