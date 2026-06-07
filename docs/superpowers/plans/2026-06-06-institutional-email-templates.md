# Institutional Email Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three inline email bodies with a shared Nexus IPN institutional template that produces compatible HTML and plain text.

**Architecture:** Add one pure template module under `server/src/emails/templates/` that owns URL construction, HTML escaping, the table-based institutional layout, and plain-text rendering. Keep `AuthEmail` responsible for selecting each notification's subject and content, then pass the rendered `html` and `text` to the existing Nodemailer transport.

**Tech Stack:** TypeScript, Nodemailer, Jest, ts-jest, pnpm

---

## File Structure

- Create `server/src/emails/templates/institutionalEmailTemplate.ts`: pure URL and email rendering helpers.
- Create `server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts`: unit coverage for layout, escaping, optional content, text output, and URL normalization.
- Modify `server/src/emails/AuthEmail.ts`: compose the three existing emails with the shared template.
- Modify `server/src/__tests__/emails/AuthEmail.test.ts`: verify each transport payload includes the correct institutional HTML and text.

Existing uncommitted changes in `AuthEmail.ts` and its test include the temporary-credentials flow. Preserve those changes and edit them in place; do not restore either file from `HEAD`.

### Task 1: Frontend URL Builder

**Files:**
- Create: `server/src/emails/templates/institutionalEmailTemplate.ts`
- Create: `server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts`

- [ ] **Step 1: Write the failing URL tests**

Create `server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts`:

```ts
import {
  buildFrontendUrl,
  renderInstitutionalEmail,
} from '@/emails/templates/institutionalEmailTemplate'

describe('institutionalEmailTemplate', () => {
  describe('buildFrontendUrl', () => {
    it('une la URL base y la ruta sin duplicar diagonales', () => {
      expect(
        buildFrontendUrl('https://nexus.example.edu.mx/', '/auth/login')
      ).toBe('https://nexus.example.edu.mx/auth/login')
    })

    it('falla cuando FRONTEND_URL no está configurada', () => {
      expect(() => buildFrontendUrl(undefined, '/auth/login')).toThrow(
        'FRONTEND_URL no está configurada'
      )
    })
  })

  describe('renderInstitutionalEmail', () => {
    // The renderer tests are added in Task 2.
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
cd server
pnpm test -- --runInBand src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
```

Expected: FAIL because `@/emails/templates/institutionalEmailTemplate` does not exist.

- [ ] **Step 3: Implement the URL helper and public types**

Create `server/src/emails/templates/institutionalEmailTemplate.ts`:

```ts
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

export const renderInstitutionalEmail = (
  input: InstitutionalEmailInput
): RenderedEmail => {
  throw new Error(`Plantilla no implementada: ${input.title}`)
}
```

- [ ] **Step 4: Run the focused test and verify GREEN for URL behavior**

Run:

```bash
cd server
pnpm test -- --runInBand src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
```

Expected: PASS for both `buildFrontendUrl` tests; the empty renderer describe has no tests yet.

- [ ] **Step 5: Commit the URL helper**

```bash
git add server/src/emails/templates/institutionalEmailTemplate.ts \
  server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
git commit -m "test: define institutional email URL behavior"
```

### Task 2: Institutional HTML and Plain-Text Renderer

**Files:**
- Modify: `server/src/emails/templates/institutionalEmailTemplate.ts`
- Modify: `server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts`

- [ ] **Step 1: Add failing renderer tests**

Replace the empty `renderInstitutionalEmail` describe with:

```ts
  describe('renderInstitutionalEmail', () => {
    const input = {
      frontendUrl: 'https://nexus.example.edu.mx/',
      preheader: 'Completa el acceso a tu cuenta',
      title: 'Confirma tu cuenta',
      recipientName: 'Ana & <Docente>',
      paragraphs: ['Usa el código para continuar.'],
      highlight: {
        label: 'Código de confirmación',
        value: '123<456>',
      },
      actionLabel: 'Confirmar cuenta',
      actionPath: '/auth/confirm-account',
      securityNotice: 'No compartas este código.',
    }

    it('genera el layout institucional con logo, colores y acción', () => {
      const result = renderInstitutionalEmail(input)

      expect(result.html).toContain(
        'https://nexus.example.edu.mx/logo_nexusipn.png'
      )
      expect(result.html).toContain('#7c2855')
      expect(result.html).toContain('#d4af37')
      expect(result.html).toContain('Confirma tu cuenta')
      expect(result.html).toContain(
        'https://nexus.example.edu.mx/auth/confirm-account'
      )
      expect(result.html).toContain('Confirmar cuenta')
    })

    it('escapa todos los valores variables incluidos en HTML', () => {
      const result = renderInstitutionalEmail(input)

      expect(result.html).toContain('Ana &amp; &lt;Docente&gt;')
      expect(result.html).toContain('123&lt;456&gt;')
      expect(result.html).not.toContain('Ana & <Docente>')
      expect(result.html).not.toContain('123<456>')
    })

    it('genera una alternativa de texto plano con la URL completa', () => {
      const result = renderInstitutionalEmail(input)

      expect(result.text).toContain('Hola Ana & <Docente>,')
      expect(result.text).toContain('Código de confirmación: 123<456>')
      expect(result.text).toContain(
        'Confirmar cuenta: https://nexus.example.edu.mx/auth/confirm-account'
      )
      expect(result.text).toContain('No compartas este código.')
    })

    it('omite el bloque destacado cuando no se proporciona', () => {
      const result = renderInstitutionalEmail({
        ...input,
        highlight: undefined,
      })

      expect(result.html).not.toContain('Código de confirmación')
      expect(result.text).not.toContain('Código de confirmación')
    })
  })
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
cd server
pnpm test -- --runInBand src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
```

Expected: FAIL with `Plantilla no implementada`.

- [ ] **Step 3: Implement escaping and the shared renderer**

Replace the temporary `renderInstitutionalEmail` implementation with the
following helpers and renderer:

```ts
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
  const logoUrl = buildFrontendUrl(
    input.frontendUrl,
    '/logo_nexusipn.png'
  )
  const safeActionUrl = escapeHtml(actionUrl)
  const safeLogoUrl = escapeHtml(logoUrl)
  const paragraphHtml = input.paragraphs
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">${escapeHtml(paragraph)}</p>`
    )
    .join('')
  const highlightHtml = input.highlight
    ? `<tr>
        <td style="padding:0 32px 24px;">
          <div style="border:1px solid #e8c96f;border-radius:12px;background:#fffaf0;padding:18px;text-align:center;">
            <div style="margin-bottom:8px;color:#7c2855;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;">${escapeHtml(input.highlight.label)}</div>
            <div style="color:#111827;font-family:Consolas,Monaco,monospace;font-size:24px;font-weight:700;letter-spacing:.08em;word-break:break-all;">${escapeHtml(input.highlight.value)}</div>
          </div>
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
    <title>${escapeHtml(input.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f3ef;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(input.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f7f3ef;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;overflow:hidden;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;">
            <tr>
              <td align="center" style="border-bottom:4px solid #d4af37;background:#7c2855;padding:24px 32px;">
                <img src="${safeLogoUrl}" width="88" alt="Nexus IPN" style="display:block;width:88px;height:auto;margin:0 auto 10px;">
                <div style="color:#ffffff;font-size:20px;font-weight:700;">Nexus IPN</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 16px;">
                <h1 style="margin:0 0 20px;color:#5a1d3f;font-size:28px;line-height:1.25;">${escapeHtml(input.title)}</h1>
                <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">Hola ${escapeHtml(input.recipientName)},</p>
                ${paragraphHtml}
              </td>
            </tr>
            ${highlightHtml}
            <tr>
              <td align="center" style="padding:0 32px 24px;">
                <a href="${safeActionUrl}" style="display:inline-block;border-radius:10px;background:#7c2855;color:#ffffff;font-size:16px;font-weight:700;line-height:1;text-decoration:none;padding:15px 24px;">${escapeHtml(input.actionLabel)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.5;">Si el botón no funciona, abre este enlace:</p>
                <p style="margin:0;word-break:break-all;"><a href="${safeActionUrl}" style="color:#7c2855;font-size:13px;">${safeActionUrl}</a></p>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #e5e7eb;background:#f9fafb;padding:20px 32px;">
                <p style="margin:0 0 8px;color:#5a1d3f;font-size:13px;font-weight:700;">${escapeHtml(input.securityNotice)}</p>
                <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.5;">Este es un mensaje automático de Nexus IPN. No respondas a este correo.</p>
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
```

- [ ] **Step 4: Run the renderer tests and verify GREEN**

Run:

```bash
cd server
pnpm test -- --runInBand src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
```

Expected: all URL and renderer tests PASS.

- [ ] **Step 5: Run type checking**

Run:

```bash
cd server
pnpm typecheck
```

Expected: exit code 0.

- [ ] **Step 6: Commit the renderer**

```bash
git add server/src/emails/templates/institutionalEmailTemplate.ts \
  server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
git commit -m "feat: add institutional email renderer"
```

### Task 3: Confirmation and Password Reset Integration

**Files:**
- Modify: `server/src/emails/AuthEmail.ts`
- Modify: `server/src/__tests__/emails/AuthEmail.test.ts`

- [ ] **Step 1: Strengthen confirmation and reset tests**

In `server/src/__tests__/emails/AuthEmail.test.ts`, update the HTML-content
tests so they also require plain text and institutional presentation:

```ts
    it('debe incluir la plantilla institucional, el nombre y token', async () => {
      await AuthEmail.sendConfirmationEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      expect(callArgs.html).toContain('logo_nexusipn.png')
      expect(callArgs.html).toContain('#7c2855')
      expect(callArgs.html).toContain('Test User')
      expect(callArgs.html).toContain('123456')
      expect(callArgs.text).toContain('Test User')
      expect(callArgs.text).toContain('Código de confirmación: 123456')
    })

    it('debe incluir el enlace del frontend en HTML y texto', async () => {
      await AuthEmail.sendConfirmationEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      const expectedUrl =
        'http://localhost:5173/auth/confirm-account'
      expect(callArgs.html).toContain(expectedUrl)
      expect(callArgs.text).toContain(expectedUrl)
    })
```

Use the equivalent expectations for password reset:

```ts
    it('debe incluir la plantilla institucional, el nombre y token', async () => {
      await AuthEmail.sendResetPasswordEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      expect(callArgs.html).toContain('logo_nexusipn.png')
      expect(callArgs.html).toContain('#7c2855')
      expect(callArgs.html).toContain('Test User')
      expect(callArgs.html).toContain('123456')
      expect(callArgs.text).toContain('Test User')
      expect(callArgs.text).toContain(
        'Código de restablecimiento: 123456'
      )
    })

    it('debe incluir el enlace para restablecer en HTML y texto', async () => {
      await AuthEmail.sendResetPasswordEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      const expectedUrl =
        'http://localhost:5173/auth/reset-password'
      expect(callArgs.html).toContain(expectedUrl)
      expect(callArgs.text).toContain(expectedUrl)
    })
```

- [ ] **Step 2: Run `AuthEmail` tests and verify RED**

Run:

```bash
cd server
pnpm test -- --runInBand src/__tests__/emails/AuthEmail.test.ts
```

Expected: FAIL because existing payloads do not include `text`,
`logo_nexusipn.png`, or institutional colors.

- [ ] **Step 3: Integrate the shared renderer into confirmation and reset**

Add this import to `server/src/emails/AuthEmail.ts`:

```ts
import { renderInstitutionalEmail } from '@/emails/templates/institutionalEmailTemplate'
```

Replace `sendConfirmationEmail` with:

```ts
  static sendConfirmationEmail = async (user: EmailType) => {
    const content = renderInstitutionalEmail({
      frontendUrl: process.env.FRONTEND_URL,
      preheader: 'Confirma tu cuenta de Nexus IPN',
      title: 'Confirma tu cuenta',
      recipientName: user.name,
      paragraphs: [
        'Recibimos una solicitud para confirmar tu cuenta en Nexus IPN.',
        'Ingresa el siguiente código en la pantalla de confirmación para completar el proceso.',
      ],
      highlight: {
        label: 'Código de confirmación',
        value: user.token,
      },
      actionLabel: 'Confirmar cuenta',
      actionPath: '/auth/confirm-account',
      securityNotice:
        'Si no solicitaste esta acción, puedes ignorar este mensaje.',
    })

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Confirma tu cuenta',
      ...content,
    })
    console.log('Email enviado correctamente', email.messageId)
  }
```

Replace `sendResetPasswordEmail` with:

```ts
  static sendResetPasswordEmail = async (user: EmailType) => {
    const content = renderInstitutionalEmail({
      frontendUrl: process.env.FRONTEND_URL,
      preheader: 'Restablece tu contraseña de Nexus IPN',
      title: 'Restablece tu contraseña',
      recipientName: user.name,
      paragraphs: [
        'Recibimos una solicitud para restablecer la contraseña de tu cuenta.',
        'Ingresa el siguiente código en la pantalla de restablecimiento para continuar.',
      ],
      highlight: {
        label: 'Código de restablecimiento',
        value: user.token,
      },
      actionLabel: 'Restablecer contraseña',
      actionPath: '/auth/reset-password',
      securityNotice:
        'No compartas este código. Si no solicitaste el cambio, ignora este mensaje.',
    })

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Restablece tu contraseña',
      ...content,
    })
    console.log('Email enviado correctamente', email.messageId)
  }
```

Remove the two obsolete commented `confirmUrl` lines while editing these
methods.

- [ ] **Step 4: Run both email test suites and verify GREEN**

Run:

```bash
cd server
pnpm test -- --runInBand \
  src/__tests__/emails/templates/institutionalEmailTemplate.test.ts \
  src/__tests__/emails/AuthEmail.test.ts
```

Expected: all tests PASS.

- [ ] **Step 5: Commit confirmation and reset integration**

```bash
git add server/src/emails/AuthEmail.ts \
  server/src/__tests__/emails/AuthEmail.test.ts
git commit -m "feat: apply templates to auth emails"
```

### Task 4: Temporary Credentials Integration

**Files:**
- Modify: `server/src/emails/AuthEmail.ts`
- Modify: `server/src/__tests__/emails/AuthEmail.test.ts`

- [ ] **Step 1: Expand the temporary-credentials test**

Replace the existing temporary-credentials test with:

```ts
    it('debe enviar credenciales temporales en HTML y texto institucional', async () => {
      await AuthEmail.sendTemporaryCredentialsEmail({
        name: fakeUser.name,
        email: fakeUser.email,
        temporaryPassword: 'Temporal-2026!Ab',
        role: 'Docente',
      })

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'Nexus IPN <admin@nexusipn.com>',
          to: fakeUser.email,
          subject: 'Nexus IPN - Credenciales temporales',
        })
      )

      const callArgs = mockSendMail.mock.calls[0][0]
      const expectedUrl = 'http://localhost:5173/auth/login'
      expect(callArgs.html).toContain('logo_nexusipn.png')
      expect(callArgs.html).toContain('Temporal-2026!Ab')
      expect(callArgs.html).toContain('Docente')
      expect(callArgs.html).toContain(expectedUrl)
      expect(callArgs.text).toContain(
        'Contraseña temporal: Temporal-2026!Ab'
      )
      expect(callArgs.text).toContain('rol Docente')
      expect(callArgs.text).toContain(expectedUrl)
    })
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
cd server
pnpm test -- --runInBand src/__tests__/emails/AuthEmail.test.ts
```

Expected: the temporary-credentials test FAILS because its payload still lacks
institutional HTML and text.

- [ ] **Step 3: Integrate the renderer into temporary credentials**

Replace `sendTemporaryCredentialsEmail` with:

```ts
  static sendTemporaryCredentialsEmail = async (
    user: TemporaryCredentialsEmail
  ) => {
    const content = renderInstitutionalEmail({
      frontendUrl: process.env.FRONTEND_URL,
      preheader: 'Tu cuenta de Nexus IPN está lista',
      title: 'Bienvenido a Nexus IPN',
      recipientName: user.name,
      paragraphs: [
        `Se creó tu cuenta con el rol ${user.role}.`,
        'Usa la contraseña temporal para iniciar sesión. El sistema te pedirá establecer una contraseña nueva en tu primer acceso.',
      ],
      highlight: {
        label: 'Contraseña temporal',
        value: user.temporaryPassword,
      },
      actionLabel: 'Iniciar sesión',
      actionPath: '/auth/login',
      securityNotice:
        'No compartas esta contraseña. Si no esperabas esta cuenta, contacta al administrador.',
    })

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Credenciales temporales',
      ...content,
    })
    console.log('Email enviado correctamente', email.messageId)
  }
```

- [ ] **Step 4: Run the email tests and verify GREEN**

Run:

```bash
cd server
pnpm test -- --runInBand \
  src/__tests__/emails/templates/institutionalEmailTemplate.test.ts \
  src/__tests__/emails/AuthEmail.test.ts
```

Expected: all tests PASS.

- [ ] **Step 5: Commit temporary-credentials integration**

```bash
git add server/src/emails/AuthEmail.ts \
  server/src/__tests__/emails/AuthEmail.test.ts
git commit -m "feat: style temporary credentials email"
```

### Task 5: Regression and Build Verification

**Files:**
- Verify: `server/src/emails/templates/institutionalEmailTemplate.ts`
- Verify: `server/src/emails/AuthEmail.ts`
- Verify: `server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts`
- Verify: `server/src/__tests__/emails/AuthEmail.test.ts`

- [ ] **Step 1: Check formatting and accidental whitespace errors**

Run:

```bash
git diff --check
```

Expected: no output and exit code 0.

- [ ] **Step 2: Run the complete backend test suite**

Run:

```bash
cd server
pnpm test -- --runInBand
```

Expected: all backend suites PASS. If an unrelated pre-existing test fails,
record its exact suite and failure without modifying unrelated behavior.

- [ ] **Step 3: Run the production build**

Run:

```bash
cd server
pnpm build
```

Expected: TypeScript compilation and alias rewriting finish with exit code 0.
Do not add or commit generated files under `server/dist`.

- [ ] **Step 4: Review only the intended source changes**

Run:

```bash
git diff -- \
  server/src/emails/AuthEmail.ts \
  server/src/emails/templates/institutionalEmailTemplate.ts \
  server/src/__tests__/emails/AuthEmail.test.ts \
  server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
```

Expected: only the shared renderer, the three integrations, and their tests are
present. Confirm the temporary-credentials flow remains intact.

- [ ] **Step 5: Commit any final test-only corrections**

Only if verification required a correction:

```bash
git add server/src/emails/AuthEmail.ts \
  server/src/emails/templates/institutionalEmailTemplate.ts \
  server/src/__tests__/emails/AuthEmail.test.ts \
  server/src/__tests__/emails/templates/institutionalEmailTemplate.test.ts
git commit -m "test: verify institutional email templates"
```

If no correction was needed, do not create an empty commit.
