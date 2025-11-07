'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, Package, TrendingUp, Settings } from 'lucide-react'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary-black">
            Bonjour, {user.email} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenue sur votre tableau de bord Restafy
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Commandes totales</p>
                <p className="text-2xl font-bold text-primary-black mt-1">0</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenus totaux</p>
                <p className="text-2xl font-bold text-primary-black mt-1">0 FCFA</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Restaurants</p>
                <p className="text-2xl font-bold text-primary-black mt-1">0</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <User className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Empty State */}
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-primary-black mb-2">
            Bienvenue sur Restafy !
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Votre tableau de bord est vide pour le moment. Commencez par créer votre premier restaurant ou explorez les fonctionnalités.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary-orange hover:bg-orange-600">
              Créer un restaurant
            </Button>
            <Button variant="outline">
              Explorer les fonctionnalités
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
