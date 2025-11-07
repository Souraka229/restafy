'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      
      addItem: (item) => {
        const state = get()
        
        // Vérifier si on change de restaurant
        if (state.restaurantId && state.restaurantId !== item.restaurant_id) {
          if (confirm('Votre panier contient des articles d\'un autre restaurant. Voulez-vous le vider ?')) {
            set
