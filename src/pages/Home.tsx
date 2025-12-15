import { Button } from "@/components/ui/button";
import CompetitionCard from "@/components/CompetitionCard";
import { ArrowRight, Zap, Trophy, Gift } from "lucide-react";

/**
 * Home Page - Modern Minimalist Design
 * Design: Asymmetric layout with generous whitespace, bold typography, and emerald/coral accents
 * Features: Hero section, featured competitions, how-it-works, and CTA sections
 */

// Sample competition data
const featuredCompetitions = [
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
    slug: "santas-cash-dash",
    title: "Santa's Cash Dash + Instant Wins",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 4493,
    ticketsSold: 7,
    totalTickets: 4500,
    prizeValue: "$500",
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
    slug: "snappy-site-credit",
    title: "Snappy Site Credit Instant Win",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 2974,
    ticketsSold: 26,
    totalTickets: 3000,
    prizeValue: "$100",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-banner.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/80" />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            {/* Overline */}
            <div className="text-primary font-semibold text-sm mb-4 uppercase tracking-wide">
              Welcome to Barrow Comps
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Will You Be Our Next Winner?
            </h1>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Every week brings new draws and guaranteed winners. Play with confidence knowing you've got some of the best odds available.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-6 text-base">
                View All Competitions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-6 text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Competitions Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          {/* Section Header */}
          <div className="mb-12">
            <div className="divider-line" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Latest <span className="text-secondary">Competitions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Every ticket gives you a chance to win incredible prizes — and helps support good causes along the way. Take a look at what's live now.
            </p>
          </div>

          {/* Competition Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredCompetitions.map((comp) => (
              <CompetitionCard key={comp.id} {...comp} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button className="bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-3">
              View All Competitions
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <div className="divider-line" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How to <span className="text-secondary">Participate</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our competitions build up to a weekly highlight: our live draws where you can join the community and watch winners chosen in real time.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-6">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Pick Your Prize</h3>
              <p className="text-muted-foreground">
                Take your pick from our exciting range of competitions — from instant wins to amazing end prizes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-6">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Get Your Tickets</h3>
              <p className="text-muted-foreground">
                Select how many tickets you'd like for each competition. More tickets equals more chances to win.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-6">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Enter & Watch</h3>
              <p className="text-muted-foreground">
                Answer the skill-based question and tune in to our live draw to see if you're the winner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="divider-line" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Win <span className="text-secondary">Amazing Prizes</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At Barrow Competitions, there's always something incredible waiting to be won. Our prizes are carefully curated every week, with input from our community, so there's always a mix of favourites and fresh surprises.
              </p>

              {/* Features List */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Cutting-edge Tech & Gaming</h4>
                    <p className="text-sm text-muted-foreground">Latest gadgets and consoles</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Cash Jackpots</h4>
                    <p className="text-sm text-muted-foreground">Life-changing prize amounts</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Instant Wins</h4>
                    <p className="text-sm text-muted-foreground">Win immediately upon entry</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Live Draws</h4>
                    <p className="text-sm text-muted-foreground">Watch winners chosen in real time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Feature Icons */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground">Best Odds</h4>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-lg text-center">
                <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h4 className="font-bold text-foreground">Fast Payouts</h4>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg text-center">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground">Weekly Prizes</h4>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-lg text-center">
                <Trophy className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h4 className="font-bold text-foreground">Community</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12 bg-primary text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Get 10% Off Your First Purchase
              </h3>
              <p className="text-emerald-50">
                Use code <span className="font-bold text-lg">welcometobarrow10</span> at checkout
              </p>
            </div>
            <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
