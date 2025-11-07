'use client'

import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Star, MapPin, Crown } from 'lucide-react'
import Image from 'next/image'

interface RestaurantCardProps {
  restaurant: {
    id: string
    name: string
    slug: string
    description: string
    banner_url: string
    rating: number
    review_count: number
    distance?: number
    is_certified: boolean
    is_sponsored: boolean
    category: string
    delivery_time: string
    min_order: number
  }
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden border-2 border-transparent group-hover:border-primary-orange/20 transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.banner_url}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {restaurant.is_certified && (
              <Badge variant="premium" className="bg-primary-green text-white">
                <Star className="w-3 h-3 mr-1" />
                Certifié
              </Badge>
            )}
            {restaurant.is_sponsored && (
              <Badge variant="premium" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Sponsor
              </Badge>
            )}
          </div>

          {/* Delivery Info */}
          <div className="absolute bottom-3 left-3 text-white">
            <p className="text-sm font-medium">{restaurant.delivery_time}</p>
            <p className="text-xs opacity-90">À partir de {restaurant.min_order}€</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-semibold text-lg text-primary-black group-hover:text-primary-orange transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-primary-orange/10 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-primary-black">
                {restaurant.rating}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {restaurant.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {restaurant.distance ? (
                <span>{restaurant.distance} km</span>
              ) : (
                <span>Proche</span>
              )}
            </div>
            <span className="capitalize">{restaurant.category}</span>
          </div>

          {/* Hover Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t border-gray-100"
          >
            <button className="w-full bg-primary-orange text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
              Voir le menu
            </button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
