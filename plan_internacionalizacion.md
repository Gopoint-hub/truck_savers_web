'''
# Plan de Implementación: Sitio Web Bilingüe (Español/Inglés)

**Autor:** Manus AI
**Fecha:** 27 de Enero de 2026

## 1. Objetivo

Adaptar el sitio web de The Truck Savers para ofrecer una experiencia de usuario completamente bilingüe, soportando Español (es) e Inglés (en). El sistema deberá detectar automáticamente el idioma del navegador del usuario para la primera visita y permitir el cambio manual de idioma en cualquier momento. Esta implementación busca expandir el alcance del negocio a un público angloparlante, principalmente en los Estados Unidos, y mejorar el posicionamiento SEO internacional.

## 2. Fases del Proyecto

El proyecto se dividirá en cinco fases principales para asegurar una implementación estructurada y controlada.

| Fase | Título | Descripción |
| :--- | :--- | :--- |
| 1 | Arquitectura y Tecnología | Selección e integración de las herramientas de internacionalización (i18n), definición de la estructura de URLs y configuración del almacenamiento de traducciones. |
| 2 | Traducción y Localización de Contenido | Traducción de todo el contenido textual del sitio web, incluyendo textos de UI, artículos de blog, páginas de servicios, metadatos SEO y contenido legal. |
| 3 | Implementación y Desarrollo | Modificación del código fuente para integrar las traducciones, implementar la lógica de detección de idioma, el selector de idioma y las etiquetas SEO multilingües. |
| 4 | Pruebas y Control de Calidad (QA) | Verificación exhaustiva de la funcionalidad de idioma, la correcta visualización de los textos y la ausencia de errores en ambas versiones del sitio. |
| 5 | Despliegue y Monitoreo | Puesta en producción de la nueva versión bilingüe y seguimiento post-lanzamiento para corregir cualquier incidencia. |

---

## 3. Desglose Detallado por Fase

### Fase 1: Arquitectura y Tecnología

Esta fase sienta las bases técnicas del proyecto.

*   **Librería de Internacionalización (i18n):**
    *   Se utilizará **`i18next`** junto con **`react-i18next`**. Es el estándar de la industria para aplicaciones React, ofreciendo una solución robusta y flexible para la gestión de traducciones.

*   **Estructura de URLs y SEO:**
    *   Se adoptará una estrategia de **subdirectorios por idioma** (ej. `thetrucksavers.com/en/...` y `thetrucksavers.com/es/...`). Esta es la práctica recomendada por Google para un SEO óptimo, ya que permite una segmentación geográfica clara.
    *   La raíz del sitio (`/`) redirigirá al subdirectorio de idioma correspondiente (`/en` o `/es`) basándose en el encabezado `Accept-Language` del navegador.

*   **Almacenamiento de Traducciones:**
    *   Los textos se almacenarán en archivos **JSON**. Se creará una estructura de carpetas `locales` dentro de `/client/src`, con subcarpetas para cada idioma (`en`, `es`). Dentro de ellas, los archivos JSON agruparán las traducciones por sección (ej. `common.json`, `home.json`, `services.json`).

### Fase 2: Traducción y Localización de Contenido

El éxito de la internacionalización depende de la calidad de la traducción.

*   **Inventario de Contenido:** Se realizará un análisis completo del sitio para identificar todos los textos que requieren traducción:
    *   Componentes de la interfaz (botones, menús, etiquetas de formularios).
    *   Contenido de páginas estáticas (Inicio, Nosotros, Contacto).
    *   Contenido de páginas de servicios (Inspección "La Bailada", etc.).
    *   Artículos del blog.
    *   Metadatos SEO (títulos, descripciones, palabras clave).
    *   Textos legales (Términos y Condiciones, Política de Privacidad).
*   **Proceso de Traducción:** Se recomienda la colaboración con un **traductor profesional nativo de inglés** para asegurar no solo la precisión, sino también la localización cultural y técnica de los términos de la industria.

### Fase 3: Implementación y Desarrollo

Esta es la fase de codificación y la más intensiva en tiempo de desarrollo.

*   **Configuración de `i18next`:** Se inicializará y configurará la librería en el punto de entrada de la aplicación React.
*   **Refactorización de Componentes:** Se reemplazarán todos los textos hardcodeados por la función `t('clave_de_traduccion')` del hook `useTranslation`.
*   **Enrutamiento (Routing):** Se modificará la configuración de `wouter` para que todas las rutas incluyan el prefijo de idioma (`/:lang/...`).
*   **Detección de Idioma:**
    *   **Servidor:** Se implementará un middleware en Express.js que analice el encabezado `Accept-Language` en la primera visita y redirija a la ruta con el prefijo de idioma adecuado.
    *   **Cliente:** Se guardará la preferencia de idioma del usuario en `localStorage`.
*   **Selector de Idioma:** Se creará un componente de UI (generalmente en el header o footer) que muestre el idioma actual y permita al usuario cambiar al otro idioma disponible.
*   **SEO Multilingüe (`hreflang`):** El componente `SEO.tsx` se actualizará para añadir dinámicamente las etiquetas `<link rel="alternate" hreflang="x" ... />`. Estas etiquetas son cruciales para indicar a Google las versiones alternativas de cada página, evitando problemas de contenido duplicado.

### Fase 4: Pruebas y Control de Calidad (QA)

Antes del lanzamiento, se debe garantizar una experiencia sin fisuras.

*   **Pruebas Funcionales:**
    *   Verificar que la detección automática de idioma funciona correctamente.
    *   Probar el selector de idioma en múltiples páginas.
    *   Confirmar que la preferencia de idioma se mantiene durante la navegación.
*   **Pruebas de Contenido:**
    *   Revisar todas las páginas en ambos idiomas para asegurar que no hay textos sin traducir o errores de formato.
    *   Verificar que las imágenes y otros medios se muestran correctamente en ambas versiones.
*   **Pruebas SEO:**
    *   Utilizar herramientas de desarrollo del navegador para inspeccionar el `head` y confirmar que las etiquetas `hreflang` se generan correctamente para cada página.

### Fase 5: Despliegue y Monitoreo

El último paso es llevar los cambios a producción.

*   **Despliegue:** Se subirán los cambios al repositorio de GitHub, lo que activará automáticamente el despliegue en Render.
*   **Monitoreo Post-Lanzamiento:** Se vigilará la plataforma (Google Search Console, logs de Render) durante los días posteriores al lanzamiento para detectar y solucionar cualquier problema que no haya sido identificado en la fase de QA.

## 4. Cronograma Estimado

| Fase | Tareas Principales | Estimación |
| :--- | :--- | :--- |
| 1 | Configuración de i18next, estructura de carpetas. | 1 día |
| 2 | Inventario de textos y gestión de traducción. | 3-5 días (depende de la velocidad del traductor) |
| 3 | Refactorización, routing, selector de idioma, SEO. | 4-6 días |
| 4 | Pruebas funcionales, de contenido y SEO. | 2 días |
| 5 | Despliegue y monitoreo inicial. | 1 día |
| **Total** | | **11-15 días hábiles** |

Este cronograma es una estimación y puede variar según la complejidad que surja durante el desarrollo y la rapidez de la fase de traducción.
'''
