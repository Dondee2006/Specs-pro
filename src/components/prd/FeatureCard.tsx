import { motion } from "framer-motion";
import { Check, User, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  title: string;
  description: string;
  userStory: string;
  acceptanceCriteria: string[];
  uxBehavior: string;
  priority: "must" | "should" | "could" | "wont";
  delay?: number;
}

const priorityColors = {
  must: "bg-primary/10 text-primary border-primary/20",
  should: "bg-accent text-accent-foreground border-accent-foreground/20",
  could: "bg-secondary text-secondary-foreground border-border",
  wont: "bg-muted text-muted-foreground border-border",
};

const priorityLabels = {
  must: "Must Have",
  should: "Should Have",
  could: "Could Have",
  wont: "Won't Have",
};

export function FeatureCard({
  title,
  description,
  userStory,
  acceptanceCriteria,
  uxBehavior,
  priority,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card-elevated rounded-xl p-5 transition-all duration-300 hover:shadow-xl"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="font-semibold leading-tight">{title}</h4>
        <Badge variant="outline" className={priorityColors[priority]}>
          {priorityLabels[priority]}
        </Badge>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{description}</p>

      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <User className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              User Story
            </span>
            <p className="mt-1 text-sm">{userStory}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Acceptance Criteria
            </span>
            <ul className="mt-1 space-y-1">
              {acceptanceCriteria.map((criteria, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {criteria}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              UX Behavior
            </span>
            <p className="mt-1 text-sm">{uxBehavior}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
