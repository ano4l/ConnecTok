'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppHeader } from '@/components/layout/app-header'
import { 
  Camera,
  Save,
  CreditCard,
  Eye,
  EyeOff,
  Check,
  X,
  Upload,
  FileText,
  Clock
} from 'lucide-react'

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const profileData = {
    businessName: 'Green Farms Ltd',
    businessType: 'Supplier',
    email: 'contact@greenfarms.co.zw',
    phone: '+263 771 234 567',
    address: '123 Farm Road, Harare, Zimbabwe',
    website: 'www.greenfarms.co.zw',
    description: 'Premium quality agricultural products supplier with over 10 years of experience.',
    registrationNumber: 'ZWB/2021/12345',
    taxNumber: 'TAX-2021-67890'
  }

  const documents = [
    {
      name: 'Business Registration Certificate',
      status: 'verified',
      uploadDate: '2024-01-10',
      expiryDate: '2025-01-10'
    },
    {
      name: 'Tax Clearance Certificate',
      status: 'verified',
      uploadDate: '2024-01-10',
      expiryDate: '2024-12-31'
    },
    {
      name: 'Food Safety Certificate',
      status: 'pending',
      uploadDate: '2024-01-12',
      expiryDate: '2025-01-12'
    }
  ]

  const paymentMethods = [
    {
      type: 'Ecocash',
      number: '+263 771 234 567',
      status: 'verified',
      default: true
    },
    {
      type: 'CABS Pay',
      number: 'Account: 1234567890',
      status: 'verified',
      default: false
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="secondary"><Check className="h-3 w-3 mr-1" />Verified</Badge>
      case 'pending':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'rejected':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        userRole="supplier" 
        userName="Green Farms Ltd" 
        userInitials="GF"
        showSearch={false}
      />

      <div className="container py-6 pb-20 md:pb-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">GF</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{profileData.businessName}</h2>
                <p className="text-muted-foreground">{profileData.businessType}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Verified Business</Badge>
                  <Badge variant="outline">Premium Member</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name</label>
                    <Input defaultValue={profileData.businessName} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Type</label>
                    <Input defaultValue={profileData.businessType} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" defaultValue={profileData.email} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input type="tel" defaultValue={profileData.phone} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    <Input defaultValue={profileData.website} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Registration Number</label>
                    <Input defaultValue={profileData.registrationNumber} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input defaultValue={profileData.address} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Description</label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={profileData.description}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive promotional content</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Business Documents</CardTitle>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="p-3 md:p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <FileText className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="font-medium text-sm md:text-base">{doc.name}</p>
                            {getStatusBadge(doc.status)}
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Uploaded: {doc.uploadDate}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Expires: {doc.expiryDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="p-3 md:p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="font-medium text-sm md:text-base">{method.type}</p>
                            {method.default && <Badge className="text-xs">Default</Badge>}
                            {getStatusBadge(method.status)}
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground break-all">{method.number}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">PayNow Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Accept international payments via PayNow
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
