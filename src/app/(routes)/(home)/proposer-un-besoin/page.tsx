import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/get-session";
import NeedForm from "@/components/ui/need-form";

export const metadata: Metadata = {
  title: "Proposer un besoin - Dir-Khir",
  description: "Publiez votre besoin d'aide sur Dir-Khir",
};

export default async function ProposerBesoinPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Proposer un besoin
            </h1>
            <p className="text-muted-foreground">
              Remplissez le formulaire ci-dessous pour publier votre demande d'aide
            </p>
          </div>
          <NeedForm />
        </div>
      </div>
    </div>
  );
}
