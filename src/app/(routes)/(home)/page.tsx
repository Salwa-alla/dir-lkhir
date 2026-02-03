import { getServerSession } from "@/lib/auth/get-session";
import { getNeeds } from "@/lib/actions";
import { HeroSection } from "@/components/ui/hero-section";
import { NeedsGrid } from "@/components/ui/needs-grid";

export default async function Home() {
  const [session, needs] = await Promise.all([
    getServerSession(),
    getNeeds(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <NeedsGrid
        initialNeeds={needs}
        isLoggedIn={!!session}
      />
    </div>
  );
}
