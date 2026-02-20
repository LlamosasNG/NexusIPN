import { Link } from 'react-router'

export function InstitutionalFooter() {
  return (
    <footer className="bg-gray-700 text-white mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Logo IPN */}
          <div className="flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Hq1PrurfeSvBp2dvUspELVWSTYjfDN.png"
              alt="Logo IPN"
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Información institucional */}
          <div className="flex-1 text-xs leading-snug">
            <h3 className="font-bold text-sm mb-1">
              INSTITUTO POLITÉCNICO NACIONAL
            </h3>
            <p className="text-gray-300">
              D.R. Instituto Politécnico Nacional (IPN). Av. Luis Enrique Erro
              S/N, Unidad Profesional Adolfo López Mateos, Zacatenco, Alcaldía
              Gustavo A. Madero, C.P. 07738, Ciudad de México. Conmutador: 55 57
              29 60 00 / 55 57 29 63 00.
            </p>
            <p className="text-gray-300 mt-1">
              Esta página es una obra intelectual protegida por la Ley Federal
              del Derecho de Autor, puede ser reproducida con fines no
              lucrativos, siempre y cuando no se mutile, se cite la fuente
              completa y su dirección electrónica; su uso para otros fines,
              requiere autorización previa y por escrito de la Dirección General
              del Instituto.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="border-t border-gray-600 mt-4 pt-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <Link
              to="/terminos"
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
            >
              Términos y Condiciones
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              to="/ayuda"
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
            >
              Ayuda
            </Link>
          </div>
        </div>
      </div>

      {/* Barra de redes sociales */}
      <div className="bg-gray-800 py-3">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center gap-3">
            {/* Facebook */}
            <Link
              to="https://www.facebook.com/IPN.MX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform duration-200"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>

            {/* X (Twitter) */}
            <Link
              to="https://twitter.com/IPN_MX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform duration-200"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>

            {/* Instagram */}
            <Link
              to="https://www.instagram.com/ipn_mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform duration-200"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>

            {/* YouTube */}
            <Link
              to="https://www.youtube.com/user/IPNTV"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform duration-200"
              aria-label="YouTube"
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default InstitutionalFooter
