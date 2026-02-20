import { Button } from '@/components/ui/button'
import { ArrowRight, Save } from 'lucide-react'

type Props = {
  currentSection: number
  onPrevious: () => void
  onNext: () => void
  onSave: () => void
}

export function PlanningNavigation({
  currentSection,
  onPrevious,
  onNext,
  onSave,
}: Props) {
  return (
    <div className="mx-auto mt-4 flex max-w-5xl items-center justify-between">
      {/* Previous Button */}
      <Button
        onClick={onPrevious}
        disabled={currentSection === 1}
        className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-6 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 disabled:opacity-50"
      >
        <ArrowRight className="h-6 w-6 rotate-180" />
        <div className="text-left">
          <div className="text-xs">Anterior</div>
          <div className="text-xs">Sección</div>
        </div>
      </Button>

      <div className="flex gap-4">
        {[1, 2, 3, 4, 5].map((section) => (
          <Button
            key={section}
            onClick={() => {}}
            className={`h-14 w-14 rounded-full text-xl font-bold transition-all duration-300 ${
              currentSection === section
                ? 'bg-white text-black shadow-xl'
                : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
            }`}
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Save Button */}
      <Button
        onClick={onSave}
        className="flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-6 font-bold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500"
      >
        <Save className="h-6 w-6" />
        <div className="text-left">
          <div className="text-xs">Guardar</div>
          <div className="text-xs">Avance</div>
        </div>
      </Button>

      {/* Next Button */}
      <Button
        onClick={onNext}
        disabled={currentSection === 5}
        className="flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-6 font-bold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-cyan-500 disabled:opacity-50"
      >
        <div className="text-left">
          <div className="text-xs">Siguiente</div>
          <div className="text-xs">Sección</div>
        </div>
        <ArrowRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
