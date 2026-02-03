"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CITIES, CATEGORIES } from "@/lib/types";
import { MapPin, Tag } from "lucide-react";

interface FiltersProps {
  selectedCity: string;
  selectedCategory: string;
  onCityChange: (city: string) => void;
  onCategoryChange: (category: string) => void;
}

export function Filters({ selectedCity, selectedCategory, onCityChange, onCategoryChange }: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-emerald-100 shadow-sm">
      <div className="flex-1">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <MapPin className="h-4 w-4 text-emerald-600" />
          Ville
        </label>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Toutes les villes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {CITIES.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Tag className="h-4 w-4 text-emerald-600" />
          Categorie
        </label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Toutes les categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les categories</SelectItem>
            {CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
