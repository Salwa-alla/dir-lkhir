import Link from "next/link";
import { HeartHandshake, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                <HeartHandshake className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold">Dir-Khir</span>
            </Link>
            <p className="text-white/90 max-w-md">
              Plateforme d'entraide citoyenne pour coordonner la solidarite de proximite
              dans les quartiers du Maroc.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/proposer-un-besoin" className="hover:text-emerald-400 transition-colors">
                  Proposer un besoin
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-emerald-400 transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Engagement Types */}
          <div>
            <h3 className="font-semibold mb-4">Types d'engagement</h3>
            <ul className="space-y-2 text-white/80">
              <li>Nettoyage</li>
              <li>Aide scolaire</li>
              <li>Don urgent</li>
              <li>Accompagnement</li>
              <li>Bricolage</li>
              <li>Transport</li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-emerald-800/60">
          <div className="grid gap-4 md:grid-cols-3 text-center">
            <div className="flex items-center justify-center gap-2 text-white/80">
              <MapPin className="h-4 w-4" />
              <span>Agadir, Maroc</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Mail className="h-4 w-4" />
              <span>contact@dir-khir.ma</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Phone className="h-4 w-4" />
              <span>+212 5XX XXX XXX</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-emerald-800/60 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Dir-Khir. Tous droits reserves. Fait avec amour au Maroc.</p>
        </div>
      </div>
    </footer>
  );
}
