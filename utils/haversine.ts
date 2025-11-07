/**
 * Calcule la distance entre deux points géographiques using Haversine formula
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371 // Rayon de la Terre en kilomètres
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  
  return distance
}

/**
 * Convertit des degrés en radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

/**
 * Trouve les restaurants dans un rayon donné
 */
export const findRestaurantsInRadius = (
  userLat: number,
  userLon: number,
  restaurants: Array<{
    id: string
    latitude: number
    longitude: number
    [key: string]: any
  }>,
  radiusKm: number = 5
) => {
  return restaurants.filter(restaurant => {
    const distance = calculateDistance(
      userLat,
      userLon,
      restaurant.latitude,
      restaurant.longitude
    )
    return distance <= radiusKm
  }).sort((a, b) => {
    const distA = calculateDistance(userLat, userLon, a.latitude, a.longitude)
    const distB = calculateDistance(userLat, userLon, b.latitude, b.longitude)
    return distA - distB
  })
}

/**
 * Calcule le temps de livraison estimé basé sur la distance
 */
export const estimateDeliveryTime = (distance: number, preparationTime: number = 20): number => {
  // Temps de préparation moyen + temps de livraison (5 min/km)
  const deliveryTime = distance * 5
  return Math.round(preparationTime + deliveryTime)
}
