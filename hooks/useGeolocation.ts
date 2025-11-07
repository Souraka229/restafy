'use client'

import { useState, useEffect } from 'react'

interface Location {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

interface UseGeolocationReturn {
  location: Location | null
  error: string | null
  isLoading: boolean
  requestLocation: () => void
}

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur')
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        })
        setIsLoading(false)
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Accès à la localisation refusé')
            break
          case err.POSITION_UNAVAILABLE:
            setError('Information de localisation indisponible')
            break
          case err.TIMEOUT:
            setError('La demande de localisation a expiré')
            break
          default:
            setError('Une erreur inconnue est survenue')
            break
        }
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  useEffect(() => {
    // Demander automatiquement la localisation au chargement
    requestLocation()
  }, [])

  return { location, error, isLoading, requestLocation }
}
