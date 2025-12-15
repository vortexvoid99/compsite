import { Trophy } from "lucide-react";

/**
 * Winners Page - Recent Winners Display
 * Design: Modern Minimalist with winner cards
 */

const recentWinners = [
  {
    id: 1,
    name: "Sarah M.",
    prize: "Apple Watch Series 9",
    date: "2025-12-14",
    location: "Manchester",
  },
  {
    id: 2,
    name: "James T.",
    prize: "$2,500 Cash Prize",
    date: "2025-12-13",
    location: "Liverpool",
  },
  {
    id: 3,
    name: "Emma L.",
    prize: "Sony PS5 Console",
    date: "2025-12-12",
    location: "Leeds",
  },
  {
    id: 4,
    name: "Michael R.",
    prize: "DJI Drone Pro",
    date: "2025-12-11",
    location: "Birmingham",
  },
  {
    id: 5,
    name: "Jessica H.",
    prize: "Luxury Spa Weekend",
    date: "2025-12-10",
    location: "London",
  },
  {
    id: 6,
    name: "David P.",
    prize: "4K Smart TV 55\"",
    date: "2025-12-09",
    location: "Manchester",
  },
  {
    id: 7,
    name: "Rachel K.",
    prize: "Gaming PC Setup",
    date: "2025-12-08",
    location: "Bristol",
  },
  {
    id: 8,
    name: "Christopher W.",
    prize: "$1,000 Cash Prize",
    date: "2025-12-07",
    location: "Edinburgh",
  },
];

export default function Winners() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="divider-line" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Recent <span className="text-secondary">Winners</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Celebrate with our recent winners and see what amazing prizes they've won. You could be next!
          </p>
        </div>
      </section>

      {/* Winners Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentWinners.map((winner) => (
              <div
                key={winner.id}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up border border-border"
              >
                {/* Trophy Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-secondary" />
                  </div>
                </div>

                {/* Winner Name */}
                <h3 className="text-center font-bold text-lg text-foreground mb-2">
                  {winner.name}
                </h3>

                {/* Prize */}
                <p className="text-center text-primary font-semibold mb-4">
                  {winner.prize}
                </p>

                {/* Divider */}
                <div className="h-px bg-border my-4" />

                {/* Details */}
                <div className="space-y-2 text-sm text-muted-foreground text-center">
                  <p>
                    <span className="font-medium text-foreground">Date:</span> {formatDate(winner.date)}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Location:</span> {winner.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2,847</div>
              <p className="text-emerald-50">Total Winners</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">£1.2M+</div>
              <p className="text-emerald-50">Prizes Awarded</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <p className="text-emerald-50">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to be the next winner?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of winners and enter your first competition today. Your chance to win could be just one click away.
          </p>
          <a
            href="/competitions"
            className="inline-block bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-150"
          >
            View All Competitions
          </a>
        </div>
      </section>
    </div>
  );
}
