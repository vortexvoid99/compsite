import { Link } from "wouter";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Header Component - Modern Minimalist Navigation
 * Design: Clean, spacious layout with emerald green and coral orange accents
 * Features: Responsive mobile menu, cart and user account icons
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Competitions", href: "/competitions" },
    { label: "FAQs", href: "/faqs" },
    { label: "Winners List", href: "/winners" },
    { label: "Entry Lists", href: "/entries" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/images/barrow-logo.jpg" alt="Barrow Competitions" className="h-14 w-auto" />
              <span className="font-bold text-xl text-foreground hidden sm:inline">
                Barrow Competitions
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-foreground text-sm font-medium hover:text-primary transition-colors duration-150">
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-150">
              <ShoppingCart className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-150">
              <User className="w-5 h-5 text-foreground" />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-150"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border animate-fade-in-up">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block px-4 py-3 text-foreground hover:bg-muted transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
