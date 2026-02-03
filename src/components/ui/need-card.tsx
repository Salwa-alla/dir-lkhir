"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, MessageCircle, Flame } from "lucide-react";
import type { Need } from "@/lib/types";

interface NeedCardProps {
  need: Need;
  isLoggedIn?: boolean;
  onVolunteer?: (needId: string) => void;
}

export function NeedCard({ need, isLoggedIn = false, onVolunteer }: NeedCardProps) {
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

  const whatsappLink = `https://wa.me/${need.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par votre demande "${need.title}" sur Dir-Khir.`)}`;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-emerald-100 bg-white group hover:border-emerald-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge className={`${getCategoryColor(need.category)} hover:bg-opacity-80 transition-colors border shadow-sm`} variant="secondary">
            {need.category}
          </Badge>
          <Badge
            variant="outline"
            className={need.status === 'open'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-stone-100 text-stone-500 border-stone-200'}
          >
            {need.status === 'open' ? 'Ouvert' : 'Complet'}
          </Badge>
        </div>
        <h3 className="font-serif text-xl font-bold text-emerald-950 leading-tight mt-3 group-hover:text-emerald-700 transition-colors">
          {need.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-stone-600 line-clamp-3 mb-4 leading-relaxed">
          {need.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-stone-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-secondary-foreground/70" />
            <span className="font-medium">{need.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-bold text-emerald-900">{need.volunteersCount}</span>
            <span>citoyens</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border/50 flex flex-col gap-3">
        <div className="flex items-center justify-between w-full text-xs text-stone-400 font-medium">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-200"></span>
            <span>Par {need.userName}</span>
          </div>
          <span>{new Date(need.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
        </div>
        <div className="flex gap-3 w-full">
          {isLoggedIn && need.status === 'open' && (
            <Button
              size="sm"
              className="flex-1 gap-2 shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium border-0"
              onClick={() => onVolunteer?.(need.id)}
            >
              <Users className="h-4 w-4" />
              Je participe
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-2 border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 bg-emerald-50/50"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
