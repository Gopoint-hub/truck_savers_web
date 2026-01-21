import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";

// Branding de The Truck Savers
const BRAND_CONFIG = {
  name: "The Truck Savers",
  logo: "https://trucksaver-iglpkssj.manus.space/images/home_logo.png",
  primaryColor: "#368A45",
  secondaryColor: "#1f2937",
  accentColor: "#22c55e",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  tagline: "Taller mecánico de camiones y trailers con más de 21 años de experiencia",
  website: "https://thetrucksavers.com",
  phone: "713-455-5566",
  whatsapp: "17134555566",
};

interface GenerateNewsletterParams {
  prompt: string;
  previousContent?: string;
  editInstructions?: string;
}

interface NewsletterContent {
  subject: string;
  previewText: string;
  htmlContent: string;
  plainContent: string;
}

/**
 * Extrae información de video de YouTube desde una URL
 */
function extractYouTubeInfo(url: string): { videoId: string; thumbnailUrl: string } | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      const videoId = match[1];
      return {
        videoId,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };
    }
  }
  return null;
}

/**
 * Genera el HTML base del newsletter con el branding
 */
function generateEmailTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter - ${BRAND_CONFIG.name}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: ${BRAND_CONFIG.fontFamily};
      background-color: #f4f4f4;
      color: #333333;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: ${BRAND_CONFIG.secondaryColor};
      padding: 20px;
      text-align: center;
    }
    .header img {
      max-height: 60px;
    }
    .content {
      padding: 30px 20px;
    }
    .content h1, .content h2, .content h3 {
      color: ${BRAND_CONFIG.primaryColor};
      margin-top: 0;
    }
    .content p {
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 16px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: ${BRAND_CONFIG.primaryColor};
      color: #ffffff !important;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 16px 0;
    }
    .cta-button:hover {
      background-color: ${BRAND_CONFIG.accentColor};
    }
    .secondary-button {
      display: inline-block;
      background-color: transparent;
      color: ${BRAND_CONFIG.primaryColor} !important;
      padding: 12px 24px;
      text-decoration: none;
      border: 2px solid ${BRAND_CONFIG.primaryColor};
      border-radius: 6px;
      font-weight: bold;
      margin: 16px 8px;
    }
    .video-container {
      position: relative;
      margin: 20px 0;
      text-align: center;
    }
    .video-thumbnail {
      position: relative;
      display: inline-block;
    }
    .video-thumbnail img {
      max-width: 100%;
      border-radius: 8px;
    }
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 68px;
      height: 48px;
      background-color: rgba(0,0,0,0.7);
      border-radius: 10px;
    }
    .play-button::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 55%;
      transform: translate(-50%, -50%);
      border-style: solid;
      border-width: 10px 0 10px 18px;
      border-color: transparent transparent transparent #fff;
    }
    .footer {
      background-color: ${BRAND_CONFIG.secondaryColor};
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .footer a {
      color: ${BRAND_CONFIG.accentColor};
      text-decoration: none;
    }
    .footer p {
      margin: 8px 0;
      font-size: 14px;
    }
    .social-links {
      margin: 16px 0;
    }
    .social-links a {
      margin: 0 8px;
    }
    .unsubscribe {
      font-size: 12px;
      color: #999999;
      margin-top: 20px;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 20px 15px;
      }
      .cta-button, .secondary-button {
        display: block;
        text-align: center;
        margin: 10px 0;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="${BRAND_CONFIG.logo}" alt="${BRAND_CONFIG.name}" />
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p><strong>${BRAND_CONFIG.name}</strong></p>
      <p>${BRAND_CONFIG.tagline}</p>
      <p>
        <a href="tel:+1${BRAND_CONFIG.phone}">📞 ${BRAND_CONFIG.phone}</a> | 
        <a href="https://wa.me/${BRAND_CONFIG.whatsapp}">💬 WhatsApp</a>
      </p>
      <p><a href="${BRAND_CONFIG.website}">${BRAND_CONFIG.website}</a></p>
      <p class="unsubscribe">
        <a href="{{unsubscribe_url}}">Cancelar suscripción</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Genera contenido de newsletter usando IA
 */
export async function generateNewsletterWithAI(params: GenerateNewsletterParams): Promise<NewsletterContent> {
  const { prompt, previousContent, editInstructions } = params;

  const systemPrompt = `Eres un experto en email marketing para ${BRAND_CONFIG.name}, un taller mecánico de camiones y trailers en Houston, Dallas y Monterrey.

INSTRUCCIONES DE FORMATO:
- Genera contenido en HTML válido para email (no uses CSS externo, solo inline styles cuando sea necesario)
- El contenido debe ser profesional pero cercano
- Usa el idioma español
- Incluye llamadas a la acción claras

ELEMENTOS DISPONIBLES:
1. TÍTULOS: Usa <h1>, <h2>, <h3> para títulos
2. PÁRRAFOS: Usa <p> para texto
3. BOTONES: Para CTAs usa este formato exacto:
   <a href="URL" class="cta-button">TEXTO DEL BOTÓN</a>
   Para botones secundarios:
   <a href="URL" class="secondary-button">TEXTO</a>
4. IMÁGENES: 
   - Para imágenes con URL conocida: <img src="URL" alt="descripción" />
   - Para imágenes que deben ser generadas por IA, usa SOLO el placeholder como elemento independiente (NO dentro de un tag img):
     [GENERAR_IMAGEN: descripción detallada de la imagen]
   - IMPORTANTE: El placeholder debe estar solo, NO dentro de src="" ni ningún otro atributo
5. VIDEOS DE YOUTUBE: Si el usuario proporciona un link de YouTube, genera:
   <div class="video-container">
     <a href="URL_VIDEO" class="video-thumbnail">
       <img src="THUMBNAIL_URL" alt="Ver video" />
       <div class="play-button"></div>
     </a>
   </div>
6. LISTAS: Usa <ul><li> o <ol><li>

BRANDING:
- Color principal: ${BRAND_CONFIG.primaryColor} (verde)
- Color secundario: ${BRAND_CONFIG.secondaryColor} (gris oscuro)
- Tono: Profesional, confiable, experto en camiones

RESPONDE EN FORMATO JSON:
{
  "subject": "Asunto del email (máximo 60 caracteres, atractivo)",
  "previewText": "Texto de previsualización (máximo 150 caracteres)",
  "htmlContent": "Contenido HTML del email (solo el contenido interno, sin header ni footer)",
  "plainContent": "Versión en texto plano del contenido"
}`;

  let userPrompt = prompt;
  
  if (editInstructions && previousContent) {
    userPrompt = `CONTENIDO ANTERIOR:
${previousContent}

INSTRUCCIONES DE EDICIÓN:
${editInstructions}

Por favor, modifica el contenido según las instrucciones manteniendo el formato y estilo.`;
  }

  // Procesar URLs de YouTube en el prompt
  const youtubeUrls = prompt.match(/https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+/g) || [];
  if (youtubeUrls.length > 0) {
    userPrompt += "\n\nVIDEOS DE YOUTUBE DETECTADOS:";
    for (const url of youtubeUrls) {
      const info = extractYouTubeInfo(url);
      if (info) {
        userPrompt += `\n- URL: ${url}, Thumbnail: ${info.thumbnailUrl}`;
      }
    }
  }

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "newsletter_content",
        strict: true,
        schema: {
          type: "object",
          properties: {
            subject: { type: "string", description: "Asunto del email" },
            previewText: { type: "string", description: "Texto de previsualización" },
            htmlContent: { type: "string", description: "Contenido HTML del email" },
            plainContent: { type: "string", description: "Versión texto plano" },
          },
          required: ["subject", "previewText", "htmlContent", "plainContent"],
          additionalProperties: false,
        },
      },
    },
  });

  const messageContent = response.choices[0].message.content;
  const contentStr = typeof messageContent === 'string' ? messageContent : JSON.stringify(messageContent);
  const content = JSON.parse(contentStr || "{}") as NewsletterContent;
  
  // Procesar placeholders de imágenes generadas
  let processedHtml = content.htmlContent;
  
  // Primero, limpiar casos donde el placeholder está dentro de un tag img malformado
  // Patrón: <img src="[GENERAR_IMAGEN: ...]" alt="..." ... />
  const malformedImgPattern = /<img[^>]*src="\[GENERAR_IMAGEN:\s*([^\]]+)\]"[^>]*\/?>|<img[^>]*src='\[GENERAR_IMAGEN:\s*([^\]]+)\]'[^>]*\/?>/gi;
  const malformedMatches = processedHtml.match(malformedImgPattern) || [];
  
  for (const malformedTag of malformedMatches) {
    // Extraer la descripción del placeholder
    const descMatch = malformedTag.match(/\[GENERAR_IMAGEN:\s*([^\]]+)\]/);
    if (descMatch) {
      const description = descMatch[1].trim();
      // Reemplazar todo el tag malformado con solo el placeholder
      processedHtml = processedHtml.replace(malformedTag, `[GENERAR_IMAGEN: ${description}]`);
    }
  }
  
  // Ahora procesar los placeholders normalmente
  const imageMatches = processedHtml.match(/\[GENERAR_IMAGEN:\s*([^\]]+)\]/g) || [];
  
  for (const match of imageMatches) {
    const description = match.replace(/\[GENERAR_IMAGEN:\s*/, "").replace(/\]$/, "").trim();
    try {
      const imagePrompt = `Imagen profesional para email marketing de taller de camiones: ${description}. Estilo corporativo, colores verde y gris, alta calidad.`;
      const { url: imageUrl } = await generateImage({ prompt: imagePrompt });
      // Crear un tag img limpio con la URL de S3
      const imgTag = `<img src="${imageUrl}" alt="${description}" style="max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 20px auto;" />`;
      processedHtml = processedHtml.replace(match, imgTag);
    } catch (error) {
      console.error("Error generando imagen:", error);
      // Si falla, mostrar un placeholder visual
      processedHtml = processedHtml.replace(match, `<div style="background: #f0f0f0; padding: 40px; text-align: center; border-radius: 8px; margin: 20px 0;"><p style="color: #666;">Imagen: ${description}</p></div>`);
    }
  }

  // Envolver en template completo
  const fullHtml = generateEmailTemplate(processedHtml);

  return {
    subject: content.subject,
    previewText: content.previewText,
    htmlContent: fullHtml,
    plainContent: content.plainContent,
  };
}

/**
 * Genera una imagen para el newsletter
 */
export async function generateNewsletterImage(description: string): Promise<string> {
  const prompt = `Imagen profesional para email marketing de ${BRAND_CONFIG.name}, taller de camiones y trailers: ${description}. 
Estilo: corporativo, moderno, colores verde (${BRAND_CONFIG.primaryColor}) y gris oscuro.
Alta calidad, apto para email marketing.`;

  const result = await generateImage({ prompt });
  return result.url || '';
}

export { BRAND_CONFIG };
