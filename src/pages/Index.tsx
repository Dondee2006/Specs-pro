import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import {
  Sparkles,
  ArrowRight,
  FileCode,
  Layers,
  Zap,
  Database,
  GitBranch,
  Download,
  Check,
  Play,
} from "lucide-react";

const features = [
  {
    icon: <FileCode className="h-5 w-5" />,
    title: "IDE-Ready Prompts",
    description: "Auto-generate prompts optimized for Cursor, Replit, Lovable, and more.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Structured Output",
    description: "Clean cards, tables, and diagrams—never walls of text.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Data Models",
    description: "Auto-generate entities, attributes, and relationships in JSON format.",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "User Flows",
    description: "Visual flowcharts that map your app's journey.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "MoSCoW Breakdown",
    description: "Prioritize features with Must/Should/Could/Won't categories.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Export Anywhere",
    description: "Copy, download Markdown, or get IDE-specific formats.",
  },
];

const trustedBy = [
  "Cursor", "Replit", "Lovable", "Codestral", "Base44"
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-8 inline-flex"
            >
              <span className="badge-pill">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>New: Export to any AI IDE</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The AI PRD Generator{" "}
              <br className="hidden sm:block" />
              that turns your{" "}
              <span className="gradient-text">vibes</span>
              <br className="hidden sm:block" />
              into clear requirements
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground lg:text-xl">
              VibeSpecs Pro is <strong className="text-foreground">the #1 AI tool for vibecoders</strong>,
              who have great ideas and want to build them fast.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/generate">
                <Button size="lg" className="btn-primary h-12 gap-2 rounded-full px-8 text-base">
                  Try It For Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="btn-secondary h-12 gap-2 rounded-full px-8 text-base">
                <Play className="h-4 w-4" />
                See it in action
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-y border-border/50 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-center text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-primary">10,000+</span> vibecoders to build{" "}
              <span className="font-semibold text-primary">50,000+</span> ideas, from side projects to startups
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {trustedBy.map((name) => (
                <span
                  key={name}
                  className="text-sm font-medium text-muted-foreground/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Everything you need to ship great products.
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              VibeSpecs Pro is the only AI copilot built specifically for vibecoders and their AI IDEs.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="card-elevated group p-6 transition-all duration-300"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-y border-border/50 bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                From idea to implementation in seconds
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Every PRD includes structured sections that AI agents understand
                instantly. No more reformatting or clarifying.
              </p>

              <ul className="space-y-4">
                {[
                  "Project Summary with clear objectives",
                  "Feature Cards with acceptance criteria",
                  "Data Models in JSON/table format",
                  "User Flow diagrams",
                  "MoSCoW prioritization",
                  "Ready-to-paste IDE prompts",
                ].map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-elevated overflow-hidden"
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-primary/40" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-muted-foreground">output.json</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm">
                <code className="text-muted-foreground">
{`{
  "feature": "User Authentication",
  "priority": "must",
  "userStory": "As a user, I want to...",
  "acceptanceCriteria": [
    "Email/password login",
    "OAuth support",
    "Session management"
  ],
  "techStack": ["Supabase Auth", "JWT"],
  "apiEndpoints": [
    "POST /auth/register",
    "POST /auth/login"
  ]
}`}
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
              Ready to vibe with better specs?
            </h2>
            <p className="mb-10 text-lg text-muted-foreground">
              Stop wrestling with prompts. Start shipping features.
            </p>
            <Link to="/generate">
              <Button size="lg" className="btn-primary h-12 gap-2 rounded-full px-8 text-base">
                Generate Your First PRD
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground">
              <Sparkles className="h-3 w-3 text-background" />
            </div>
            <span className="font-medium text-foreground">VibeSpecs Pro</span>
          </div>
          <p>Built for vibecoders who ship fast.</p>
        </div>
      </footer>
    </div>
  );
}