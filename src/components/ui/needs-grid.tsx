"use client";

import { useState } from "react";
import { NeedCard } from "./need-card";
import { Filters } from "./filters";
import type { Need } from "@/lib/types";

interface NeedsGridProps {
  initialNeeds: Need[];
  isLoggedIn?: boolean;
}

export function NeedsGrid({ initialNeeds, isLoggedIn = false }: NeedsGridProps) {
  const [needs, setNeeds] = useState(initialNeeds);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredNeeds = needs.filter(need => {
    if (selectedCity !== "all" && need.city !== selectedCity) return false;
    if (selectedCategory !== "all" && need.category !== selectedCategory) return false;
    return true;
  });

  const handleVolunteer = (needId: string) => {
    setNeeds(prev => 
      prev.map(need => 
        need.id === needId 
          ? { ...need, volunteersCount: need.volunteersCount + 1 }
          : need
      )
    );
  };

  return (
    <section id="besoins" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Besoins en cours
          </h2>
          <p className="mt-2 text-muted-foreground">
            Decouvrez les demandes d'aide de votre communaute
          </p>
        </div>

        <div className="mb-8">
          <Filters 
            selectedCity={selectedCity}
            selectedCategory={selectedCategory}
            onCityChange={setSelectedCity}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredNeeds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun besoin trouve avec ces filtres.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNeeds.map(need => (
              <NeedCard 
                key={need.id} 
                need={need} 
                isLoggedIn={isLoggedIn}
                onVolunteer={handleVolunteer}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
