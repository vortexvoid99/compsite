import { AlertCircle } from "lucide-react";

/**
 * Entry Lists Page - User Entries Display
 * Design: Modern Minimalist with table/list layout
 */

export default function Entries() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="divider-line" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Entry <span className="text-secondary">Lists</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            View all entries for current competitions and track your participation.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Sign in to view your entries
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create an account or sign in to see your competition entries, track draws, and manage your participation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-block bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-150"
              >
                Sign In
              </a>
              <a
                href="#"
                className="inline-block border border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-3 rounded-lg transition-colors duration-150"
              >
                Create Account
              </a>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-bold text-foreground mb-2">Track Your Entries</h3>
              <p className="text-sm text-muted-foreground">
                See all your active and past competition entries in one place.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-bold text-foreground mb-2">Get Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive updates when draws happen and when you win prizes.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-bold text-foreground mb-2">Manage Account</h3>
              <p className="text-sm text-muted-foreground">
                Update your profile, payment methods, and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
