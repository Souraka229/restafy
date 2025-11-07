'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import RestaurantCard from '@/components/RestaurantCard'
import { Button } from '@/components/ui/Button'
import { Star, Shield, Zap, TrendingUp, MapPin, Clock, Users } from 'lucide-react'

// Données mock dynamiques pour Cotonou
const cotonouRestaurants = [
  {
    id: '1',
    name: 'Maquis du Port',
    slug: 'maquis-du-port',
    description: 'Cuisine béninoise authentique avec des plats traditionnels préparés avec des produits locaux frais.',
    banner_url: '/restaurants/maquis-port.jpg',
    rating: 4.7,
    review_count: 89,
    distance: 0.8,
    is_certified: true,
    is_sponsored: true,
    category: 'Béninois',
    delivery_time: '20-30 min',
    min_order: 15
  },
  {
    id: '2',
    name: 'Pizza Royale',
    slug: 'pizza-royale',
    description: 'Pizzas artisanales au feu de bois avec des ingrédients importés et locaux de qualité premium.',
    banner_url: '/restaurants/pizza-royale.jpg',
    rating: 4.5,
    review_count: 124,
    distance: 1.2,
    is_certified: false,
    is_sponsored: true,
    category: 'Italien',
    delivery_time: '25-35 min',
    min_order: 20
  },
  {
    id: '3',
    name: 'Sushi Paradise',
    slug: 'sushi-paradise',
    description: 'Sushi frais préparé par des chefs japonais. Expérience culinaire unique à Cotonou.',
    banner_url: '/restaurants/sushi-paradise.jpg',
    rating: 4.8,
    review_count: 67,
    distance: 2.1,
    is_certified: true,
    is_sponsored: false,
    category: 'Japonais',
    delivery_time: '30-40 min',
    min_order: 25
  },
  {
    id: '4',
    name: 'Grillade Africaine',
    slug: 'grillade-africaine',
    description: 'Spécialités de grillades africaines dans une ambiance chaleureuse et conviviale.',
    banner_url: '/restaurants/grillade-africaine.jpg',
    rating: 4.6,
    review_count: 156,
    distance: 1.5,
    is_certified: false,
    is_sponsored: true,
    category: 'Africain',
    delivery_time: '25-35 min',
    min_order: 18
  }
]

const stats = [
  { value: '50+', label: 'Restaurants Premium' },
  { value: '10k+', label: 'Clients Satisfaits' },
  { value: '98%', label: 'Taux de Satisfaction' },
  { value: '24/7', label: 'Support Client' }
]

export default function Home() {
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Rotation automatique des restaurants mis en avant
    const interval = setInterval(() => {
      setCurrentRestaurantIndex((prev) => 
        prev === cotonouRestaurants.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const featuredRestaurant = cotonouRestaurants[currentRestaurantIndex]

  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* Stats Section avec animations */}
      <section className="py-16 bg-gradient-to-r from-primary-orange to-primary-terracotta text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`transform transition-all duration-500 delay-${index * 100} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="text-3xl md:text-4xl font-heading font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-orange-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant en vedette dynamique */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-black mb-4">
              Restaurant en Vedette
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les meilleures adresses de Cotonou
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 mb-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-primary-green/10 text-primary-green px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4" />
                  Restaurant du moment
                </div>
                <h3 className="text-3xl font-heading font-bold text-primary-black mb-4">
                  {featuredRestaurant.name}
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  {featuredRestaurant.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-primary-orange" />
                    <span>{featuredRestaurant.delivery_time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-primary-orange" />
                    <span>{featuredRestaurant.distance} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-primary-orange" />
                    <span>{featuredRestaurant.review_count} avis</span>
                  </div>
                </div>
                <Button size="lg" className="bg-primary-orange hover:bg-orange-600">
                  Voir le menu
                </Button>
              </div>
              <div className="flex-1">
                <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-r from-primary-orange to-primary-terracotta">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🍽️</div>
                      <p className="text-lg">Image de {featuredRestaurant.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tous les restaurants */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-black mb-4">
              Restaurants à Cotonou
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection exclusive des meilleurs restaurants de la ville
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {cotonouRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className={`transform transition-all duration-500 delay-${index * 100} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline">
              Voir tous les restaurants
            </Button>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Restafy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-black mb-4">
              Pourquoi Restafy ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Certification Qualité",
                description: "Chaque restaurant est audité et certifié pour garantir l'excellence culinaire"
              },
              {
                icon: Zap,
                title: "Livraison Express",
                description: "Service de livraison rapide dans tout Cotonou avec suivi en temps réel"
              },
              {
                icon: TrendingUp,
                title: "Croissance Garantie",
                description: "Augmentez vos ventes de 40% en moyenne avec notre plateforme premium"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-orange" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary-orange to-primary-terracotta">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Prêt à révolutionner votre restaurant ?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Rejoignez la plateforme premium qui valorise l'excellence culinaire à Cotonou
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Devenir partenaire
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-orange">
              <Phone className="w-5 h-5 mr-2" />
              01 55 53 08 26
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
