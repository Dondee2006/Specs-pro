import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
  delay?: number;
}

export function CodeBlock({ title, code, language = "text", delay = 0 }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card-elevated overflow-hidden rounded-xl"
    >
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
        <span className="text-sm font-medium">{title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto bg-secondary/20 p-4">
        <code className="font-mono text-sm leading-relaxed">{code}</code>
      </pre>
    </motion.div>
  );
}
