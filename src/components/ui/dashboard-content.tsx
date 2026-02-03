"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Users, Plus, MapPin, CheckCircle, MessageCircle, Flame } from "lucide-react";
import { markCompleteAction } from "@/lib/actions";
import type { Need, User as UserType } from "@/lib/types";

interface DashboardContentProps {
  user: UserType;
  userNeeds: Need[];
  engagedNeeds: Need[];
}

export function DashboardContent({ user, userNeeds, engagedNeeds }: DashboardContentProps) {
  const [needs, setNeeds] = useState(userNeeds);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleMarkComplete = async (needId: string) => {
    setError("");
    setSuccess("");
    const result = await markCompleteAction(needId);
    if (result.success) {
      setNeeds(prev =>
        prev.map(n => n.id === needId ? { ...n, status: 'complete' as const } : n)
      );
      setSuccess("Besoin marqué comme résolu avec succès !");
    } else {
      setError(result.error || "Une erreur est survenue lors de la mise à jour.");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Nettoyage': 'bg-emerald-100/50 text-emerald-800 border-emerald-200',
      'Aide scolaire': 'bg-blue-50 text-blue-700 border-blue-200',
      'Don urgent': 'bg-red-50 text-red-700 border-red-200',
      'Accompagnement': 'bg-amber-100/50 text-amber-800 border-amber-200',
      'Bricolage': 'bg-orange-50 text-orange-700 border-orange-200',
      'Transport': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Autre': 'bg-secondary/30 text-secondary-foreground border-secondary',
    };
    return colors[category] || 'bg-secondary/30 text-secondary-foreground border-secondary';
  };

  return (
    <div className="space-y-8">
      {/* Messages */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-lg bg-emerald-100/50 text-emerald-800 text-sm border border-emerald-200">
          {success}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Mon espace</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue, {user.name}
          </p>
        </div>
        <Link href="/proposer-un-besoin">
          <Button className="gap-2 shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="h-4 w-4" />
            Proposer un besoin
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{needs.length}</p>
                <p className="text-sm text-muted-foreground">Besoins publiés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{engagedNeeds.length}</p>
                <p className="text-sm text-muted-foreground">Participations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100/50">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {needs.filter(n => n.status === 'complete').length}
                </p>
                <p className="text-sm text-muted-foreground">Besoins résolus</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="mes-besoins" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md bg-secondary/50 p-1">
          <TabsTrigger value="mes-besoins" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <FileText className="h-4 w-4" />
            Mes demandes
          </TabsTrigger>
          <TabsTrigger value="mes-engagements" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Users className="h-4 w-4" />
            Mes engagements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mes-besoins" className="space-y-4">
          {needs.length === 0 ? (
            <Card className="border-border/50 bg-background/50 border-dashed">
              <CardContent className="py-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/30">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Aucun besoin publié</h3>
                <p className="text-muted-foreground mb-4">
                  Commencez par publier votre premier besoin pour trouver de l'aide.
                </p>
                <Link href="/proposer-un-besoin">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Proposer un besoin</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {needs.map(need => (
                <Card key={need.id} className="border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getCategoryColor(need.category)} border shadow-sm`} variant="secondary">
                            {need.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={need.status === 'open'
                              ? 'bg-primary/10 text-primary border-primary/20'
                              : 'bg-muted text-muted-foreground border-muted-foreground/20'}
                          >
                            {need.status === 'open' ? 'Ouvert' : 'Résolu'}
                          </Badge>
                        </div>
                        <CardTitle className="font-serif text-lg text-foreground">{need.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {need.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/80">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-secondary-foreground/70" />
                          {need.city}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="font-medium text-foreground">{need.volunteersCount}</span> volontaires
                        </span>
                      </div>
                      {need.status === 'open' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                          onClick={() => handleMarkComplete(need.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Marquer comme résolu
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mes-engagements" className="space-y-4">
          {engagedNeeds.length === 0 ? (
            <Card className="border-border/50 bg-background/50 border-dashed">
              <CardContent className="py-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/30">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Aucune participation</h3>
                <p className="text-muted-foreground mb-4">
                  Explorez les besoins et cliquez sur "Je participe" pour aider votre communauté.
                </p>
                <Link href="/#besoins">
                  <Button variant="outline">Voir les besoins</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {engagedNeeds.map(need => (
                <Card key={need.id} className="border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getCategoryColor(need.category)} border shadow-sm`} variant="secondary">
                            {need.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={need.status === 'open'
                              ? 'bg-primary/10 text-primary border-primary/20'
                              : 'bg-muted text-muted-foreground border-muted-foreground/20'}
                          >
                            {need.status === 'open' ? 'Ouvert' : 'Résolu'}
                          </Badge>
                        </div>
                        <CardTitle className="font-serif text-lg text-foreground">{need.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {need.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/80">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-secondary-foreground/70" />
                          {need.city}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-4 w-4 text-secondary-foreground/70" />
                          Par {need.userName}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 bg-emerald-50/50"
                        asChild
                      >
                        <a
                          href={`https://wa.me/${need.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`Bonjour, je participe à "${need.title}" sur Dir-Khir.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Contacter
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
