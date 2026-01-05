'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  User, 
  Building, 
  ArrowLeft, 
  ArrowRight,
  Check,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShoppingCart,
  MapPin
} from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'supplier' | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessCategory: '',
    location: ''
  })

  const handleRoleSelect = (role: 'buyer' | 'supplier') => {
    setSelectedRole(role)
    setTimeout(() => setStep(2), 300)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    router.push('/dashboard')
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[
              { num: 1, label: 'Role' },
              { num: 2, label: 'Account' },
              { num: 3, label: 'Business' }
            ].map((item, index) => (
              <div key={item.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-sm ${
                      step > item.num 
                        ? 'bg-primary text-primary-foreground shadow-primary/25' 
                        : step === item.num 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110' 
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > item.num ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      item.num
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                    step >= item.num ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className="flex items-center mx-4 mb-6">
                    <div className={`w-16 h-1 rounded-full transition-all duration-500 ${
                      step > item.num ? 'bg-primary' : 'bg-muted'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CT</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              {step === 1 && "Choose your role to get started"}
              {step === 2 && "Enter your account details"}
              {step === 3 && "Tell us about your business"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Role Selection */}
            <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 absolute -translate-x-full'}`}>
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div 
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                    selectedRole === 'buyer' 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => handleRoleSelect('buyer')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                      selectedRole === 'buyer' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                    }`}>
                      <ShoppingCart className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Buyer</h3>
                      <p className="text-muted-foreground text-sm">Purchase products from verified suppliers</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedRole === 'buyer' 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted-foreground/30'
                    }`}>
                      {selectedRole === 'buyer' && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                    selectedRole === 'supplier' 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => handleRoleSelect('supplier')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                      selectedRole === 'supplier' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                    }`}>
                      <Building className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Supplier</h3>
                      <p className="text-muted-foreground text-sm">Sell products to institutional buyers</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedRole === 'supplier' 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted-foreground/30'
                    }`}>
                      {selectedRole === 'supplier' && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>

            {/* Step 2: Account Details */}
            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {/* Step 3: Business Information */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter business name"
                      className="pl-10"
                      value={formData.businessName}
                      onChange={(e) => updateFormData('businessName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Category</label>
                  <select 
                    className="w-full h-10 px-3 py-2 border border-input bg-background text-sm ring-offset-background rounded-md"
                    value={formData.businessCategory}
                    onChange={(e) => updateFormData('businessCategory', e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="construction">Construction</option>
                    <option value="groceries">Groceries</option>
                    <option value="tuckshop">Tuckshop</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="City, Country"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className="pl-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              <div className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
