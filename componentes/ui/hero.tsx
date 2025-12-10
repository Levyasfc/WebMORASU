import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 text-center overflow-hidden">
      
      {/* Contenido de Texto con animación simple de entrada */}
      <div className="z-10 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-[1.1]">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href={ctaLink}
            className="rounded-full bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition-all text-lg"
          >
            {ctaText}
          </Link>
          <Link 
            href="/about" 
            className="text-blue-600 hover:underline font-medium text-lg flex items-center gap-1"
          >
            Más información <span className="text-sm">›</span>
          </Link>
        </div>
      </div>

      {/* Placeholder para la imagen (Fondo o Elemento visual) */}
      {/* En el futuro, aquí pondremos una etiqueta <Image /> o <video /> */}
      <div className="mt-16 w-full max-w-5xl h-64 md:h-96 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center relative -z-10">
        <span className="text-gray-300 font-medium">Espacio para Imagen Heroica (4K)</span>
      </div>
      
    </section>
  );
}