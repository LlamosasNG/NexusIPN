import type { DigitalBookResource } from '@/types'

export const getDigitalResourceTitle = (resource: DigitalBookResource) => {
  if (resource.resourceType === 'learning-object') {
    return (
      resource.learningObject?.precisionTema ||
      resource.identification?.title ||
      'Objeto de aprendizaje sin título'
    )
  }

  return (
    resource.identification?.title ||
    resource.learningObject?.precisionTema ||
    'Recurso didáctico digital sin título'
  )
}

export const getDigitalResourceTypeLabel = (
  resourceType: DigitalBookResource['resourceType']
) => {
  if (resourceType === 'digital-book') return 'Libro Digital'
  if (resourceType === 'interactive-digital-book') return 'Libro Digital Interactivo'
  if (resourceType === 'learning-object') return 'Objeto de Aprendizaje'
  return resourceType
}
