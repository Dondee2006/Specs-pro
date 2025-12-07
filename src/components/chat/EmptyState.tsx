import { motion } from "framer-motion";
import { Sparkles, Zap, FileCode, Layers } from "lucide-react";

const suggestions = [
  {
    icon: Zap,
    title: "Task Management App",
    description: "A Kanban board with real-time collaboration",
  },
  {
    icon: FileCode,
    title: "AI Writing Assistant",
    description: "Chrome extension for grammar and tone",
  },
  {
    icon: Layers,
    title: "E-commerce Dashboard",
    description: "Analytics and inventory management",
  },
];

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-pink-500 shadow-lg">
          <Sparkles className="h-8 w-8 text-white" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-foreground">
          What do you want to build?
        </h1>
        <p className="mb-8 text-muted-foreground">
          Describe your app idea and I'll generate a complete PRD for you.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() =>
                onSuggestionClick(
                  `${suggestion.title}: ${suggestion.description}`
                )
              }
              className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:shadow-md"
            >
              <suggestion.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground group-hover:text-primary">
                  {suggestion.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
