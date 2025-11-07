'use client'

import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Share2, Users, Gift, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function ReferralPanel() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'RESTAFY-FRIEND'
  const referralLink = `https://restafy.com/register?ref=${referralCode}`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    {
      label: 'Parrainages',
      value: '12',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      label: 'Récompenses',
      value: '3',
      icon: Gift,
      color: 'text-primary-orange'
    },
    {
      label: 'Revenus',
      value: '150€',
      icon: Share2,
      color: 'text-primary-green'
    }
  ]

  const referrals = [
    {
      id: 1,
      name: 'Marie Lambert',
      email: 'marie.lambert@email.com',
      status: 'completed',
      reward: '1 mois gratuit',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      status: 'pending',
      reward: 'En attente',
      date: '2024-01-10'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-heading font-bold text-3xl text-primary-black mb-4">
          Programme de Parrainage
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Parrainez vos amis restaurateurs et bénéficiez de récompenses exclusives. 
          Plus vous parrainez, plus vous gagnez !
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-heading font-bold text-primary-black mb-1">
                {stat.value}
              </p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Referral Code */}
      <Card className="p-6">
        <h3 className="font-heading font-semibold text-xl text-primary-black mb-4">
          Votre lien de parrainage
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Lien à partager</p>
            <p className="font-mono text-primary-black break-all">
              {referralLink}
            </p>
          </div>
          
          <Button
            onClick={copyToClipboard}
            className="bg-primary-orange hover:bg-orange-600 whitespace-nowrap"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copié !' : 'Copier le lien'}
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Gift className="w-4 h-4 text-primary-orange" />
            <span>1 mois gratuit pour vous et votre filleul</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-primary-green" />
            <span>10% de réduction sur la sponsorisation</span>
          </div>
        </div>
      </Card>

      {/* Referral History */}
      <Card className="p-6">
        <h3 className="font-heading font-semibold text-xl text-primary-black mb-6">
          Historique des parrainages
        </h3>
        
        <div className="space-y-4">
          {referrals.map((referral) => (
            <motion.div
              key={referral.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-terracotta rounded-full flex items-center justify-center text-white font-semibold">
                  {referral.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-primary-black">
                    {referral.name}
                  </p>
                  <p className="text-gray-600 text-sm">{referral.email}</p>
                </div>
              </div>
              
              <div className="text-right">
                <Badge
                  variant={referral.status === 'completed' ? 'success' : 'warning'}
                  className="mb-2"
                >
                  {referral.status === 'completed' ? 'Complété' : 'En attente'}
                </Badge>
                <p className="text-sm text-gray-600">{referral.reward}</p>
                <p className="text-xs text-gray-500">{referral.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Share Buttons */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">Partagez sur vos réseaux</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
            Facebook
          </Button>
          <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-50">
            Twitter
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-700 hover:bg-gray-50">
            LinkedIn
          </Button>
          <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
