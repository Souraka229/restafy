import HeroSection from '@/components/HeroSection'
import RestaurantCard from '@/components/RestaurantCard'
import { Button } from '@/components/ui/Button'
import { Star, Shield, Zap, TrendingUp } from 'lucide-react'

// Données mock pour la démo
const featuredRestaurants = [
  {
    id: '1',
    name: 'Le Gourmet Parisien',
    slug: 'le-gourmet-parisien',
    description: 'Cuisine française raffinée avec des produits locaux de saison. Une expérience culinaire unique au cœur de la ville.',
    banner_url: '/restaurants/gourmet-parisien.jpg',
    rating: 4.8,
    review_count: 124,
    distance: 1.2,
    is_certified: true,
    is_sponsored: true,
    category: 'français',
    delivery_time: '25-35 min',
    min_order: 25
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    slug: 'sakura-sushi',
    description: 'Sushi traditionnel préparé par des maîtres sushi. Fraîcheur garantie et saveurs authentiques du Japon.',
    banner_url: '/restaurants/sakura-sushi.jpg',
    rating: 4.9,
    review_count: 89,
    distance: 2.1,
    is_certified: true,
    is_sponsored: false,
    category: 'japonais',
    delivery_time: '30-40 min',
    min_order: 30
  },
  {
    id: '3',
    name: 'La Trattoria',
    slug: 'la-trattoria',
    description: 'Pâtes artisanales et pizzas au feu de bois dans une ambiance chaleureuse et authentiquement italienne.',
    banner_url: '/restaurants/la-trattoria.jpg',
    rating: 4.7,
    review_count: 156,
    distance: 0.8,
    is_certified: false,
    is_sponsored: true,
    category: 'italien',
    delivery_time: '20-30 min',
    min_order: 20
  }
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* Featured Restaurants Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-black mb-4">
              Restaurants d'Exception
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection premium de restaurants audités et certifiés pour une expérience culinaire inoubliable.
            </p>
          </div>

          {/* Restaurants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline">
              Voir tous les restaurants
            </Button>
          </div>
        </div>
      </section>

      {/* Quality Promise Section */}
      <section className="py-20 bg-primary-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-black mb-4">
              L'Excellence Restafy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre engagement : 10 restaurants excellents valent mieux que 100 médiocres. 
              Chaque partenaire est soigneusement sélectionné et audité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityFeatures.map((feature, index) => (
              <div key={feature.title} className="text-center p-8 bg-white rounded-2xl shadow-lg">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-orange to-primary-terracotta">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Prêt à transformer votre restaurant ?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Rejoignez la plateforme premium qui valorise la qualité et l'excellence culinaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Devenir partenaire
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-orange">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

const qualityFeatures = [
  {
    icon: Shield,
    title: "Audit Rigoureux",
    description: "Chaque restaurant passe un audit qualité complet incluant hygiène, service et expérience client."
  },
  {
    icon: Star,
    title: "Certification Premium",
    description: "Seuls les établissements répondant à nos critères d'excellence obtiennent la certification Restafy."
  },
  {
    icon: TrendingUp,
    title: "Performance Garantie",
    description: "Suivi continu des performances et retours clients pour maintenir les standards de qualité."
  }
]
