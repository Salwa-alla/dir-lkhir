import { type Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./form";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Inscription",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-100 via-amber-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur border border-amber-200 shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 pt-4">
          <Link href="/signin" aria-label="Retour">
            <ArrowLeft className="h-5 w-5 text-amber-700" />
          </Link>
          <span className="mx-auto text-sm font-medium text-amber-700">Inscription</span>
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
          <SignUpForm />
        </div>

        <div className="px-6 pb-6">
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Déjà inscrit ?</span>
            <Link href={"/signin"} className="font-semibold text-emerald-700 hover:underline">
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
