'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ShoppingCart,
  Building,
  Sparkles
} from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!formData.password) {
      setError('Please enter your password')
      return
    }
    
    if (loginMethod === 'email' && !formData.email) {
      setError('Please enter your email')
      return
    }
    
    if (loginMethod === 'phone' && !formData.phone) {
      setError('Please enter your phone number')
      return
    }

    // Handle login logic here
    console.log('Login attempt:', { loginMethod, formData })
    router.push('/dashboard')
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CT</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your ConnecTok account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Login Method Toggle */}
            <div className="flex bg-muted rounded-xl p-1">
              <button
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  loginMethod === 'email' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setLoginMethod('email')}
              >
                <Mail className="inline-block mr-2 h-4 w-4" />
                Email
              </button>
              <button
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  loginMethod === 'phone' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setLoginMethod('phone')}
              >
                <Phone className="inline-block mr-2 h-4 w-4" />
                Phone
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-xl animate-in fade-in slide-in-from-top-4 duration-200">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email/Phone Input */}
              {loginMethod === 'email' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="+263 XXX XXX XXX"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me for 30 days
                </label>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            {/* Demo Login Options */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-card text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Demo Access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all group"
                onClick={() => router.push('/dashboard/buyer')}
              >
                <ShoppingCart className="mr-2 h-4 w-4 group-hover:text-green-600" />
                Buyer Demo
              </Button>
              <Button 
                variant="outline" 
                className="w-full hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all group"
                onClick={() => router.push('/dashboard/supplier')}
              >
                <Building className="mr-2 h-4 w-4 group-hover:text-purple-600" />
                Supplier Demo
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Click above to explore the app without signing up
            </p>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up for free
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
