interface PaymentSession {
  amount: number
  currency: string
  description: string
  callback_url: string
  metadata: Record<string, any>
}

export class FedaPayService {
  private baseUrl = 'https://api.fedapay.com/v1'
  private apiKey: string

  constructor() {
    this.apiKey = process.env.FEDAPAY_SECRET_KEY!
  }

  async createPaymentSession(session: PaymentSession) {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    })

    if (!response.ok) {
      throw new Error('Failed to create payment session')
    }

    return response.json()
  }

  async verifyWebhook(signature: string, body: string): Promise<boolean> {
    // Implémentation de la vérification HMAC
    const crypto = await import('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', process.env.FEDAPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')
    
    return signature === expectedSignature
  }

  async getTransactionStatus(transactionId: string) {
    const response = await fetch(`${this.baseUrl}/transactions/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch transaction status')
    }

    return response.json()
  }
}

export const fedapay = new FedaPayService()
