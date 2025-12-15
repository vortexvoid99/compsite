import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

/**
 * NotFound Page - 404 Error Page
 * Design: Modern Minimalist with clear messaging
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="container max-w-2xl text-center py-20">
        <div className="mb-8">
          <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <a className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-150">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Link>
          <Link href="/competitions">
            <a className="inline-block border border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-3 rounded-lg transition-colors duration-150">
              View Competitions
            </a>
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
            <span className="text-6xl">🔍</span>
          </div>
        </div>
      </div>
    </div>
  );
}
