import type { MaterialManual } from '@/config/materialManuals'
import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

interface MaterialManualLinkProps {
  manual: MaterialManual
  compact?: boolean
  className?: string
}

export function MaterialManualLink({
  manual,
  compact = false,
  className = '',
}: MaterialManualLinkProps) {
  return (
    <a
      href={manual.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Abrir ${manual.title} en una pestaña nueva`}
      className={`group/manual relative flex overflow-hidden rounded-xl border border-[#D4AF37]/60 bg-[#fffdf7] text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C2855]/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C2855] ${
        compact ? 'items-center gap-3 px-3.5 py-3' : 'items-start gap-4 px-5 py-4'
      } ${className}`}
    >
      <span className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-[#7C2855] to-[#D4AF37]" />
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg bg-[#7C2855] text-white shadow-sm ${
          compact ? 'h-9 w-9' : 'h-11 w-11'
        }`}
      >
        <BookOpenIcon className={compact ? 'h-5 w-5' : 'h-6 w-6'} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#7C2855]">
          Documento oficial IPN
        </span>
        <span
          className={`mt-0.5 block font-bold leading-snug text-gray-900 transition-colors group-hover/manual:text-[#7C2855] ${
            compact ? 'text-sm' : 'text-base'
          }`}
        >
          {manual.title}
        </span>
        {!compact && (
          <span className="mt-1 block text-sm leading-relaxed text-gray-600">
            {manual.description}
          </span>
        )}
      </span>

      <ArrowTopRightOnSquareIcon
        className={`shrink-0 text-[#7C2855] transition-transform group-hover/manual:-translate-y-0.5 group-hover/manual:translate-x-0.5 ${
          compact ? 'h-4 w-4' : 'h-5 w-5'
        }`}
      />
    </a>
  )
}
