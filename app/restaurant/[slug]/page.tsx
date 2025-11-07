import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import MenuItemCard from '@/components/MenuItemCard'
import { Star, Clock, MapPin, Shield, Crown } from 'lucide-react'
import Image from 'next/image'

// Données mock pour la démo
const restaurantData = {
  id: '1',
  name: 'Le Gourmet Parisien',
  slug: 'le-gourmet-parisien',
  description: 'Cuisine française raffinée avec des produits locaux de saison. Une expérience culinaire unique au cœur de la ville.',
  banner_url: '/restaurants/gourmet-parisien-banner.jpg',
  logo_url: '/restaurants/gourmet-parisien-logo.jpg',
  rating: 4.8,
  review_count: 124,
  delivery_time: '25-35 min',
  min_order: 25,
  delivery_fee: 2.99,
  is_certified: true,
  is_sponsored: true,
  category: 'Français',
  price_range: '€€€',
  address: '123 Avenue des Champs-Élysées, 75008 Paris',
  opening_hours: {
    monday: '12:00-14:30, 19:00-22:30',
    tuesday: '12:00-14:30, 19:00-22:30',
    wednesday: '12:00-14:30, 19:00-22:30',
    thursday: '12:00-14:30, 19:00-22:30',
    friday: '12:00-14:30, 19:00-23:00',
    saturday: '12:00-15:00, 19:00-23:00',
    sunday: '12:00-15:00'
  }
}

const menuItems = [
  {
    id: '1',
    name: 'Foie Gras Maison',
    description: 'Foie gras de canard mi-cuit, chutney de figues et pain brioché toasté',
    price: 2400,
    image_url: '/menu/foie-gras.jpg',
    is_available: true,
    preparation_time: 15,
    tags: ['Signature', 'Produit du terroir']
  },
  {
    id: '2',
    name: 'Bœuf Bourguignon',
    description: 'Bœuf mariné au vin rouge de Bourgogne, lardons, champignons et petits oignons',
    price: 3200,
    image_url: '/menu/boeuf-bourguignon.jpg',
    is_available: true,
    preparation_time: 25,
    tags: ['Plat principal', 'Traditionnel']
  },
  {
    id: '3',
    name: 'Crème Brûlée à la Vanille',
    description: 'Crème onctueuse à la vanille de Madagascar et sa caramélisation croustillante',
    price: 900,
    image_url: '/menu/creme-brulee.jpg',
    is_available: true,
    preparation_time: 10,
    tags: ['Dessert', 'Signature']
  }
]

interface PageProps {
  params: {
    slug: string
  }
}

export default function RestaurantPage({ params }: PageProps) {
  // Simulation de vérification du slug
  if (params.slug !== restaurantData.slug) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-primary-orange to-primary-terracotta">
        <Image
          src={restaurantData.banner_url}
          alt={restaurantData.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {restaurantData.is_sponsored && (
                    <Badge variant="premium" className="bg-yellow-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Sponsorisé
                    </Badge>
                  )}
                  {restaurantData.is_certified && (
                    <Badge variant="secondary" className="bg-primary-green">
                      <Shield className="w-3 h-3 mr-1" />
                      Certifié Restafy
                    </Badge>
                  )}
                </div>
                <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2">
                  {restaurantData.name}
                </h1>
                <p className="text-lg text-gray-200 max-w-2xl">
                  {restaurantData.description}
                </p>
              </div>
              
              {/* Rating */}
              <div className="text-right hidden md:block">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">{restaurantData.rating}</span>
                </div>
                <p className="text-gray-200">
                  {restaurantData.review_count} avis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Clock className="w-6 h-6 text-primary-orange mb-2" />
                  <span className="font-semibold">{restaurantData.delivery_time}</span>
                  <span className="text-sm text-gray-600">Livraison</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">{restaurantData.min_order}€ min</span>
                  <span className="text-sm text-gray-600">Commande minimum</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">{restaurantData.delivery_fee}€</span>
                  <span className="text-sm text-gray-600">Frais de livraison</span>
                </div>
              </div>
            </Card>

            {/* Menu Section */}
            <section>
              <h2 className="font-heading font-bold text-3xl text-primary-black mb-6">
                Notre Menu
              </h2>
              
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <Card className="p-6 sticky top-6">
              <h3 className="font-heading font-semibold text-xl text-primary-black mb-4">
                Votre commande
              </h3>
              
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <p>Votre panier est vide</p>
                  <p className="text-sm">Ajoutez des plats pour commencer</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>0,00 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de livraison</span>
                    <span>{restaurantData.delivery_fee} €</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>{restaurantData.delivery_fee} €</span>
                  </div>
                </div>
                
                <Button 
                  disabled 
                  className="w-full bg-primary-orange hover:bg-orange-600 py-3"
                >
                  Commander (min. {restaurantData.min_order}€)
                </Button>
              </div>
            </Card>

            {/* Restaurant Info */}
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-xl text-primary-black mb-4">
                Informations
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600 text-sm">{restaurantData.address}</p>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Horaires d'ouverture</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Lun - Jeu</span>
                      <span>12:00-14:30, 19:00-22:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vendredi</span>
                      <span>12:00-14:30, 19:00-23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span>12:00-15:00, 19:00-23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span>12:00-15:00</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Catégorie</span>
                  <span className="text-gray-600">{restaurantData.category}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Budget</span>
                  <span className="text-gray-600">{restaurantData.price_range}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
