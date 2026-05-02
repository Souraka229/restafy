'use client'

import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface MenuItemCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    is_available: boolean
    preparation_time?: number
    tags?: string[]
  }
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0)

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2) + ' €'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden border-2 border-transparent group-hover:border-primary-orange/20 transition-all duration-300">
        <div className="flex gap-4">
          {/* Image */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-lg text-primary-black truncate">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="font-heading font-semibold text-primary-orange text-lg">
                  {formatPrice(item.price)}
                </p>
                {item.preparation_time && (
                  <p className="text-gray-500 text-xs mt-1">
                    {item.preparation_time} min
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-primary-orange/10 text-primary-orange px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              {!item.is_available ? (
                <span className="text-red-600 text-sm font-medium">
                  Indisponible
                </span>
              ) : quantity === 0 ? (
                <Button
                  onClick={() => setQuantity(1)}
                  className="bg-primary-orange hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity - 1)}
                    className="w-8 h-8 rounded-full"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-primary-black min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
