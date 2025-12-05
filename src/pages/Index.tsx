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
} from "lucide-react";

const features = [
  {
    icon: <FileCode className="h-6 w-6" />,
    title: "IDE-Ready Prompts",
    description: "Auto-generate prompts optimized for Cursor, Replit, Lovable, and more.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Structured Output",
    description: "Clean cards, tables, and diagrams—never walls of text.",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data Models",
    description: "Auto-generate entities, attributes, and relationships in JSON format.",
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: "User Flows",
    description: "Visual flowcharts that map your app's journey.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "MoSCoW Breakdown",
    description: "Prioritize features with Must/Should/Could/Won't categories.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Export Anywhere",
    description: "Copy, download Markdown, or get IDE-specific formats.",
  },
];

const ideLogos = [
  { name: "Cursor", color: "text-primary" },
  { name: "Replit", color: "text-primary" },
  { name: "Lovable", color: "text-primary" },
  { name: "Codestral", color: "text-primary" },
  { name: "Base44", color: "text-primary" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Built for vibecoders</span>
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Turn messy ideas into{" "}
              <span className="gradient-text">developer-ready PRDs</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground lg:text-xl">
              VibeSpecs Pro transforms your rough concepts into structured,
              IDE-optimized Product Requirements Documents that AI coding tools
              can instantly understand.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/generate">
                <Button variant="hero" size="xl" className="gap-2">
                  Start Building PRDs
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View Example
              </Button>
            </motion.div>

            {/* IDE Logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
            >
              <span className="text-sm">Optimized for:</span>
              {ideLogos.map((ide) => (
                <span
                  key={ide.name}
                  className={`font-medium ${ide.color} transition-colors hover:text-foreground`}
                >
                  {ide.name}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Everything your IDE needs
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Structured outputs designed for AI coding assistants to understand
              and implement without confusion.
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
                className="card-elevated rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Output Preview Section */}
      <section className="border-y border-border bg-secondary/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                From idea to implementation
              </h2>
              <p className="mb-8 text-muted-foreground">
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
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-elevated rounded-xl p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-primary/40" />
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
              <pre className="overflow-x-auto font-mono text-sm">
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
      <section className="py-20 lg:py-32">
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
            <p className="mb-8 text-lg text-muted-foreground">
              Stop wrestling with prompts. Start shipping features.
            </p>
            <Link to="/generate">
              <Button variant="hero" size="xl" className="gap-2">
                Generate Your First PRD
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>VibeSpecs Pro</span>
          </div>
          <p>Built for vibecoders who ship fast.</p>
        </div>
      </footer>
    </div>
  );
}
