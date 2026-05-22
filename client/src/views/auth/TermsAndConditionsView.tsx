import { LogoHomeopatia } from '@/components/LogoHomeopatia'
import { LogoIPN } from '@/components/LogoIPN'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

type TermsSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  items?: {
    title: string
    body: string
  }[]
}

const introduction = [
  'Los Términos y Condiciones de Uso constituyen un contrato de adhesión entre la institución que opera el sistema y cada uno de sus usuarios, que regula de forma transparente y equitativa la relación entre ambas partes desde el primer momento de acceso a la plataforma.',
  'En el caso del prototipo de sistema web para la planificación digital y la creación de recursos didácticos digitales de la ENMyH del IPN, este documento resulta especialmente relevante por la diversidad de roles que coexisten en el sistema, la naturaleza académica del contenido que se gestiona y la seguridad e integridad de la plataforma.',
  'Las planeaciones y los recursos didácticos digitales son producciones académicas que reflejan el trabajo docente y tienen implicaciones directas en el proceso de enseñanza-aprendizaje de los estudiantes del primer año de la carrera de Médico Cirujano y Homeopatía.',
  'Al tratarse de una plataforma que almacena información académica y datos personales de los usuarios, es indispensable establecer de forma explícita las conductas prohibidas y las consecuencias de incurrir en ellas.',
]

const legalFramework = [
  'El Código Civil Federal reconoce la validez de los contratos celebrados por medios electrónicos cuando existe manifestación de voluntad libre e informada.',
  'La Ley Federal de Protección de Datos Personales en Posesión de los Particulares y la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados establecen obligaciones respecto al tratamiento de datos personales.',
  'La Ley Orgánica del Instituto Politécnico Nacional y la normativa interna institucional enmarcan los derechos y obligaciones del personal académico en el uso de sistemas de información institucionales.',
]

const termsSections: TermsSection[] = [
  {
    id: 'objeto',
    title: 'I. Objeto y ámbito de aplicación',
    paragraphs: [
      'Los presentes Términos y Condiciones de Uso regulan el acceso, registro, navegación y uso del sistema web denominado Prototipo de sistema web para la planificación digital y la creación por clasificación de plantillas para recursos didácticos digitales académicas, desarrollado en el marco del Trabajo Terminal A191 de la Escuela Superior de Cómputo del Instituto Politécnico Nacional, para uso exclusivo de la Escuela Nacional de Medicina y Homeopatía.',
      'El sistema tiene como propósito centralizar y digitalizar la captura y gestión de planeaciones didácticas por periodo escolar, así como la creación, clasificación y publicación de recursos didácticos digitales en tres tipologías: libros digitales, objetos de aprendizaje y libros interactivos.',
      'El presente documento aplica a todos los usuarios que accedan al sistema bajo cualquiera de los roles habilitados: docente, personal de academia, jefe de departamento, administrador y estudiante. La aceptación de estos términos es condición indispensable para el uso del sistema.',
    ],
  },
  {
    id: 'definiciones',
    title: 'II. Definiciones',
    items: [
      {
        title: 'Sistema',
        body: 'Plataforma web objeto de los presentes términos, accesible mediante navegador web en el entorno institucional de la ENMyH.',
      },
      {
        title: 'Usuario',
        body: 'Persona física que accede al sistema bajo alguno de los roles habilitados: docente, academia, jefe de departamento, administrador o estudiante.',
      },
      {
        title: 'Cuenta de usuario',
        body: 'Credenciales de acceso que identifican de forma única a cada usuario dentro del sistema.',
      },
      {
        title: 'Planeación didáctica',
        body: 'Documento académico estructurado que el docente elabora y registra en el sistema, especificando objetivos, actividades, recursos y criterios de evaluación.',
      },
      {
        title: 'Recurso Didáctico Digital (RDD)',
        body: 'Material educativo digital creado mediante las plantillas del sistema: libro digital, objeto de aprendizaje o libro interactivo.',
      },
      {
        title: 'Contenido del usuario',
        body: 'Toda información, texto, archivo o material que el usuario cargue, registre o publique en el sistema.',
      },
      {
        title: 'Periodo escolar',
        body: 'Ciclo académico semestral establecido por la ENMyH para gestionar planeaciones y recursos.',
      },
    ],
  },
  {
    id: 'acceso',
    title: 'III. Condiciones de acceso y registro',
    paragraphs: [
      'El acceso al sistema requiere que el usuario cuente con una cuenta activa registrada en la plataforma.',
      'Las cuentas de docentes podrán ser creadas directamente por el usuario mediante el formulario de registro público, sujeto a validación posterior por el administrador del sistema, o bien creadas directamente por el administrador.',
      'El administrador del sistema es el único usuario con facultades para crear, editar, activar o desactivar cuentas de otros usuarios.',
      'El usuario es el único responsable de la confidencialidad y uso de sus credenciales de acceso. Queda estrictamente prohibido compartir, ceder o transferir credenciales a terceros.',
    ],
    bullets: [
      'Ser miembro activo de la comunidad de la ENMyH del IPN en alguna categoría habilitada.',
      'Contar con correo electrónico institucional válido del IPN.',
      'Proporcionar información veraz, completa y actualizada.',
      'Establecer una contraseña conforme a los criterios mínimos de seguridad.',
      'Aceptar expresamente los presentes Términos y Condiciones.',
    ],
  },
  {
    id: 'roles',
    title: 'IV. Roles de usuario y permisos',
    items: [
      {
        title: 'Docente',
        body: 'Puede crear, editar, guardar y enviar planeaciones didácticas, crear RDD y previsualizar sus propios materiales. No puede acceder a contenidos de otros docentes ni modificar materiales enviados a validación.',
      },
      {
        title: 'Academia',
        body: 'Puede consultar materiales enviados, emitir dictámenes y notificar observaciones. No puede crear ni editar contenidos académicos.',
      },
      {
        title: 'Jefe de Departamento',
        body: 'Puede supervisar cumplimiento docente, consultar materiales validados y aplicar filtros de seguimiento. No puede crear ni editar contenido académico.',
      },
      {
        title: 'Administrador',
        body: 'Puede gestionar cuentas, establecer fechas límite y consultar materiales institucionales. No puede modificar contenido académico.',
      },
      {
        title: 'Estudiante',
        body: 'Puede consultar RDD aprobados y publicados. No requiere registro ni autenticación para acceder a recursos públicos.',
      },
    ],
    paragraphs: [
      'Cualquier intento de acceder a funcionalidades o información fuera del rol asignado será bloqueado automáticamente por el sistema y podrá ser causa de suspensión de la cuenta.',
    ],
  },
  {
    id: 'uso',
    title: 'V. Uso aceptable del sistema',
    paragraphs: [
      'El sistema podrá ser utilizado exclusivamente para fines académicos e institucionales: captura de planeaciones didácticas, creación de recursos didácticos digitales, revisión, validación, supervisión académica y gestión administrativa de cuentas.',
    ],
    bullets: [
      'Queda prohibido registrar contenido falso, plagiado, discriminatorio, difamatorio, obsceno, violento o que vulnere derechos de terceros.',
      'Queda prohibido utilizar el sistema con fines comerciales, publicitarios o de lucro personal.',
      'Queda prohibido intentar acceder, visualizar o modificar información sin autorización.',
      'Queda prohibido vulnerar la seguridad mediante inyección SQL, XSS, fuerza bruta, ingeniería social u otros ataques.',
      'Queda prohibido compartir credenciales o permitir el uso de la cuenta por otra persona.',
      'Queda prohibido utilizar herramientas automatizadas, bots, scrapers o mecanismos no autorizados.',
      'Queda prohibido descompilar, modificar o distribuir componentes del sistema sin autorización.',
      'Queda prohibido suplantar la identidad de otro usuario o autoridad académica.',
      'Queda prohibido registrar como propios materiales elaborados por terceros sin crédito o autorización.',
    ],
  },
  {
    id: 'contenido',
    title: 'VI. Contenido generado por el usuario',
    paragraphs: [
      'El usuario es responsable del contenido que registra, carga o publica en el sistema, incluyendo planeaciones, textos, imágenes, preguntas y cualquier material que conforme recursos didácticos digitales.',
      'El docente declara que el material registrado es de su autoría o cuenta con los permisos necesarios para su uso educativo institucional.',
      'Los derechos patrimoniales sobre planeaciones y recursos didácticos digitales elaborados dentro del sistema corresponden al Instituto Politécnico Nacional, conforme a la legislación aplicable y políticas institucionales.',
      'Todo recurso didáctico digital enviado deberá pasar por el proceso de validación académica antes de ser publicado y visible para estudiantes.',
      'Las planeaciones didácticas finalizadas y enviadas no podrán ser modificadas por el docente. Sólo el administrador podrá habilitar edición en casos excepcionales y justificados.',
    ],
  },
  {
    id: 'fechas',
    title: 'VII. Fechas límite y estado de cumplimiento',
    paragraphs: [
      'El administrador tiene la facultad de establecer y modificar fechas límite de entrega de planeaciones didácticas para cada periodo escolar.',
      'El sistema verificará automáticamente la fecha de envío contra la fecha límite establecida. Si el envío se realiza después de la fecha límite, se asignará el estado Desfasado.',
      'El estado Desfasado no impide la entrega ni su posterior validación académica, pero queda registrado para seguimiento institucional.',
    ],
  },
  {
    id: 'disponibilidad',
    title: 'VIII. Disponibilidad y mantenimiento del sistema',
    paragraphs: [
      'El sistema estará disponible durante los periodos escolares activos en el entorno tecnológico provisto por la infraestructura del IPN.',
      'La ENMyH y el equipo desarrollador realizarán esfuerzos razonables para mantener la disponibilidad del servicio, sin garantizar funcionamiento ininterrumpido o libre de errores.',
      'El sistema podrá someterse a mantenimiento programado, actualizaciones o intervenciones técnicas con interrupciones temporales.',
      'Se recomienda al usuario mantener copias de seguridad propias de sus planeaciones y materiales.',
    ],
  },
  {
    id: 'suspension',
    title: 'IX. Suspensión y cancelación de cuentas',
    bullets: [
      'Baja del personal docente o administrativo.',
      'Incumplimiento de los presentes Términos y Condiciones.',
      'Carga de contenido falso, plagiado, inapropiado o que vulnere derechos de terceros.',
      'Compromiso de la seguridad del sistema o compartición de credenciales.',
      'Solicitud expresa del usuario o de autoridad académica competente.',
      'Inactividad prolongada por más de dos ciclos escolares consecutivos.',
    ],
    paragraphs: [
      'La suspensión implica la inhabilitación inmediata del acceso al sistema. Los contenidos generados permanecerán en la base de datos para consulta institucional, salvo determinación expresa de autoridad competente.',
    ],
  },
  {
    id: 'responsabilidad',
    title: 'X. Limitación de responsabilidad',
    bullets: [
      'La ENMyH y el IPN no serán responsables por el contenido, exactitud o calidad de los materiales generados por los usuarios.',
      'No garantizan que el sistema esté libre de errores, interrupciones o vulnerabilidades de seguridad.',
      'No serán responsables por daños derivados del uso o imposibilidad de uso del sistema, salvo dolo o negligencia grave.',
      'No serán responsables por el uso de credenciales por terceros cuando el usuario las haya compartido o no protegido adecuadamente.',
      'No garantizan compatibilidad con todos los navegadores, dispositivos o sistemas operativos.',
    ],
  },
  {
    id: 'modificaciones',
    title: 'XI. Modificaciones a los términos y condiciones',
    paragraphs: [
      'La ENMyH y el IPN se reservan el derecho de modificar los presentes Términos y Condiciones en cualquier momento para adecuarlos a cambios normativos, tecnológicos u organizacionales.',
      'Las modificaciones podrán notificarse mediante portal institucional, correo electrónico institucional o aviso emergente al iniciar sesión.',
      'El uso continuado del sistema posterior a la entrada en vigor de las modificaciones implicará la aceptación tácita de las mismas.',
    ],
  },
  {
    id: 'jurisdiccion',
    title: 'XII. Legislación aplicable y jurisdicción',
    bullets: [
      'Ley Federal de Educación y Ley Orgánica del Instituto Politécnico Nacional.',
      'Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
      'Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.',
      'Ley Federal del Derecho de Autor.',
      'Código Civil Federal y demás disposiciones aplicables.',
    ],
    paragraphs: [
      'Para controversias derivadas de la interpretación o aplicación de estos términos, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México.',
    ],
  },
]

const references = [
  'Código Civil Federal, arts. 1803 y 1811.',
  'Ley Federal del Derecho de Autor.',
  'Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  'Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.',
  'Ley Orgánica del Instituto Politécnico Nacional.',
  'NIST Special Publication 800-12 Rev. 1, An Introduction to Information Security.',
  'Privacy by Design: The 7 Foundational Principles.',
]

function TextBlock({ children }: { children: string }) {
  return <p className="text-sm leading-7 text-gray-700">{children}</p>
}

export default function TermsAndConditionsView() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-gray-900">
      <header className="relative overflow-hidden bg-linear-to-br from-[#7C2855] via-[#672247] to-[#3f1029] text-white">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <LogoIPN className="h-20 w-20 rounded-full bg-white p-2 shadow-xl ring-4 ring-white/15" />
              <LogoHomeopatia className="h-20 w-20 rounded-full bg-white p-2 shadow-xl ring-4 ring-white/15" />
            </div>

            <Button asChild variant="secondary" className="w-fit bg-white text-[#7C2855] hover:bg-[#f5e9ef]">
              <Link to="/auth/login">Volver al Login</Link>
            </Button>
          </div>

          <div className="mt-12 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f2d985]">
              Nexus IPN · Escuela Nacional de Medicina y Homeopatía
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Términos y Condiciones de Uso
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/85">
              Prototipo de sistema web para la planificación digital y la
              creación por clasificación de plantillas para recursos didácticos
              digitales. Consulta este documento antes de aceptar el acceso a la
              plataforma.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[280px_1fr] lg:px-10">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-3xl border border-[#7C2855]/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7C2855]">
              Navegación
            </p>
            <div className="mt-4 max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {termsSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#7C2855]/5 hover:text-[#7C2855]"
                >
                  {section.title}
                </a>
              ))}
              <a
                href="#contacto"
                className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#7C2855]/5 hover:text-[#7C2855]"
              >
                XIII. Contacto y soporte
              </a>
              <a
                href="#aceptacion"
                className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#7C2855]/5 hover:text-[#7C2855]"
              >
                Declaración de aceptación
              </a>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
        <section className="grid gap-4 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-5 md:grid-cols-[220px_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7C2855]">
              Declaración inicial
            </p>
            <h2 className="mt-2 text-xl font-bold text-gray-900">
              Uso institucional y aceptación
            </h2>
          </div>
          <div className="space-y-3">
            {introduction.map((paragraph) => (
              <TextBlock key={paragraph}>{paragraph}</TextBlock>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <h2 className="text-lg font-bold text-gray-900">
            Marco legal que sustenta este documento
          </h2>
          <div className="mt-4 space-y-3">
            {legalFramework.map((paragraph) => (
              <TextBlock key={paragraph}>{paragraph}</TextBlock>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          {termsSections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className="scroll-mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#7C2855]">
                {section.title}
              </h2>

              {section.paragraphs && (
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <TextBlock key={paragraph}>{paragraph}</TextBlock>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-gray-700">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.items && (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {section.items.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {item.body}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <section
          id="contacto"
          className="scroll-mt-6 rounded-2xl border border-[#7C2855]/15 bg-linear-to-br from-[#7C2855]/5 to-white p-5"
        >
          <h2 className="text-xl font-bold text-[#7C2855]">
            XIII. Contacto y soporte
          </h2>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="font-semibold text-gray-900">Unidad responsable</dt>
              <dd className="mt-1 text-gray-600">ENMyH del Instituto Politécnico Nacional</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Correo electrónico</dt>
              <dd className="mt-1 text-gray-600">Contacto@enmyh.ipn.mx</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Domicilio</dt>
              <dd className="mt-1 text-gray-600">
                Guillermo Massieu Helguera No. 239, La Escalera, Ticomán,
                Gustavo A. Madero, Ciudad de México, C.P. 07320.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Horario de atención</dt>
              <dd className="mt-1 text-gray-600">Lunes a viernes de 7:00 a 18:00 horas</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Sitio web institucional</dt>
              <dd className="mt-1 text-gray-600">www.enmyh.ipn.mx</dd>
            </div>
          </dl>
        </section>

        <section
          id="aceptacion"
          className="scroll-mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5"
        >
          <h2 className="text-xl font-bold text-gray-900">
            Declaración de aceptación
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            Al acceder, registrarse o utilizar el sistema, el usuario declara
            expresamente que ha leído y comprendido en su totalidad los presentes
            Términos y Condiciones de Uso; acepta quedar vinculado por todas sus
            disposiciones; cuenta con capacidad legal para aceptar estos términos
            en representación propia; y que la información proporcionada durante
            el registro es veraz, completa y actualizada. Esta aceptación tiene
            el mismo valor jurídico que una firma autógrafa en los términos de la
            legislación mexicana aplicable al uso de medios electrónicos.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-100 p-5">
          <h2 className="text-xl font-bold text-gray-900">Referencias</h2>
          <ol className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
            {references.map((reference, index) => (
              <li key={reference}>
                [{index + 1}] {reference}
              </li>
            ))}
          </ol>
        </section>
        <div className="flex justify-end border-t border-gray-200 pt-2">
          <Button asChild className="bg-[#7C2855] hover:bg-[#5a1d3f]">
            <Link to="/auth/login">Entendido, volver al Login</Link>
          </Button>
        </div>
        </div>
      </main>
    </div>
  )
}
