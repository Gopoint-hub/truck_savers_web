import { Resend } from 'resend';
import { ENV } from './_core/env';

// Inicializar cliente de Resend
const resend = new Resend(ENV.resendApiKey);

// Configuración del remitente
const FROM_EMAIL = 'TTS CMS <noreply@thetrucksavers.com>';
const FROM_EMAIL_NEWSLETTER = 'The Truck Savers <newsletter@thetrucksavers.com>';

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export interface SendInvitationParams {
  to: string;
  userName: string;
  inviterName: string;
  loginUrl: string;
}

export interface SendNewsletterParams {
  to: string[];
  subject: string;
  html: string;
}

/**
 * Enviar un email genérico
 */
export async function sendEmail({ to, subject, html, from = FROM_EMAIL }: SendEmailParams) {
  try {
    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });
    
    if (result.error) {
      console.error('[Email] Error sending email:', result.error);
      return { success: false, error: result.error.message };
    }
    
    console.log('[Email] Email sent successfully:', result.data?.id);
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('[Email] Exception sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Enviar invitación a un nuevo usuario del CMS
 */
export async function sendInvitation({ to, userName, inviterName, loginUrl }: SendInvitationParams) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #368A45 0%, #2D6E39 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">The Truck Savers</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Sistema de Gestión Interno</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">¡Hola ${userName}!</h2>
        
        <p>Has sido invitado por <strong>${inviterName}</strong> a unirte al panel de administración de The Truck Savers.</p>
        
        <p>Para acceder al sistema, haz clic en el siguiente botón:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${loginUrl}" style="background: #368A45; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            Acceder al CMS
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          Si no esperabas esta invitación, puedes ignorar este correo.
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
          The Truck Savers - Taller mecánico de camiones y trailers<br>
          Houston, TX | Dallas, TX | Monterrey, NL
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: `${inviterName} te ha invitado a The Truck Savers CMS`,
    html,
  });
}

/**
 * Enviar newsletter a suscriptores
 */
export async function sendNewsletter({ to, subject, html }: SendNewsletterParams) {
  // Enviar en lotes de 50 para evitar límites de rate
  const batchSize = 50;
  const results: { success: boolean; sent: number; failed: number; errors: string[] } = {
    success: true,
    sent: 0,
    failed: 0,
    errors: [],
  };

  for (let i = 0; i < to.length; i += batchSize) {
    const batch = to.slice(i, i + batchSize);
    
    try {
      const result = await resend.emails.send({
        from: FROM_EMAIL_NEWSLETTER,
        to: batch,
        subject,
        html,
      });
      
      if (result.error) {
        results.failed += batch.length;
        results.errors.push(result.error.message);
      } else {
        results.sent += batch.length;
      }
    } catch (error) {
      results.failed += batch.length;
      results.errors.push(error instanceof Error ? error.message : 'Unknown error');
    }
    
    // Pequeña pausa entre lotes
    if (i + batchSize < to.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  results.success = results.failed === 0;
  return results;
}

/**
 * Verificar que la API key de Resend es válida
 */
export async function verifyResendApiKey(): Promise<{ valid: boolean; error?: string }> {
  try {
    // Intentar obtener los dominios para verificar la API key
    const result = await resend.domains.list();
    
    if (result.error) {
      return { valid: false, error: result.error.message };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
