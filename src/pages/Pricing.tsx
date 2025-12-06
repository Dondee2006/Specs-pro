import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    description: "For indie developers",
    monthlyPrice: 9,
    yearlyPrice: 6,
    features: [
      "10 PRD generations / month",
      "All export formats",
      "Basic templates",
      "Email support",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For power users",
    monthlyPrice: 19,
    yearlyPrice: 13,
    features: [
      "Unlimited PRD generations",
      "All export formats",
      "Custom templates",
      "Priority support",
      "API access",
      "Team collaboration",
      "Advanced AI models",
    ],
    cta: "Get Started with Pro",
    popular: true,
  },
  {
    name: "Team",
    description: "For growing teams",
    monthlyPrice: 39,
    yearlyPrice: 27,
    perUser: true,
    features: [
      "Everything in Pro",
      "Centralized billing",
      "Team workspace",
      "Shared templates",
      "Admin controls",
      "SSO integration",
      "Dedicated support",
    ],
    cta: "Get Started with Team",
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pricing for <span className="gradient-text">Everyone</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              We've made VibeSpecs Pro easy to afford, so everyone can create developer-ready PRDs.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isYearly ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="text-xs font-semibold text-primary bg-accent px-2 py-1 rounded-full">
                Save 30%
              </span>
            )}
          </motion.div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`relative rounded-2xl border p-6 ${
                  plan.popular
                    ? "border-primary bg-card shadow-lg"
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground line-through">
                      ${plan.monthlyPrice}
                    </span>
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      / mo{plan.perUser ? " per user" : ""}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed ${(isYearly ? plan.yearlyPrice : plan.monthlyPrice) * 12}
                      {plan.perUser ? " / user" : ""} / year
                    </p>
                  )}
                </div>

                <Button
                  className={`w-full rounded-full mb-6 ${
                    plan.popular ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </Button>

                <div>
                  <p className="text-sm font-semibold mb-4">What's included</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 max-w-3xl mx-auto text-center"
          >
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold mb-2">VibeSpecs Enterprise</h2>
              <p className="text-muted-foreground mb-6">
                For teams ready to scale across their entire enterprise, we offer custom plans with advanced features, more granular data controls, and dedicated support.
              </p>
              <Button variant="outline" className="rounded-full">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
