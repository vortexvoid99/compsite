import { Button } from "@/components/ui/button";
import { Clock, Ticket } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { useLocation } from "wouter";

/**
 * CompetitionCard Component - Modern Minimalist Card Design
 * Design: Clean card layout with emerald green accents and geometric elements
 * Features: Competition image, countdown timer, ticket progress, and CTA button
 */

interface CompetitionCardProps {
  slug: string;
  title: string;
  image: string; // R2 key
  endDate: string; // ISO 8601 timestamp
  ticketsRemaining: number;
  ticketsSold: number;
  totalTickets: number;
  prizeValue?: string;
}

export default function CompetitionCard({
  slug,
  title,
  image, // R2 key
  endDate, // ISO 8601 timestamp
  ticketsRemaining,
  ticketsSold,
  totalTickets,
  prizeValue,
}: CompetitionCardProps) {
  const [, navigate] = useLocation();
  
  // R2 image URL construction: Assumes R2 is bound to a public path like /r2-images
  // This is a common pattern for Cloudflare Pages/Workers
  const imageUrl = `/r2-images/${image}`;

  // Convert ISO string to Date object for the countdown hook
  const countdown = useCountdown(new Date(endDate));
  const progressPercentage = (ticketsSold / totalTickets) * 100;

  // Format countdown display
  const getCountdownDisplay = () => {
    if (countdown.isExpired) {
      return "Ended";
    }
    if (countdown.days > 0) {
      return `${countdown.days} day${countdown.days !== 1 ? "s" : ""}`;
    }
    if (countdown.hours > 0) {
      return `${countdown.hours}h ${countdown.minutes}m`;
    }
    return `${countdown.minutes}m ${countdown.seconds}s`;
  };

  // Determine badge color based on time remaining
  const getBadgeColor = () => {
    if (countdown.isExpired) return "bg-red-500";
    if (countdown.days === 0 && countdown.hours < 12) return "bg-orange-500";
    return "bg-primary";
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in-up">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Countdown Timer Badge */}
        <div
          className={`absolute top-4 left-4 ${getBadgeColor()} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-md`}
        >
          <Clock className="w-4 h-4" />
          {getCountdownDisplay()}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-lg text-foreground mb-4 line-clamp-2">
          {title}
        </h3>

        {/* Prize Value (if available) */}
        {prizeValue && (
          <div className="mb-4 text-sm text-muted-foreground">
            Prize Value: <span className="text-primary font-semibold">{prizeValue}</span>
          </div>
        )}

        {/* Ticket Information */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Ticket className="w-4 h-4" />
              Tickets
            </span>
            <span className="font-semibold text-foreground">
              {ticketsRemaining} / {totalTickets}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Sold count */}
          <div className="text-xs text-muted-foreground">
            {ticketsSold} sold
          </div>
        </div>

        {/* Divider line - signature element */}
        <div className="h-px bg-border my-4" />

        {/* CTA Button */}
        <Button
          onClick={() => navigate(`/competition/${slug}`)}
          className="w-full bg-secondary hover:bg-orange-600 text-white font-semibold transition-colors duration-150"
          disabled={countdown.isExpired}
        >
          {countdown.isExpired ? "Competition Ended" : "Enter Now"}
        </Button>
      </div>
    </div>
  );
}
