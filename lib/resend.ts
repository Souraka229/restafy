import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

export const sendEmail = async ({ to, subject, html, from = 'Restafy <no-reply@restafy.com>' }: SendEmailParams) => {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
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

// Templates d'emails en HTML simple
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: `Bienvenue sur Restafy, ${name} ! 🎉`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF7A00, #C65D3A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { background: #FF7A00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bienvenue sur Restafy !</h1>
            </div>
            <div class="content">
              <h2>Bonjour ${name},</h2>
              <p>Merci de nous avoir rejoint ! Nous sommes ravis de vous accompagner dans votre succès digital.</p>
              <p>Chez Restafy, nous valorisons l'excellence culinaire et nous sommes impatients de découvrir votre établissement.</p>
              <br>
              <a href="https://restafy.vercel.app/dashboard" class="button">Accéder à mon dashboard</a>
              <br><br>
              <p>À très vite,<br>L'équipe Restafy</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),
  
  orderConfirmation: (orderNumber: string, total: number) => ({
    subject: `Confirmation de commande #${orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0F9D58; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Commande confirmée !</h1>
            </div>
            <div class="content">
              <h2>Votre commande a été confirmée</h2>
              <p><strong>Numéro de commande :</strong> #${orderNumber}</p>
              <p><strong>Montant total :</strong> ${total}€</p>
              <p>Nous vous tiendrons informé de l'avancement de votre commande.</p>
              <br>
              <p>Merci pour votre confiance,<br>L'équipe Restafy</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),
  
  sponsorshipActive: (plan: string) => ({
    subject: `Votre sponsorisation ${plan} est active !`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF7A00, #C65D3A); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Sponsorisation activée !</h1>
            </div>
            <div class="content">
              <h2>Félicitations !</h2>
              <p>Votre plan <strong>${plan}</strong> est maintenant actif.</p>
              <p>Profitez d'une visibilité accrue sur Restafy et atteignez plus de clients.</p>
              <br>
              <p>À très vite,<br>L'équipe Restafy</p>
            </div>
          </div>
        </body>
      </html>
    `
  })
}
