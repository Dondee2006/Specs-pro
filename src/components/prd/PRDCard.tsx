import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PRDCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PRDCard({ title, icon, children, className, delay = 0 }: PRDCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "card-elevated rounded-xl p-6 transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </motion.div>
  );
}
