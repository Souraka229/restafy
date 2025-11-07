'use client'

import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { TrendingUp, Users, ShoppingCart, Star, DollarSign } from 'lucide-react'

interface DashboardStatsProps {
  period?: 'day' | 'week' | 'month'
}

const stats = [
  {
    label: 'Chiffre d\'affaires',
    value: '12,458 €',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-primary-green'
  },
  {
    label: 'Commandes',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-primary-orange'
  },
  {
    label: 'Nouveaux clients',
    value: '42',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    label: 'Note moyenne',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: Star,
    color: 'text-yellow-500'
  }
]

export default function DashboardStats({ period = 'month' }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-heading font-bold text-primary-black mb-2">
                  {stat.value}
                </p>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change} vs mois dernier
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
