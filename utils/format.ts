/**
 * Formate un prix en centimes en format lisible
 */
export const formatPrice = (price: number, currency: string = 'EUR'): string => {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  })
  
  return formatter.format(price / 100)
}

/**
 * Formate une date en français
 */
export const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {}): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  
  return new Date(date).toLocaleDateString('fr-FR', defaultOptions)
}

/**
 * Formate un numéro de téléphone français
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $
