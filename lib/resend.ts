import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
  to: string | string[]
  subject: string
  react: React.ReactElement
  from?: string
}

export const sendEmail = async ({ to, subject, react, from = 'Restafy <no-reply@restafy.com>' }: SendEmailParams) => {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

// Templates d'emails
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: `Bienvenue sur Restafy, ${name} ! 🎉`,
    react: (
      <div>
        <h1>Bienvenue sur Restafy !</h1>
        <p>Merci de nous avoir rejoint, {name} !</p>
        <p>Nous sommes ravis de vous accompagner dans votre succès digital.</p>
      </div>
    )
  }),
  
  orderConfirmation: (orderNumber: string, total: number) => ({
    subject: `Confirmation de commande #${orderNumber}`,
    react: (
      <div>
        <h1>Commande confirmée !</h1>
        <p>Votre commande #{orderNumber} a été confirmée.</p>
        <p>Total: {total}€</p>
      </div>
    )
  }),
  
  sponsorshipActive: (plan: string) => ({
    subject: `Votre sponsorisation ${plan} est active !`,
    react: (
      <div>
        <h1>Sponsorisation activée !</h1>
        <p>Votre plan {plan} est maintenant actif.</p>
        <p>Profitez d'une visibilité accrue sur Restafy.</p>
      </div>
    )
  })
}
