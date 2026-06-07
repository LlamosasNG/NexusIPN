export type EmailHighlight = {
  label: string
  value: string
}

export type InstitutionalEmailInput = {
  frontendUrl: string | undefined
  preheader: string
  title: string
  recipientName: string
  paragraphs: string[]
  actionLabel: string
  actionPath: string
  securityNotice: string
  highlight?: EmailHighlight
}

export type RenderedEmail = {
  html: string
  text: string
}

export const INSTITUTIONAL_LOGO_CID = 'nexus-ipn-logo'

export const buildFrontendUrl = (
  frontendUrl: string | undefined,
  path: string
) => {
  const baseUrl = frontendUrl?.trim().replace(/\/+$/, '')

  if (!baseUrl) {
    throw new Error('FRONTEND_URL no está configurada')
  }

  return `${baseUrl}/${path.replace(/^\/+/, '')}`
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] as string
  )

export const renderInstitutionalEmail = (
  input: InstitutionalEmailInput
): RenderedEmail => {
  const actionUrl = buildFrontendUrl(input.frontendUrl, input.actionPath)
  const safeActionUrl = escapeHtml(actionUrl)
  const paragraphHtml = input.paragraphs
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;color:#4b3f46;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;">${escapeHtml(paragraph)}</p>`
    )
    .join('')
  const highlightHtml = input.highlight
    ? `<tr>
        <td style="padding:0 38px 30px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border:1px solid #ead9b0;background:#fffaf0;">
            <tr>
              <td width="6" style="width:6px;background:#d4af37;font-size:0;line-height:0;">&nbsp;</td>
              <td align="center" style="padding:22px 20px;">
                <div style="margin-bottom:10px;color:#7c2855;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">${escapeHtml(input.highlight.label)}</div>
                <div style="color:#2f1724;font-family:'Courier New',Courier,monospace;font-size:27px;font-weight:700;letter-spacing:3px;line-height:1.3;word-break:break-all;">${escapeHtml(input.highlight.value)}</div>
              </td>
              <td width="6" style="width:6px;background:#d4af37;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>`
    : ''
  const textLines = [
    'Nexus IPN',
    '',
    input.title,
    '',
    `Hola ${input.recipientName},`,
    '',
    ...input.paragraphs.flatMap((paragraph) => [paragraph, '']),
    ...(input.highlight
      ? [`${input.highlight.label}: ${input.highlight.value}`, '']
      : []),
    `${input.actionLabel}: ${actionUrl}`,
    '',
    input.securityNotice,
    '',
    'Este es un mensaje automático de Nexus IPN.',
  ]

  return {
    html: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>${escapeHtml(input.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f2ecef;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(input.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f2ecef;">
      <tr>
        <td align="center" style="padding:42px 16px;">
          <table role="presentation" width="620" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;border-collapse:separate;background:#ffffff;box-shadow:0 18px 48px rgba(61,24,45,.12);">
            <tr>
              <td style="background:#5a1d3f;padding:14px 38px;">
                <p style="margin:0;color:#e8c96f;font-size:10px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase;">Instituto Politécnico Nacional</p>
              </td>
            </tr>
            <tr>
              <td style="border-bottom:5px solid #d4af37;background:#fffaf0;padding:28px 38px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td width="82" valign="middle" style="width:82px;">
                      <img src="cid:${INSTITUTIONAL_LOGO_CID}" width="70" alt="Nexus IPN" style="display:block;width:70px;height:auto;border:0;">
                    </td>
                    <td valign="middle" style="padding-left:18px;">
                      <p style="margin:0 0 5px;color:#5a1d3f;font-family:Georgia,'Times New Roman',serif;font-size:27px;font-weight:700;line-height:1.1;">Nexus IPN</p>
                      <p style="margin:0;color:#8b6b18;font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Gestión académica conectada</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:38px 38px 18px;">
                <p style="margin:0 0 12px;color:#b08b24;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Notificación de cuenta</p>
                <h1 style="margin:0 0 16px;color:#3c172b;font-family:Georgia,'Times New Roman',serif;font-size:31px;font-weight:700;line-height:1.2;">${escapeHtml(input.title)}</h1>
                <div style="width:52px;height:3px;margin:0 0 26px;background:#d4af37;font-size:0;line-height:0;">&nbsp;</div>
                <p style="margin:0 0 18px;color:#7c2855;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.6;">Hola <strong>${escapeHtml(input.recipientName)}</strong>,</p>
                ${paragraphHtml}
              </td>
            </tr>
            ${highlightHtml}
            <tr>
              <td align="center" style="padding:0 38px 30px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="center" style="background:#7c2855;border-bottom:4px solid #5a1d3f;">
                      <a href="${safeActionUrl}" style="display:inline-block;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:.4px;line-height:1;text-decoration:none;padding:17px 30px;">${escapeHtml(input.actionLabel)} &nbsp;&#8594;</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 38px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-top:1px solid #eadfe4;">
                  <tr>
                    <td style="padding-top:22px;">
                      <p style="margin:0 0 7px;color:#807078;font-size:12px;line-height:1.5;">Si el botón no funciona, copia y pega esta dirección:</p>
                      <p style="margin:0;word-break:break-all;"><a href="${safeActionUrl}" style="color:#7c2855;font-size:12px;line-height:1.5;text-decoration:underline;">${safeActionUrl}</a></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #e2d4da;background:#f8f3f5;padding:22px 38px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td width="24" valign="top" style="width:24px;color:#d4af37;font-size:18px;line-height:1;">&#9670;</td>
                    <td valign="top">
                      <p style="margin:0 0 8px;color:#5a1d3f;font-size:12px;font-weight:700;line-height:1.5;">${escapeHtml(input.securityNotice)}</p>
                      <p style="margin:0;color:#807078;font-size:11px;line-height:1.5;">Mensaje automático de Nexus IPN. Por favor, no respondas a este correo.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#3c172b;padding:10px 38px;text-align:center;">
                <p style="margin:0;color:#d8c9d0;font-size:10px;letter-spacing:.5px;">Nexus IPN &middot; Comunidad académica, conocimiento y colaboración</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text: textLines.join('\n').trim(),
  }
}
