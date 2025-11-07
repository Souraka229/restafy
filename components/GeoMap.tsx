'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { Button } from './ui/Button'

interface Restaurant {
  id: string
  name: string
  latitude: number
  longitude: number
  is_sponsored: boolean
  is_certified: boolean
}

interface GeoMapProps {
  restaurants: Restaurant[]
  userLocation?: { latitude: number; longitude: number }
  onRestaurantSelect: (restaurant: Restaurant) => void
}

export default function GeoMap({ restaurants, userLocation, onRestaurantSelect }: GeoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Simulation de chargement de carte (à remplacer par Leaflet/Google Maps)
  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // Implémentation simplifiée de la distance Haversine
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  return (
    <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200">
      {/* Carte simulée */}
      <div ref={mapRef} className="absolute inset-0">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange" />
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Points de restaurants */}
            {restaurants.map((restaurant, index) => {
              const isSelected = selectedRestaurant?.id === restaurant.id
              const distance = userLocation 
                ? calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    restaurant.latitude,
                    restaurant.longitude
                  ).toFixed(1)
                : null

              return (
                <motion.button
                  key={restaurant.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    isSelected ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    left: `${50 + (Math.random() * 40 - 20)}%`,
                    top: `${50 + (Math.random() * 40 - 20)}%`,
                  }}
                  onClick={() => {
                    setSelectedRestaurant(restaurant)
                    onRestaurantSelect(restaurant)
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative ${
                      restaurant.is_sponsored 
                        ? 'text-yellow-500' 
                        : restaurant.is_certified 
                        ? 'text-primary-green' 
                        : 'text-primary-orange'
                    }`}
                  >
                    <MapPin 
                      className={`w-8 h-8 drop-shadow-lg ${
                        isSelected ? 'scale-125' : ''
                      } transition-transform duration-200`}
                      fill="currentColor"
                    />
                    
                    {/* Badge de distance */}
                    {distance && (
                      <div className="absolute -top-8 -left-4 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg whitespace-nowrap">
                        {distance} km
                      </div>
                    )}
                  </motion.div>
                </motion.button>
              )
            })}

            {/* Position utilisateur */}
            {userLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                style={{ left: '50%', top: '50%' }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contrôles */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary-orange" fill="currentColor" />
            <span>Restaurant standard</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary-green" fill="currentColor" />
            <span>Certifié</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>Sponsorisé</span>
          </div>
        </div>
      </div>
    </div>
  )
}
