# Diseño de plantillas institucionales de correo

## Objetivo

Reemplazar el HTML básico generado directamente en `AuthEmail` por plantillas
fijas y reutilizables que reflejen la identidad visual de Nexus IPN y que
ofrezcan una alternativa de texto plano.

## Alcance

El cambio cubre los tres correos existentes:

- Confirmación de cuenta.
- Restablecimiento de contraseña.
- Entrega de credenciales temporales.

No incluye un editor de plantillas, persistencia en base de datos, nuevos tipos
de notificación ni cambios en los flujos que disparan los correos.

## Arquitectura

Se añadirá un módulo de plantillas dentro de `server/src/emails/templates/`.
Este módulo expondrá un constructor compartido que reciba el contenido variable
de una notificación y devuelva dos representaciones:

```ts
type RenderedEmail = {
  html: string
  text: string
}
```

`AuthEmail` seguirá siendo responsable de seleccionar asunto, destinatario,
acción y contenido para cada tipo de correo, mientras que el constructor será
responsable únicamente de presentar ese contenido.

## Identidad visual

La plantilla HTML utilizará:

- Logotipo de Nexus IPN.
- Guinda institucional `#7c2855` como color principal.
- Guinda oscuro `#5a1d3f` para contraste.
- Dorado `#d4af37` como acento.
- Fondo exterior claro y tarjeta blanca centrada.
- Ancho máximo aproximado de 600 px.

El encabezado mostrará exclusivamente el logotipo de Nexus IPN. No mostrará los
logotipos independientes del IPN ni de la Escuela Nacional de Medicina y
Homeopatía.

Los estilos serán inline y la estructura se basará en tablas simples para
mejorar la compatibilidad con clientes de correo. No se utilizarán scripts,
hojas de estilo externas, fuentes remotas ni una dependencia adicional.

## Contenido reutilizable

El constructor aceptará contenido suficiente para presentar:

- Texto de preencabezado.
- Título.
- Saludo con el nombre del usuario.
- Uno o más párrafos explicativos.
- Un dato destacado opcional, como token o contraseña temporal.
- Texto y URL del botón principal.
- Enlace alternativo visible para clientes donde el botón no funcione.
- Aviso de seguridad o vigencia.

Todos los valores variables insertados en HTML se escaparán para evitar que un
nombre, rol, token o contraseña pueda alterar el marcado.

## Variantes

### Confirmación de cuenta

Mostrará el token en un bloque destacado, un botón para abrir la pantalla de
confirmación y una indicación de ignorar el mensaje si el usuario no solicitó
la acción.

### Restablecimiento de contraseña

Mostrará el token en un bloque destacado, un botón para abrir la pantalla de
restablecimiento y una advertencia de no compartir el código.

### Credenciales temporales

Indicará el rol asignado, mostrará la contraseña temporal en un bloque
destacado y enlazará al inicio de sesión. También informará que se solicitará
una contraseña nueva al primer acceso.

## Texto plano

Cada variante generará una versión `text` con la misma información esencial:
saludo, explicación, dato destacado, URL completa y aviso de seguridad. Tanto
`html` como `text` se enviarán mediante Nodemailer.

## Configuración del logotipo

La URL del logotipo se derivará de `FRONTEND_URL` y apuntará al recurso público
existente `/logo_nexusipn.png`. La URL base se normalizará para evitar una doble
diagonal cuando la variable termine en `/`.

El correo seguirá siendo comprensible cuando el cliente bloquee imágenes:
la imagen tendrá texto alternativo y el encabezado incluirá el nombre
`Nexus IPN` como texto.

## Compatibilidad

Se conservarán:

- El remitente `Nexus IPN <admin@nexusipn.com>`.
- Los asuntos actuales.
- Las rutas actuales del frontend.
- Las firmas públicas de los métodos de `AuthEmail`.
- El comportamiento de los controladores y servicios consumidores.

## Manejo de datos y errores

La construcción de una plantilla será síncrona y no introducirá nuevas fuentes
de error de red. Los errores de Nodemailer seguirán propagándose como ahora.

`FRONTEND_URL` debe estar configurada, como ya requieren los enlaces actuales.
El constructor no ocultará una configuración faltante con una URL inventada.

## Pruebas

Se crearán pruebas unitarias para verificar que el constructor:

- Produce HTML y texto plano.
- Incluye identidad visual, logotipo, botón y enlace alternativo.
- Escapa caracteres especiales en valores variables.
- Normaliza la URL base.
- Omite correctamente el bloque destacado cuando no se proporciona.

Las pruebas de `AuthEmail` verificarán para cada variante:

- Remitente, destinatario y asunto.
- Inclusión de `html` y `text`.
- Contenido específico del correo.
- Ruta correcta del frontend.

La verificación final ejecutará las pruebas de correo y el build completo del
servidor.
