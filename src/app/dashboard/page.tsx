'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would check the user's role from authentication context
    // For now, we'll default to buyer dashboard
    const userRole = 'buyer' // This would come from auth context
    
    if (userRole === 'buyer') {
      router.push('/dashboard/buyer')
    } else if (userRole === 'supplier') {
      router.push('/dashboard/supplier')
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
