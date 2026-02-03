import { type Metadata } from "next";
import SignInForm from "./form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-100 via-amber-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur border border-amber-200 shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 pt-4">
          <Link href="/" aria-label="Retour">
            <ArrowLeft className="h-5 w-5 text-amber-700" />
          </Link>
          <span className="mx-auto text-sm font-medium text-amber-700">Connexion</span>
        </div>

        <div className="px-4 pt-4">
          <img
            src="/images/zalij.png"
            alt="Zellige marocain vert"
            className="h-40 w-full rounded-xl object-cover"
          />
        </div>

        <div className="px-6 pt-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-amber-800">Dir-Khir</h1>
          <p className="mt-1 text-sm text-amber-700/80">
            Entraide et solidarité locale au Maroc
          </p>
        </div>

        <div className="px-6">
          <SignInForm />
        </div>

        <div className="px-6 pb-6">
          <div className="mt-2 text-center text-xs text-muted-foreground">OU CONTINUER AVEC</div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Nouveau sur Dir‑Khir ?</span>
            <Link href={"/signup"} className="font-semibold text-emerald-700 hover:underline">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
