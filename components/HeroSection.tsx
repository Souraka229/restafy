'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { Star, Shield, Zap, Users } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-cream via-white to-orange-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary-green/10 text-primary-green px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <Shield className="w-4 h-4" />
            Plateforme certifiée • 10 restaurants d'exception
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold text-primary-black mb-6"
          >
            Votre restaurant
            <span className="block text-primary-orange">en ligne,</span>
            <span className="block">élégant et performant</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Rejoignez Restafy — la plateforme premium qui transforme 
            <span className="font-semibold text-primary-black"> l'excellence culinaire</span> en 
            <span className="font-semibold text-primary-orange"> succès digital</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button size="lg" className="text-lg px-8 py-4">
              <Zap className="w-5 h-5 mr-2" />
              Créer ma boutique
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Voir la démo
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-orange" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-primary-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-4 h-4 bg-primary-orange rounded-full opacity-20"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-10 w-6 h-6 bg-primary-green rounded-full opacity-20"
      />
    </section>
  )
}

const features = [
  {
    icon: Star,
    title: "Qualité Premium",
    description: "Audit rigoureux, certification d'excellence, mise en avant des meilleurs"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Technologie Next.js 14, paiement instantané, expérience fluide"
  },
  {
    icon: Users,
    title: "Communauté d'élite",
    description: "Restaurants triés sur le volet, clients exigeants, réseau premium"
  },
]
