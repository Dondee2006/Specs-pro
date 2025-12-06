import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Users, Target, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Developer-First",
    description: "Everything we build is optimized for developers and AI coding tools. No fluff, just actionable specs.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description: "From idea to implementation-ready PRD in minutes, not hours. We value your time.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by vibecoders, for vibecoders. Your feedback shapes our product.",
  },
  {
    icon: Heart,
    title: "Quality Obsessed",
    description: "Every PRD output is crafted to be immediately usable by AI agents and developers alike.",
  },
];

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former PM at Stripe. Passionate about developer tools and AI.",
  },
  {
    name: "Sarah Kim",
    role: "Head of Product",
    bio: "Ex-Google. Building products that developers love.",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Engineer",
    bio: "Full-stack engineer with a passion for clean code.",
  },
];

export default function Company() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building the Future of{" "}
              <span className="gradient-text">AI-Native Development</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              VibeSpecs Pro is on a mission to bridge the gap between ideas and implementation. We're making it effortless for developers to transform concepts into structured, AI-ready specifications.
            </p>
          </motion.div>

          {/* Values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 text-center"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent mb-4">
                    <value.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Story */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20 max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  VibeSpecs Pro was born from a simple frustration: the disconnect between product ideas and the structured specifications that AI coding tools need to build them.
                </p>
                <p>
                  As developers ourselves, we spent countless hours manually translating rough concepts into detailed PRDs, user stories, and technical specifications. We knew there had to be a better way.
                </p>
                <p>
                  In 2024, we set out to build a tool that would bridge this gap — one that understands the unique requirements of AI-powered IDEs like Cursor, Replit, and Lovable, and generates outputs they can immediately consume.
                </p>
                <p>
                  Today, VibeSpecs Pro helps thousands of developers ship faster by turning messy ideas into clean, structured, developer-ready PRDs in minutes.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Team */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-center mb-10">Meet the Team</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4" />
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
