'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X,
  Crown
} from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-orange to-primary-terracotta rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-2xl text-primary-black">
              Restafy
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-700 hover:text-primary-orange transition-colors font-medium">
              Restaurants
            </Link>
            <Link href="/sponsor" className="text-gray-700 hover:text-primary-orange transition-colors font-medium">
              Devenir Sponsor
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-orange transition-colors font-medium">
              À propos
            </Link>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="default">
              <User className="w-4 h-4 mr-2" />
              Connexion
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4 space-y-4"
          >
            <Link href="/explore" className="block text-gray-700 hover:text-primary-orange transition-colors font-medium">
              Restaurants
            </Link>
            <Link href="/sponsor" className="block text-gray-700 hover:text-primary-orange transition-colors font-medium">
              Devenir Sponsor
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-primary-orange transition-colors font-medium">
              À propos
            </Link>
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Button variant="default" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
