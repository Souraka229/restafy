'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url: string
}

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Pizza Margherita',
      price: 1499,
      quantity: 1,
      image_url: '/menu/pizza-margherita.jpg'
    },
    {
      id: '2',
      name: 'Tiramisu',
      price: 699,
      quantity: 2,
      image_url: '/menu/tiramisu.jpg'
    }
  ])

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const updateQuantity = (id: string, change: number) => {
    setItems(current => 
      current.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2) + ' €'
  }

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-primary-orange text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-primary-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {itemCount}
            </motion.span>
          )}
        </div>
      </motion.button>

      {/* Cart Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Cart */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="font-heading font-semibold text-2xl text-primary-black">
                    Votre Panier
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">Votre panier est vide</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-primary-black truncate">
                              {item.name}
                            </h3>
                            <p className="text-primary-orange font-semibold">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="font-semibold min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="border-t border-gray-200 p-6 space-y-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary-orange">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <Button className="w-full bg-primary-orange hover:bg-orange-600 py-3 text-lg">
                      Commander maintenant
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
