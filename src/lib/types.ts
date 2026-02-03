import { MOROCCAN_CITIES, NEED_CATEGORIES } from "./data";

export const CITIES = MOROCCAN_CITIES;
export const CATEGORIES = NEED_CATEGORIES;

export type Need = {
  id: string;
  title: string;
  description: string;
  city: string;
  category: string;
  whatsapp: string;
  userId: string;
  status: "open" | "complete";
  volunteersCount: number;
  createdAt: Date;
  updatedAt: Date;
  userName?: string; // For display in dashboard
};

export type User = {
  id: string;
  name: string;
  email: string;
  username?: string;
  role?: string;
  gender?: boolean;
};
