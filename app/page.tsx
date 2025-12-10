import PurplePlanetScene from "../componentes/ui/PurplePlanet"; 
import Navbar from "../componentes/layout/Navbar"; 

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white font-sans overflow-hidden pointer-events-none">
      
      <Navbar />

      {/* El Planeta */}
      <div className="pointer-events-auto">
         <PurplePlanetScene />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          MI PLANETA
        </h1>

        <div className="flex gap-4 pointer-events-auto">
          <button className="px-8 py-3 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition shadow-lg shadow-purple-500/30">
            EMPEZAR
          </button>
        </div>
      </div>
    </main>
  );
}