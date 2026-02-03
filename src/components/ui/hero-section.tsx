import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Abstract Background Pattern (Subtle Zellige feel) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='%23059669' strokeWidth='1'/%3E%3Cpath d='M30 10L50 30L30 50L10 30L30 10z' fill='none' stroke='%23d97706' strokeWidth='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 items-center">

          {/* Content Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              <Heart className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-wide">Plateforme d'Entraide Citoyenne</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight text-balance">
              L'entraide de quartier, <br className="hidden lg:block" />
              <span className="text-emerald-700 italic">de Tanger à Lagouira</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl text-pretty leading-relaxed">
              Dir-Khir connecte les cœurs bienveillants pour coordonner la solidarité de proximité :
              nettoyage, aide scolaire, dons et soutien communautaire.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/proposer-un-besoin" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 px-8 h-12 text-base shadow-md bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                  Proposer un besoin
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#besoins" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 px-8 h-12 text-base border-emerald-200 bg-white/50 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 text-emerald-800">
                  <Users className="h-4 w-4" />
                  Voir les besoins
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-4 border-t border-border w-full max-w-md lg:max-w-none">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700">150+</div>
                <div className="text-xs sm:text-sm font-medium text-stone-500 mt-1">Besoins publiés</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700">500+</div>
                <div className="text-xs sm:text-sm font-medium text-stone-500 mt-1">Bénévoles actifs</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700">12</div>
                <div className="text-xs sm:text-sm font-medium text-stone-500 mt-1">Villes couvertes</div>
              </div>
            </div>
          </div>

         

        </div>
      </div>
    </section>
  );
}
