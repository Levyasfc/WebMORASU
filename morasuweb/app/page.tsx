import WireframeGlobe from "../componentes/ui/WireframeGlobe"; 
import { ArrowRight, Globe, Cpu } from "lucide-react"; 

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-hidden font-mono">
      
      {/* USAMOS EL PLANETA DE LÍNEAS */}
      <WireframeGlobe />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pointer-events-none">
        
        {/* Badge azul */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-cyan-500/50 rounded-full bg-black/80 text-cyan-400 text-sm animate-pulse pointer-events-auto backdrop-blur-sm">
          <Cpu size={14} />
          <span>GLOBAL NETWORK // ONLINE</span>
        </div>
        
        {/* Título con degradado azul/cyan */}
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-700 drop-shadow-[0_0_25px_rgba(0,200,255,0.3)]">
          NEXUS CORE
        </h1>

        <p className="text-lg md:text-xl text-cyan-400/70 max-w-xl mb-12 font-bold tracking-widest uppercase">
          Infraestructura Hiperconectada
        </p>

        <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
          <button className="group flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-bold text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,200,255,0.6)]">
            CONECTAR AHORA <ArrowRight size={20}/>
          </button>
          
          <button className="px-8 py-4 border border-cyan-500/50 text-cyan-400 font-bold hover:bg-cyan-900/20 hover:border-cyan-300 transition-all backdrop-blur-sm flex items-center gap-2">
            <Globe size={20} /> NOSOTROS
          </button>
        </div>

      </div>
    </main>
  );
}