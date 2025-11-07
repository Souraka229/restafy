import Link from 'next/link'
import { Crown, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-orange to-primary-terracotta rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl">Restafy</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Restafy est une plateforme premium développée par <strong>ForceConnect</strong> 
              pour propulser les restaurants du Bénin dans l’univers digital. 
              Offrez une expérience culinaire de prestige, optimisée et connectée.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+229 01 55 53 08 26</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contact@forceconnect.tech</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Parakou, Bénin</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-gray-400 hover:text-white transition-colors">Restaurants</Link></li>
              <li><Link href="/sponsor" className="text-gray-400 hover:text-white transition-colors">Devenir Sponsor</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Conditions</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Restafy — Tous droits réservés.
          </p>
          <div className="flex flex-col items-center md:items-end space-y-1 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Plateforme Restaurant Premium</span>
            <span className="text-gray-500 text-xs italic">ForceConnect by SH</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
