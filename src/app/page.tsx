import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  ShoppingCart, 
  Truck, 
  Shield, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Package,
  MessageSquare,
  Zap,
  Building,
  Users
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CT</span>
            </div>
            <span className="font-bold text-xl">ConnecTok</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Zimbabwe's Premier B2B Marketplace
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Connect Suppliers with
            <span className="text-primary"> Institutional Buyers</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Secure payments via Ecocash, CABS Pay, and PayNow. Real-time tracking for Agriculture, Construction, Groceries, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Buying
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/signup?role=supplier">
                Become a Supplier
              </Link>
            </Button>
          </div>

          {/* Demo Access */}
          <div className="mt-8 pt-8 border-t border-dashed">
            <p className="text-sm text-muted-foreground mb-4">
              Want to explore first? Try our demo:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/dashboard/buyer">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buyer Dashboard Demo
                </Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/dashboard/supplier">
                  <Building className="mr-2 h-4 w-4" />
                  Supplier Dashboard Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-20 border-t">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Find Verified Suppliers</h3>
              <p className="text-muted-foreground">
                Search and discover verified suppliers across multiple categories with ratings and reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Secure Payments</h3>
              <p className="text-muted-foreground">
                Pay safely with Ecocash Merchant, CABS Pay, or PayNow for international transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Track your orders from placement to delivery with live updates and notifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Direct Communication</h3>
              <p className="text-muted-foreground">
                Message suppliers directly to negotiate prices, quantities, and delivery terms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Business Analytics</h3>
              <p className="text-muted-foreground">
                Track spending, manage orders, and analyze purchasing patterns with detailed insights
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Quick Reordering</h3>
              <p className="text-muted-foreground">
                Save time with one-click reordering of frequently purchased items from trusted suppliers
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-20 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find suppliers across multiple industries serving institutional buyers
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Agriculture</h3>
              <p className="text-sm text-muted-foreground">Fresh produce, grains, livestock</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Building className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold mb-2">Construction</h3>
              <p className="text-sm text-muted-foreground">Building materials, tools, equipment</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Groceries</h3>
              <p className="text-sm text-muted-foreground">Bulk food items, beverages</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Tuckshop</h3>
              <p className="text-sm text-muted-foreground">Snacks, drinks, school supplies</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and start connecting with suppliers
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto text-2xl font-bold">
              1
            </div>
            <h3 className="mb-2 text-lg font-semibold">Create Account</h3>
            <p className="text-muted-foreground">
              Sign up as a buyer or supplier and complete your business profile
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto text-2xl font-bold">
              2
            </div>
            <h3 className="mb-2 text-lg font-semibold">Browse & Connect</h3>
            <p className="text-muted-foreground">
              Search for products, compare suppliers, and start conversations
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto text-2xl font-bold">
              3
            </div>
            <h3 className="mb-2 text-lg font-semibold">Order & Track</h3>
            <p className="text-muted-foreground">
              Place orders securely and track delivery in real-time
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 border-t">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6 pb-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join hundreds of businesses already using ConnecTok to streamline their procurement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">CT</span>
                </div>
                <span className="font-bold text-xl">ConnecTok</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Zimbabwe's premier B2B marketplace connecting suppliers with institutional buyers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/auth/signup" className="hover:text-foreground">For Buyers</Link></li>
                <li><Link href="/auth/signup?role=supplier" className="hover:text-foreground">For Suppliers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ConnecTok. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
