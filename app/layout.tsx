import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingCart from '@/components/FloatingCart'

// Utiliser seulement Inter comme font principale (plus fiable)
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

// Pour les fonts Poppins et Playfair, on utilisera des fallbacks CSS
// ou on les chargera via CDN dans le head

export const metadata: Metadata = {
  title: 'Restafy - Plateforme Premium de Restaurants',
  description: 'Votre restaurant en ligne, élégant et performant. Rejoignez la plateforme qui valorise l\'excellence culinaire.',
  keywords: 'restaurant, food, delivery, premium, qualité, excellence',
  authors: [{ name: 'Restafy Team' }],
  creator: 'Restafy',
  publisher: 'Restafy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://restafy.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://restafy.vercel.app',
    title: 'Restafy - Plateforme Premium de Restaurants',
    description: 'Votre restaurant en ligne, élégant et performant',
    siteName: 'Restafy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Restafy - Plateforme Premium de Restaurants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restafy - Plateforme Premium de Restaurants',
    description: 'Votre restaurant en ligne, élégant et performant',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#FF7A00" />
        
        {/* Charger les fonts via CDN pour plus de fiabilité */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-primary-cream">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingCart />
        </div>
      </body>
    </html>
  )
}
