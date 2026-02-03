import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/get-session";
import { getUserNeeds, getEngagedNeeds } from "@/lib/actions";
import { DashboardContent } from "@/components/ui/dashboard-content";

export const metadata: Metadata = {
  title: "Mon espace - Dir-Khir",
  description: "Gérez vos besoins et participations sur Dir-Khir",
};

export default async function MonEspacePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  const [userNeeds, engagedNeeds] = await Promise.all([
    getUserNeeds(session.user.id),
    getEngagedNeeds(session.user.id),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardContent
          user={session.user}
          userNeeds={userNeeds}
          engagedNeeds={engagedNeeds}
        />
      </div>
    </div>
  );
}
