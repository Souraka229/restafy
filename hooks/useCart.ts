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
            set({ items: [], restaurantId: item.restaurant_id })
          } else {
            return
          }
        }

        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id)
          
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            }
          } else {
            return {
              items: [...state.items, { ...item, quantity: 1 }],
              restaurantId: item.restaurant_id
            }
          }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(i => i.id !== id)
        }))
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set((state) => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, quantity } : i
          )
        }))
      },
      
      clearCart: () => {
        set({ items: [], restaurantId: null })
      },
      
      getTotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getItemCount: () => {
        const state = get()
        return state.items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'restafy-cart'
    }
  )
)
