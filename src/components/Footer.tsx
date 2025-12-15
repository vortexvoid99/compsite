import { Link } from "wouter";

/**
 * Footer Component - Modern Minimalist Design
 * Design: Clean, spacious footer with organized link sections
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">BC</span>
              </div>
              <span className="font-bold text-lg text-foreground">Barrow Comps</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your gateway to exciting competitions and amazing prizes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/competitions">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
                    Competitions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/winners">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
                    Winners List
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faqs">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
                    FAQs
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@barrowcomps.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2025 Barrow Competitions. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              <span className="text-sm">Facebook</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              <span className="text-sm">Twitter</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              <span className="text-sm">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
