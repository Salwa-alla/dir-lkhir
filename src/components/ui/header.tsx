"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

export function Header({ isLoggedIn = false, userName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-900 to-emerald-950 backdrop-blur border-b border-emerald-800/60 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-emerald-50">
              Dir-Khir
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-emerald-100/90 hover:text-white transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/proposer-un-besoin"
              className="text-sm font-medium text-emerald-100/90 hover:text-white transition-colors"
            >
              Proposer un besoin
            </Link>
            {isLoggedIn && (
              <Link
                href="/mon-espace"
                className="text-sm font-medium text-emerald-100/90 hover:text-white transition-colors"
              >
                Mon espace
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/mon-espace">
                  <Button variant="ghost" size="sm" className="gap-2 text-emerald-100/90 hover:text-white hover:bg-emerald-700">
                    <User className="h-4 w-4" />
                    {userName}
                  </Button>
                </Link>
                <Link href="/api/logout">
                  <Button variant="outline" size="sm" className="border-emerald-800 text-emerald-100 hover:bg-emerald-700 hover:text-white hover:border-emerald-700">
                    Deconnexion
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" size="sm" className="text-emerald-100/90 hover:text-white hover:bg-emerald-700">
                    Connexion
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-md">Inscription</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-emerald-100 hover:bg-emerald-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-800/60">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-emerald-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/proposer-un-besoin"
                className="text-sm font-medium text-emerald-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Proposer un besoin
              </Link>
              {isLoggedIn && (
                <Link
                  href="/mon-espace"
                  className="text-sm font-medium text-emerald-100 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mon espace
                </Link>
              )}
              <div className="flex flex-col gap-2 pt-4 border-t border-emerald-800/60">
                {isLoggedIn ? (
                  <>
                    <span className="text-sm text-emerald-200/70">
                      Connecte en tant que {userName}
                    </span>
                    <Link href="/api/logout">
                      <Button variant="outline" size="sm" className="w-full bg-transparent border-emerald-800 text-emerald-100 hover:bg-emerald-700 hover:text-white">
                        Deconnexion
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/signin">
                      <Button variant="outline" size="sm" className="w-full bg-transparent border-emerald-800 text-emerald-100 hover:bg-emerald-700 hover:text-white">
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                        Inscription
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
