import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Ticket, ShoppingCart } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { useCountdown } from "@/hooks/useCountdown";

/**
 * CompetitionDetail Page - Individual Competition Entry Page
 * Design: Modern Minimalist with split layout (image left, form right)
 * Features: Product image, countdown timer, skill-based question, ticket selector, entry form
 */

// Sample competition data - in a real app, this would come from an API or database
const competitionsData: Record<
  string,
  {
    id: string;
    title: string;
    price: number;
    image: string;
    endDate: Date;
    ticketsRemaining: number;
    ticketsSold: number;
    totalTickets: number;
    prizeValue: string;
    description: string;
    features: string[];
    question: string;
    answers: string[];
    correctAnswer: number;
    maxEntries: number;
  }
> = {
  "autodraw-anker-power-bank": {
    id: "1",
    title: "Autodraw – Anker Power Bank",
    price: 0.79,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 499,
    ticketsSold: 1,
    totalTickets: 500,
    prizeValue: "$49.99",
    description:
      "Power up your adventures with the Anker 25K 165W Power Bank — the ultimate high-performance charger designed for travellers, creators and anyone who needs reliable energy on the go.",
    features: [
      "Triple 100W USB-C Ports – Charge multiple devices at full speed",
      "Huge 25,000mAh Capacity – Perfect for long trips and heavy use",
      "Ultra-Fast Recharging – Refuels to 30% in just 22 minutes",
      "Dual Built-In USB-C Cables – One retractable and one durable",
      "Charge Up to 4 Devices at Once – Never choose which gadget gets power",
    ],
    question: "What colour is the grinch?",
    answers: ["Red", "Blue", "Green", "Pink"],
    correctAnswer: 2, // Green
    maxEntries: 50,
  },
  "santas-cash-dash": {
    id: "2",
    title: "Santa's Cash Dash + Instant Wins",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    ticketsRemaining: 4493,
    ticketsSold: 7,
    totalTickets: 4500,
    prizeValue: "$500",
    description: "Join the festive fun with Santa's Cash Dash and win instant prizes or the grand cash prize!",
    features: [
      "Multiple instant win opportunities",
      "Grand prize of $500",
      "Weekly draws",
      "Instant notification of wins",
      "Easy entry process",
    ],
    question: "How many days are in December?",
    answers: ["29", "30", "31", "32"],
    correctAnswer: 2, // 31
    maxEntries: 50,
  },
};

export default function CompetitionDetail() {
  const [, params] = useRoute("/competition/:slug");
  const [, navigate] = useLocation();
  const slug = params?.slug || "";

  const competition = competitionsData[slug];
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const countdown = useCountdown(competition?.endDate || new Date());
  const progressPercentage = competition
    ? (competition.ticketsSold / competition.totalTickets) * 100
    : 0;

  if (!competition) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Competition Not Found
            </h1>
            <Button
              onClick={() => navigate("/competitions")}
              className="bg-primary hover:bg-primary/90"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Competitions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = (competition.price * ticketQuantity).toFixed(2);

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(1, Math.min(value, competition.maxEntries));
    setTicketQuantity(newValue);
  };

  const handleParticipate = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer to the question");
      return;
    }
    setSubmitted(true);
    // In a real app, this would submit to a backend
    setTimeout(() => {
      alert(
        `Entry submitted! You've entered ${ticketQuantity} ticket(s) for £${totalPrice}`
      );
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Back Button */}
      <div className="container py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/competitions")}
          className="text-primary hover:bg-primary/10"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Competitions
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Image */}
          <div className="flex flex-col gap-6">
            <div className="bg-muted rounded-lg overflow-hidden h-96 lg:h-[500px]">
              <img
                src={competition.image}
                alt={competition.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Related Competitions */}
            <div>
              <h3 className="font-bold text-lg text-foreground mb-4">
                Other Competitions
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(competitionsData)
                  .slice(0, 3)
                  .map(([key, comp]) => (
                    <button
                      key={key}
                      onClick={() => navigate(`/competition/${key}`)}
                      className="group"
                    >
                      <div className="bg-muted rounded-lg overflow-hidden h-32 mb-2 group-hover:shadow-md transition-shadow">
                        <img
                          src={comp.image}
                          alt={comp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {comp.title}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Right: Competition Details & Entry Form */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {competition.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {competition.description}
              </p>
            </div>

            {/* Price & Countdown */}
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                  £{competition.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">per ticket</span>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Time left:</span>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-background rounded p-3 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {countdown.days}
                  </div>
                  <div className="text-xs text-muted-foreground">Days</div>
                </div>
                <div className="bg-background rounded p-3 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {countdown.hours}
                  </div>
                  <div className="text-xs text-muted-foreground">Hours</div>
                </div>
                <div className="bg-background rounded p-3 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {countdown.minutes}
                  </div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="bg-background rounded p-3 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {countdown.seconds}
                  </div>
                  <div className="text-xs text-muted-foreground">Seconds</div>
                </div>
              </div>

              {/* Ticket Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Ticket className="w-4 h-4" />
                    Tickets Available
                  </span>
                  <span className="font-semibold text-foreground">
                    {competition.ticketsRemaining} / {competition.totalTickets}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {competition.ticketsSold} sold
                </div>
              </div>
            </div>

            {/* Skill-Based Question */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">
                {competition.question}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {competition.answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                      selectedAnswer === index
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Quantity Selector */}
            <div className="space-y-3">
              <label className="font-semibold text-foreground">
                Number of Tickets
              </label>
              <div className="flex items-center gap-4 bg-muted rounded-lg p-4">
                <button
                  onClick={() => handleQuantityChange(ticketQuantity - 1)}
                  className="w-10 h-10 flex items-center justify-center bg-background rounded hover:bg-primary/10 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={ticketQuantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="flex-1 text-center text-lg font-bold bg-transparent border-0 outline-none"
                  min="1"
                  max={competition.maxEntries}
                />
                <button
                  onClick={() => handleQuantityChange(ticketQuantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-background rounded hover:bg-primary/10 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Max {competition.maxEntries} entries per competition
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Total Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">
                Total:
              </span>
              <span className="text-3xl font-bold text-primary">
                £{totalPrice}
              </span>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleParticipate}
              disabled={countdown.isExpired || submitted}
              className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-6 text-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {submitted ? "Entry Submitted!" : `PARTICIPATE NOW FOR £${totalPrice}`}
            </Button>

            {countdown.isExpired && (
              <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg text-center font-semibold">
                This competition has ended
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-muted/50 py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            About This Prize
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-foreground mb-6">{competition.description}</p>
              <div className="space-y-3">
                {competition.features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg text-foreground mb-4">
                Competition Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prize Value:</span>
                  <span className="font-semibold text-foreground">
                    {competition.prizeValue}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entry Price:</span>
                  <span className="font-semibold text-foreground">
                    £{competition.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Entries:</span>
                  <span className="font-semibold text-foreground">
                    {competition.maxEntries}
                  </span>
                </div>
                <div className="h-px bg-border my-3" />
                <p className="text-xs text-muted-foreground">
                  This competition is open to UK residents aged 18+. You must
                  answer the skill-based question correctly to be entered into
                  the draw.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
