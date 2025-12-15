import CompetitionCard from "@/components/CompetitionCard";
import { Competition } from "../types/competition";
import { useEffect, useState } from "react";

/**
 * Competitions Page - Dynamic listing from API
 */

export default function Competitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await fetch("/api/competitions");
        if (!res.ok) throw new Error("Failed to fetch competitions");
        const data: Competition[] = await res.json();
        setCompetitions(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompetitions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading competitions…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (competitions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No active competitions yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Active <span className="text-secondary">Competitions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our active competitions and find your next win.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 flex-1">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {competitions.map((comp) => (
            <CompetitionCard
              key={comp.slug}
              title={comp.title}
              description={comp.description}
              imageSrc={comp.image_reference}
              slug={comp.slug}
              endTime={comp.end_at}
              ticketsRemaining={0}
              ticketsSold={0}
              totalTickets={0}
              prizeValue=""
            />
          ))}
        </div>
      </section>
    </div>
  );
}