import type { DigitalResourceType } from '@/types'

export interface MaterialManual {
  title: string
  description: string
  url: string
}

export const planningManual: MaterialManual = {
  title: 'Instructivo de Planeación Didáctica',
  description: 'Formato institucional, criterios de llenado y organización didáctica.',
  url: 'https://www.ipn.mx/assets/files/des/docs/DOCENTES/instructivo-planeacion-did-ctica-des-23-07-2024-1.pdf',
}

export const digitalResourceManuals: Record<
  DigitalResourceType,
  MaterialManual
> = {
  'digital-book': {
    title: 'Criterios para Libro Digital',
    description: 'Criterios pedagógicos, gráficos, técnicos y editoriales del IPN.',
    url: 'https://www.ipn.mx/assets/files/dev/docs/criterios-libro-digital.pdf',
  },
  'interactive-digital-book': {
    title: 'Criterios para Libro Digital Interactivo',
    description: 'Lineamientos institucionales para contenidos y elementos interactivos.',
    url: 'https://www.ipn.mx/assets/files/dev/docs/criterios-libro-digital-interactivo.pdf',
  },
  'learning-object': {
    title: 'Criterios para Objeto de Aprendizaje',
    description: 'Criterios específicos para recursos reutilizables orientados al aprendizaje.',
    url: 'https://www.ipn.mx/assets/files/dev/docs/rdd/criterios-objeto-de-aprendizaje.pdf',
  },
}
