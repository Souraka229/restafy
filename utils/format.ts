'use client'

import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Shield, Star, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface QualityAuditPanelProps {
  restaurantId: string
}

export default function QualityAuditPanel({ restaurantId }: QualityAuditPanelProps) {
  const auditData = {
    overallScore: 92,
    status: 'excellent' as const,
    lastAudit: '2024-01-10',
    nextAudit: '2024-04-10',
    categories: [
      {
        name: 'Hygiène et sécurité',
        score: 95,
        status: 'excellent',
        details: [
          { item: 'Nettoyage cuisine', score: 5, max: 5 },
          { item: 'Stockage alimentaire', score: 5, max: 5 },
          { item: 'Équipement sécurité', score: 4, max: 5 }
        ]
      },
      {
        name: 'Qualité des produits',
        score: 90,
        status: 'excellent',
        details: [
          { item: 'Fraîcheur ingrédients', score: 5, max: 5 },
          { item: 'Qualité viandes', score: 4, max: 5 },
          { item: 'Produits locaux', score: 5, max: 5 }
        ]
      },
      {
        name: 'Service client',
        score: 88,
        status: 'good',
        details: [
          { item: 'Temps de réponse', score: 4, max: 5 },
          { item: 'Précision commandes', score: 5, max: 5 },
          { item: 'Gestion réclamations', score: 3, max: 5 }
        ]
      }
    ],
    recommendations: [
      'Améliorer le temps de réponse aux messages clients',
      'Mettre en place un système de feedback en temps réel',
      'Renforcer la formation sur la gestion des réclamations'
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'average': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle
      case 'good': return Star
      case 'average': return Clock
      case 'poor': return AlertTriangle
      default: return Shield
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-heading font-bold text-3xl text-primary-black mb-4">
          Audit Qualité Restafy
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Notre audit complet garantit l'excellence de votre établissement et 
          maintient les standards premium de la plateforme.
        </p>
      </div>

      {/* Overall Score */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary-green/5 to-primary-orange/5">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Shield className="w-8 h-8 text-primary-green" />
          <h3 className="font-heading font-bold text-2xl text-primary-black">
            Score Global
          </h3>
        </div>
        
        <div className="flex items-baseline justify-center gap-2 mb-4">
          <span className="text-6xl font-heading font-bold text-primary-black">
            {auditData.overallScore}
          </span>
          <span className="text-2xl text-gray-500">/100</span>
        </div>
        
        <Badge 
          variant="success" 
          className="text-lg py-2 px-4 mb-4"
        >
          {auditData.status === 'excellent' ? 'Excellent' : 'Bon'}
        </Badge>
        
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Dernier audit: {auditData.lastAudit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Prochain audit: {auditData.nextAudit}</span>
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auditData.categories.map((category, index) => {
          const StatusIcon = getStatusIcon(category.status)
          
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-semibold text-lg text-primary-black">
                    {category.name}
                  </h4>
                  <StatusIcon className={`w-5 h-5 ${getStatusColor(category.status).split(' ')[0]}`} />
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-heading font-bold text-primary-black mb-1">
                    {category.score}
                  </div>
                  <Badge className={getStatusColor(category.status)}>
                    {category.status === 'excellent' ? 'Excellent' : 
                     category.status === 'good' ? 'Bon' : 
                     category.status === 'average' ? 'Moyen' : 'À améliorer'}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {category.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{detail.item}</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-primary-black">
                          {detail.score}/{detail.max}
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-green h-2 rounded-full"
                            style={{ width: `${(detail.score / detail.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="font-heading font-semibold text-xl text-primary-black mb-4">
          Recommandations d'amélioration
        </h3>
        
        <div className="space-y-3">
          {auditData.recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800 text-sm">{recommendation}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Certification Status */}
      <Card className="p-6 bg-gradient-to-r from-primary-green/10 to-primary-orange/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-xl text-primary-black mb-2">
              Certification Restafy Premium
            </h3>
            <p className="text-gray-600">
              Votre établissement répond aux critères d'excellence de la plateforme.
            </p>
          </div>
          
          <Badge variant="premium" className="text-lg py-2 px-4">
            <Shield className="w-4 h-4 mr-2" />
            Certifié
          </Badge>
        </div>
      </Card>
    </div>
  )
}

// Composant Calendar pour compléter
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)
