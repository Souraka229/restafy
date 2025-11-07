'use client'

import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url: string
  restaurant_id: string
  restaurant_name: string
}

interface CartStore {
  items: CartItem[]
  restaurantId: string | null
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = (): CartStore => {
  const [items, setItems] = useState<CartItem[]>([])
  const [restaurantId, setRestaurantId] = useState<string | null>(null)

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem('restafy-cart')
    if (savedCart) {
      try {
        const { items: savedItems, restaurantId: savedRestaurantId } = JSON.parse(savedCart)
        setItems(savedItems || [])
        setRestaurantId(savedRestaurantId || null)
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('restafy-cart', JSON.stringify({ items, restaurantId }))
  }, [items, restaurantId])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    // Vérifier si on change de restaurant
    if (restaurantId && restaurantId !== item.restaurant_id) {
      if (confirm('Votre panier contient des articles d\'un autre restaurant. Voulez-vous le vider ?')) {
        setItems([])
        setRestaurantId(item.restaurant_id)
      } else {
        return
      }
    }

    setItems(current => {
      const existingItem = current.find(i => i.id === item.id)
      
      if (existingItem) {
        return current.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      } else {
        if (!restaurantId) {
          setRestaurantId(item.restaurant_id)
        }
        return [...current, { ...item, quantity: 1 }]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems(current => {
      const newItems = current.filter(i => i.id !== id)
      // Si le panier est vide, réinitialiser le restaurantId
      if (newItems.length === 0) {
        setRestaurantId(null)
      }
      return newItems
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    
    setItems(current =>
      current.map(i =>
        i.id === id ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setRestaurantId(null)
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    items,
    restaurantId,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  }
}
