import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";

interface FlowStep {
  id: string;
  title: string;
  description: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  delay?: number;
}

export function FlowDiagram({ steps, delay = 0 }: FlowDiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card-elevated rounded-xl p-6"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: delay + idx * 0.1 }}
              className="group relative"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-md">
                  {idx + 1}
                </div>
                <span className="mt-2 text-center text-sm font-medium max-w-[100px]">
                  {step.title}
                </span>
              </div>
              <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg group-hover:block">
                {step.description}
              </div>
            </motion.div>
            {idx < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + idx * 0.1 + 0.15 }}
              >
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
