import { Button } from "@/components/ui/button";
import CompetitionCard from "@/components/CompetitionCard";
import { Competition } from '../types/competition';
import { useEffect, useState } from 'react';
import { ArrowRight } from "lucide-react";

/**
 * Competitions Page - All Competitions Listing
 * Design: Modern Minimalist with grid layout
 */

// Remove the hardcoded data
const allCompetitions = [
  {
    id: "1",
    slug: "autodraw-anker-power-bank",
    title: "Autodraw – Anker Power Bank",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 499,
    ticketsSold: 1,
    totalTickets: 500,
    prizeValue: "$49.99",
  },
  {
    id: "2",
    slug: "premium-gaming-headset",
    title: "Premium Gaming Headset",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 450,
    ticketsSold: 50,
    totalTickets: 500,
    prizeValue: "$199.99",
  },
  {
    id: "3",
    slug: "shark-cryoglow-mask",
    title: "Shark CryoGlow Anti-Ageing Mask",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 974,
    ticketsSold: 26,
    totalTickets: 1000,
    prizeValue: "$199.99",
  },
  {
    id: "4",
    slug: "instant-win-site-credit",
    title: "Instant Win Site Credit",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 2974,
    ticketsSold: 26,
    totalTickets: 3000,
    prizeValue: "$100",
  },
  {
    id: "5",
    slug: "4k-smart-tv",
    title: "4K Smart TV",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 380,
    ticketsSold: 120,
    totalTickets: 500,
    prizeValue: "$799.99",
  },
  {
    id: "6",
    slug: "apple-watch-series-9",
    title: "Apple Watch Series 9",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 200,
    ticketsSold: 300,
    totalTickets: 500,
    prizeValue: "$399.99",
  },
  {
    id: "7",
    slug: "5000-cash-prize",
    title: "$5000 Cash Prize",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 4900,
    ticketsSold: 100,
    totalTickets: 5000,
    prizeValue: "$5,000",
  },
  {
    id: "8",
    slug: "luxury-spa-weekend",
    title: "Luxury Spa Weekend",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 280,
    ticketsSold: 20,
    totalTickets: 300,
    prizeValue: "$1,500",
  },
];

export default function Competitions() {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                // Fetch from the public API endpoint
                const response = await fetch('/api/competitions');
                if (!response.ok) {
                    throw new Error('Failed to fetch competitions');
                }
                const data: Competition[] = await response.json();
                setCompetitions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCompetitions();
    }, []);

    // Filter out competitions that have not started yet (client-side check for safety)
    const activeCompetitions = competitions.filter(comp => new Date(comp.start_at) <= new Date());

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Loading <span className="text-secondary">Competitions</span>
                        </h1>
                    </div>
                </section>
                <section className="py-16 md:py-24 flex-1">
                    <div className="container text-center">
                        <p>Loading active competitions...</p>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Error <span className="text-secondary">Loading</span>
                        </h1>
                    </div>
                </section>
                <section className="py-16 md:py-24 flex-1">
                    <div className="container text-center text-red-500">
                        <p>An error occurred while fetching competitions: {error}</p>
                    </div>
                </section>
            </div>
        );
    }

    if (activeCompetitions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Active <span className="text-secondary">Competitions</span>
                        </h1>
                    </div>
                </section>
                <section className="py-16 md:py-24 flex-1">
                    <div className="container text-center">
                        <p>No active competitions found at this time. Check back soon!</p>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Page Header */}
            <section className="py-12 md:py-16 bg-muted/30">
                <div className="container">
                    <div className="divider-line" />
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Active <span className="text-secondary">Competitions</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Browse our complete selection of active competitions and find your next winning opportunity.
                    </p>
                </div>
            </section>

            {/* Competitions Grid */}
            <section className="py-16 md:py-24 flex-1">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeCompetitions.map((comp) => (
                            <CompetitionCard 
                                key={comp.slug} 
                                title={comp.title} 
                                description={comp.description} 
                                imageSrc={comp.image_reference} // R2 key
                                slug={comp.slug}
                                endTime={comp.end_at}
                                // The existing component expects more props like ticketsRemaining, etc.
                                // We will pass placeholders for now, as the new data model doesn't include them.
                                ticketsRemaining={0}
                                ticketsSold={0}
                                totalTickets={0}
                                prizeValue={''}
                            />
                        ))}
                    </div>
                </section>
            </section>

            {/* Load More Section - Removed as we load all active competitions */}
            {/* <section className="py-12 text-center">
                <div className="container">
                    <Button className="bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-3">
                        Load More Competitions
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </section> */}
        </div>
    );
}
  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="divider-line" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All <span className="text-secondary">Competitions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our complete selection of active competitions and find your next winning opportunity.
          </p>
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// Removed hardcoded map
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-12 text-center">
        <div className="container">
          <Button className="bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-3">
            Load More Competitions
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
