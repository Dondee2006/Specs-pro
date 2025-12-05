import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Copy, FileCode, FileText, Wand2 } from "lucide-react";
import { toast } from "sonner";

interface ExportButtonsProps {
  prdData: any;
  cursorPrompt: string;
  replitSteps: string;
  markdownContent: string;
}

export function ExportButtons({
  prdData,
  cursorPrompt,
  replitSteps,
  markdownContent,
}: ExportButtonsProps) {
  const handleCopyPRD = async () => {
    await navigator.clipboard.writeText(JSON.stringify(prdData, null, 2));
    toast.success("PRD copied to clipboard!");
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prd-output.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown file downloaded!");
  };

  const handleCopyCursor = async () => {
    await navigator.clipboard.writeText(cursorPrompt);
    toast.success("Cursor prompt copied!");
  };

  const handleCopyReplit = async () => {
    await navigator.clipboard.writeText(replitSteps);
    toast.success("Replit/Lovable steps copied!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap gap-3"
    >
      <Button variant="outline" onClick={handleCopyPRD} className="gap-2">
        <Copy className="h-4 w-4" />
        Copy PRD
      </Button>
      <Button variant="outline" onClick={handleExportMarkdown} className="gap-2">
        <FileText className="h-4 w-4" />
        Export Markdown
      </Button>
      <Button variant="glass" onClick={handleCopyCursor} className="gap-2">
        <FileCode className="h-4 w-4" />
        Cursor Prompt
      </Button>
      <Button variant="hero" onClick={handleCopyReplit} className="gap-2">
        <Wand2 className="h-4 w-4" />
        Replit/Lovable Steps
      </Button>
    </motion.div>
  );
}
